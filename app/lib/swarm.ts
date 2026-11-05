// Simulação do "agent swarm": um planejador raiz delega para sub-planejadores
// por área, que distribuem tarefas para workers trabalhando em paralelo.
// A cada N entregas um "judge" fecha o ciclo e o trabalho continua.

export type Pt = { x: number; y: number };

export type SwarmEventKind = 'plan' | 'claim' | 'done' | 'fail' | 'judge' | 'user';

export interface SwarmEvent {
  id: number;
  time: number;
  kind: SwarmEventKind;
  lane: number;
  worker: number;
  task: number;
  cycle: number;
}

export interface SwarmStats {
  active: number;
  done: number;
  cycle: number;
}

export interface SwarmColors {
  accent: string;
  accent2: string;
  ink: string;
  muted: string;
  faint: string;
  line: string;
  lineStrong: string;
  surface: string;
}

type SlotState = 'empty' | 'queued' | 'working' | 'done';

interface Slot {
  state: SlotState;
  task: number;
  progress: number;
  fade: number;
}

interface Worker {
  id: number;
  lane: number;
  state: 'idle' | 'going' | 'working' | 'returning';
  pos: Pt;
  from: Pt;
  t: number;
  dur: number;
  slot: number;
  work: number;
  workDur: number;
  angle: number;
  speed: number;
}

interface Packet {
  from: () => Pt;
  to: () => Pt;
  t: number;
  dur: number;
  onArrive: () => void;
}

interface Ring {
  pos: Pt;
  t: number;
  max: number;
  size: number;
}

export const LANE_COUNT = 4;
const WORKERS_PER_LANE = 3;
const COLS = 2;
const ROWS = 3;
const SLOTS = COLS * ROWS;
const DONE_FADE = 1.6;
const TASKS_PER_CYCLE = 6;
const FAIL_RATE = 0.08;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: Pt, b: Pt, t: number): Pt => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
const rand = (min: number, max: number) => min + Math.random() * (max - min);

export class SwarmSim {
  w = 0;
  h = 0;
  time = 0;
  pointer: Pt | null = null;

  private slots: Slot[][];
  private workers: Worker[] = [];
  private packets: Packet[] = [];
  private rings: Ring[] = [];
  private done = 0;
  private cycle = 1;
  private nextPlan = 0.3;
  private eventId = 0;

  constructor(
    private taskCounts: number[],
    private emit: (e: SwarmEvent) => void,
  ) {
    this.slots = Array.from({ length: LANE_COUNT }, () =>
      Array.from({ length: SLOTS }, () => ({ state: 'empty' as SlotState, task: 0, progress: 0, fade: 0 })),
    );
    for (let lane = 0; lane < LANE_COUNT; lane++) {
      for (let k = 0; k < WORKERS_PER_LANE; k++) {
        const id = lane * WORKERS_PER_LANE + k + 1;
        this.workers.push({
          id,
          lane,
          state: 'idle',
          pos: { x: 0, y: 0 },
          from: { x: 0, y: 0 },
          t: 0,
          dur: 1,
          slot: -1,
          work: 0,
          workDur: 1,
          angle: (k / WORKERS_PER_LANE) * Math.PI * 2 + lane,
          speed: rand(0.45, 0.8),
        });
      }
    }
  }

  // ---------- layout ----------
  resize(w: number, h: number) {
    this.w = w;
    this.h = h;
    for (const wk of this.workers) if (wk.state === 'idle') wk.pos = this.orbit(wk);
  }

  root(): Pt {
    return { x: this.w / 2, y: this.h * 0.14 };
  }

  planner(lane: number): Pt {
    return { x: (this.w * (lane + 0.5)) / LANE_COUNT, y: this.h * 0.4 };
  }

  cell(): number {
    const laneW = this.w / LANE_COUNT;
    const region = this.h * 0.3;
    return Math.max(10, Math.min(laneW * 0.24, (region / ROWS) * 0.66));
  }

  slotPos(lane: number, i: number): Pt {
    const s = this.cell();
    const gap = s * 0.42;
    const c = i % COLS;
    const r = Math.floor(i / COLS);
    const p = this.planner(lane);
    const gridW = COLS * s + (COLS - 1) * gap;
    const top = this.h * 0.62;
    return { x: p.x - gridW / 2 + c * (s + gap) + s / 2, y: top + r * (s + gap) + s / 2 };
  }

  private orbit(wk: Worker): Pt {
    const p = this.planner(wk.lane);
    const r = Math.min(28, (this.w / LANE_COUNT) * 0.24);
    return { x: p.x + Math.cos(wk.angle) * r, y: p.y + Math.sin(wk.angle) * r * 0.55 };
  }

  // ---------- control ----------
  stats(): SwarmStats {
    return {
      active: this.workers.filter((w) => w.state !== 'idle').length,
      done: this.done,
      cycle: this.cycle,
    };
  }

  /** Usuário cria uma nova demanda: o root delega para todas as áreas. */
  burst() {
    this.push('user', {});
    this.rings.push({ pos: this.root(), t: 0, max: 1.2, size: 70 });
    for (let lane = 0; lane < LANE_COUNT; lane++) this.dispatch(lane, 2);
    this.nextPlan = 2.5;
  }

  private push(kind: SwarmEventKind, data: Partial<SwarmEvent>) {
    this.emit({ id: ++this.eventId, time: this.time, kind, lane: -1, worker: -1, task: -1, cycle: this.cycle, ...data });
  }

  private pending(lane: number) {
    return this.slots[lane].filter((s) => s.state === 'queued' || s.state === 'working').length;
  }

  private pickLane(): number {
    let best = -1;
    let bestScore = Infinity;
    for (let lane = 0; lane < LANE_COUNT; lane++) {
      if (!this.slots[lane].some((s) => s.state === 'empty')) continue;
      const score = this.pending(lane) + Math.random() * 1.5;
      if (score < bestScore) {
        bestScore = score;
        best = lane;
      }
    }
    return best;
  }

  private dispatch(lane: number, count = 1) {
    this.packets.push({
      from: () => this.root(),
      to: () => this.planner(lane),
      t: 0,
      dur: 0.55,
      onArrive: () => {
        for (let n = 0; n < count; n++) this.createTask(lane);
      },
    });
  }

  private createTask(lane: number) {
    const slots = this.slots[lane];
    const free = slots.map((s, i) => (s.state === 'empty' ? i : -1)).filter((i) => i >= 0);
    if (!free.length) return;
    const i = free[Math.floor(Math.random() * free.length)];
    const used = new Set(slots.filter((s) => s.state !== 'empty').map((s) => s.task));
    const options = Array.from({ length: this.taskCounts[lane] }, (_, k) => k).filter((k) => !used.has(k));
    const task = options.length
      ? options[Math.floor(Math.random() * options.length)]
      : Math.floor(Math.random() * this.taskCounts[lane]);
    slots[i] = { state: 'queued', task, progress: 0, fade: 0 };
    this.push('plan', { lane, task });
  }

  private complete(wk: Worker) {
    const lane = wk.lane;
    const slotIndex = wk.slot;
    const slot = this.slots[lane][slotIndex];

    if (Math.random() < FAIL_RATE) {
      slot.state = 'queued';
      slot.progress = 0;
      this.push('fail', { lane, worker: wk.id, task: slot.task });
    } else {
      slot.state = 'done';
      slot.fade = 0;
      slot.progress = 1;
      this.push('done', { lane, worker: wk.id, task: slot.task });
      const slotPt = this.slotPos(lane, slotIndex);
      this.packets.push({
        from: () => slotPt,
        to: () => this.planner(lane),
        t: 0,
        dur: 0.45,
        onArrive: () =>
          this.packets.push({
            from: () => this.planner(lane),
            to: () => this.root(),
            t: 0,
            dur: 0.5,
            onArrive: () => this.report(),
          }),
      });
    }

    wk.state = 'returning';
    wk.from = { ...wk.pos };
    wk.t = 0;
    wk.dur = rand(0.6, 0.9);
    wk.slot = -1;
  }

  private report() {
    this.done++;
    this.rings.push({ pos: this.root(), t: 0, max: 0.8, size: 26 });
    if (this.done % TASKS_PER_CYCLE === 0) {
      this.push('judge', { cycle: this.cycle });
      this.cycle++;
      this.rings.push({ pos: this.root(), t: 0, max: 1.4, size: 90 });
    }
  }

  // ---------- simulation ----------
  update(dt: number) {
    this.time += dt;

    this.nextPlan -= dt;
    if (this.nextPlan <= 0) {
      this.nextPlan = rand(0.9, 2.0);
      const lane = this.pickLane();
      if (lane >= 0) this.dispatch(lane, Math.random() < 0.3 ? 2 : 1);
    }

    for (const wk of this.workers) {
      wk.angle += dt * wk.speed;
      const slots = this.slots[wk.lane];

      if (wk.state === 'idle') {
        const queued = slots.findIndex((s) => s.state === 'queued');
        if (queued >= 0) {
          slots[queued].state = 'working';
          slots[queued].progress = 0;
          wk.state = 'going';
          wk.slot = queued;
          wk.from = { ...wk.pos };
          wk.t = 0;
          wk.dur = rand(0.6, 0.95);
          this.push('claim', { lane: wk.lane, worker: wk.id, task: slots[queued].task });
        } else {
          wk.pos = this.orbit(wk);
        }
      } else if (wk.state === 'going') {
        wk.t = Math.min(1, wk.t + dt / wk.dur);
        wk.pos = lerp(wk.from, this.slotPos(wk.lane, wk.slot), easeInOut(wk.t));
        if (wk.t >= 1) {
          wk.state = 'working';
          wk.work = 0;
          wk.workDur = rand(2, 4.6);
        }
      } else if (wk.state === 'working') {
        wk.work += dt;
        const slot = slots[wk.slot];
        slot.progress = Math.min(1, wk.work / wk.workDur);
        const base = this.slotPos(wk.lane, wk.slot);
        wk.pos = { x: base.x + Math.sin(this.time * 9 + wk.id) * 0.8, y: base.y + Math.cos(this.time * 7 + wk.id) * 0.8 };
        if (wk.work >= wk.workDur) this.complete(wk);
      } else {
        wk.t = Math.min(1, wk.t + dt / wk.dur);
        wk.pos = lerp(wk.from, this.orbit(wk), easeInOut(wk.t));
        if (wk.t >= 1) wk.state = 'idle';
      }
    }

    for (const lane of this.slots) {
      for (const s of lane) {
        if (s.state !== 'done') continue;
        s.fade += dt;
        if (s.fade >= DONE_FADE) {
          s.state = 'empty';
          s.progress = 0;
        }
      }
    }

    for (let i = this.packets.length - 1; i >= 0; i--) {
      const p = this.packets[i];
      p.t += dt / p.dur;
      if (p.t >= 1) {
        this.packets.splice(i, 1);
        p.onArrive();
      }
    }

    for (let i = this.rings.length - 1; i >= 0; i--) {
      this.rings[i].t += dt;
      if (this.rings[i].t >= this.rings[i].max) this.rings.splice(i, 1);
    }
  }

  // ---------- rendering ----------
  draw(ctx: CanvasRenderingContext2D, c: SwarmColors, laneLabels: string[], rootLabel: string) {
    const { w, h } = this;
    ctx.clearRect(0, 0, w, h);
    if (!w || !h) return;

    const root = this.root();
    const laneW = w / LANE_COUNT;
    const hoverLane =
      this.pointer && this.pointer.y > this.h * 0.25 ? Math.min(LANE_COUNT - 1, Math.floor(this.pointer.x / laneW)) : -1;

    // lane guides
    for (let lane = 0; lane < LANE_COUNT; lane++) {
      if (lane === hoverLane) {
        ctx.globalAlpha = 0.05;
        ctx.fillStyle = c.accent;
        ctx.fillRect(lane * laneW, h * 0.27, laneW, h * 0.73);
      }
      if (lane > 0) {
        ctx.globalAlpha = 1;
        ctx.strokeStyle = c.line;
        ctx.lineWidth = 1;
        ctx.setLineDash([2, 6]);
        ctx.beginPath();
        ctx.moveTo(lane * laneW + 0.5, h * 0.3);
        ctx.lineTo(lane * laneW + 0.5, h * 0.96);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
    ctx.globalAlpha = 1;

    // root → planners
    ctx.strokeStyle = c.lineStrong;
    ctx.lineWidth = 1;
    for (let lane = 0; lane < LANE_COUNT; lane++) {
      const p = this.planner(lane);
      const midY = (root.y + p.y) / 2;
      ctx.beginPath();
      ctx.moveTo(root.x, root.y);
      ctx.bezierCurveTo(root.x, midY, p.x, midY, p.x, p.y);
      ctx.stroke();
    }

    // planner → worker tethers
    for (const wk of this.workers) {
      const p = this.planner(wk.lane);
      ctx.globalAlpha = wk.state === 'idle' ? 0.5 : 0.9;
      ctx.strokeStyle = wk.state === 'idle' ? c.line : c.lineStrong;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(wk.pos.x, wk.pos.y);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // task slots
    const s = this.cell();
    for (let lane = 0; lane < LANE_COUNT; lane++) {
      this.slots[lane].forEach((slot, i) => {
        const pt = this.slotPos(lane, i);
        const x = pt.x - s / 2;
        const y = pt.y - s / 2;
        ctx.lineWidth = 1;
        if (slot.state === 'empty') {
          ctx.strokeStyle = c.line;
          ctx.strokeRect(x + 0.5, y + 0.5, s, s);
        } else if (slot.state === 'queued') {
          ctx.strokeStyle = c.accent;
          ctx.setLineDash([3, 3]);
          ctx.lineDashOffset = -this.time * 8;
          ctx.strokeRect(x + 0.5, y + 0.5, s, s);
          ctx.setLineDash([]);
        } else if (slot.state === 'working') {
          ctx.fillStyle = c.accent;
          ctx.globalAlpha = 0.1;
          ctx.fillRect(x, y, s, s);
          ctx.globalAlpha = 0.55;
          const ph = s * slot.progress;
          ctx.fillRect(x, y + s - ph, s, ph);
          ctx.globalAlpha = 1;
          ctx.strokeStyle = c.accent;
          ctx.strokeRect(x + 0.5, y + 0.5, s, s);
        } else {
          const a = 1 - slot.fade / DONE_FADE;
          ctx.globalAlpha = 0.85 * a;
          ctx.fillStyle = c.accent2;
          ctx.fillRect(x, y, s, s);
          ctx.globalAlpha = Math.max(0.25, a);
          ctx.strokeStyle = c.accent;
          ctx.strokeRect(x + 0.5, y + 0.5, s, s);
          ctx.globalAlpha = 1;
        }
      });
    }

    // packets (with short trail)
    for (const p of this.packets) {
      const a = p.from();
      const b = p.to();
      const t = easeInOut(Math.min(1, p.t));
      const head = lerp(a, b, t);
      const tail = lerp(a, b, Math.max(0, t - 0.12));
      ctx.strokeStyle = c.accent2;
      ctx.globalAlpha = 0.6;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(tail.x, tail.y);
      ctx.lineTo(head.x, head.y);
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.shadowColor = c.accent2;
      ctx.shadowBlur = 10;
      ctx.fillStyle = c.accent2;
      ctx.beginPath();
      ctx.arc(head.x, head.y, 2.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.lineWidth = 1;

    // workers
    for (const wk of this.workers) {
      const { x, y } = wk.pos;
      if (wk.state === 'working') {
        const slot = this.slots[wk.lane][wk.slot];
        ctx.strokeStyle = c.accent;
        ctx.lineWidth = 1.25;
        ctx.beginPath();
        ctx.arc(x, y, 7, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (slot?.progress ?? 0));
        ctx.stroke();
        ctx.lineWidth = 1;
      }
      ctx.fillStyle = wk.state === 'idle' ? c.muted : wk.state === 'working' ? c.accent : c.accent2;
      ctx.beginPath();
      ctx.arc(x, y, wk.state === 'idle' ? 2.4 : 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // planners (diamonds)
    for (let lane = 0; lane < LANE_COUNT; lane++) {
      const p = this.planner(lane);
      const busy = this.pending(lane) > 0;
      const r = 7;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - r);
      ctx.lineTo(p.x + r, p.y);
      ctx.lineTo(p.x, p.y + r);
      ctx.lineTo(p.x - r, p.y);
      ctx.closePath();
      ctx.fillStyle = c.surface;
      ctx.fill();
      ctx.strokeStyle = c.accent;
      ctx.stroke();
      if (busy) {
        ctx.fillStyle = c.accent;
        ctx.globalAlpha = 0.6 + Math.sin(this.time * 4 + lane) * 0.3;
        ctx.fillRect(p.x - 2, p.y - 2, 4, 4);
        ctx.globalAlpha = 1;
      }
    }

    // rings around root
    for (const ring of this.rings) {
      const k = ring.t / ring.max;
      ctx.globalAlpha = (1 - k) * 0.8;
      ctx.strokeStyle = c.accent;
      ctx.beginPath();
      ctx.arc(ring.pos.x, ring.pos.y, 12 + k * ring.size, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // root planner (plate with corner ticks)
    const R = 11;
    ctx.fillStyle = c.surface;
    ctx.fillRect(root.x - R, root.y - R, R * 2, R * 2);
    ctx.strokeStyle = c.lineStrong;
    ctx.strokeRect(root.x - R + 0.5, root.y - R + 0.5, R * 2 - 1, R * 2 - 1);
    ctx.strokeStyle = c.accent;
    ctx.beginPath();
    ctx.moveTo(root.x - R - 3, root.y - R + 5);
    ctx.lineTo(root.x - R - 3, root.y - R - 3);
    ctx.lineTo(root.x - R + 5, root.y - R - 3);
    ctx.moveTo(root.x + R + 3, root.y + R - 5);
    ctx.lineTo(root.x + R + 3, root.y + R + 3);
    ctx.lineTo(root.x + R - 5, root.y + R + 3);
    ctx.stroke();
    ctx.fillStyle = c.accent;
    const core = 3.5 + Math.sin(this.time * 2.2) * 0.8;
    ctx.fillRect(root.x - core, root.y - core, core * 2, core * 2);

    // labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    const tracked = ctx as CanvasRenderingContext2D & { letterSpacing?: string };
    if ('letterSpacing' in tracked) tracked.letterSpacing = '2px';
    ctx.font = '600 9.5px Manrope, ui-sans-serif, system-ui, sans-serif';
    ctx.fillStyle = c.accent;
    ctx.fillText(rootLabel.toUpperCase(), root.x, root.y - R - 12);
    // Abaixo do planner (a curva vinda do root chega por cima); curto em telas estreitas.
    const compact = laneW < 120;
    for (let lane = 0; lane < LANE_COUNT; lane++) {
      const p = this.planner(lane);
      const label = compact ? laneLabels[lane].split('-')[0] : laneLabels[lane];
      ctx.fillStyle = lane === hoverLane ? c.ink : c.faint;
      ctx.fillText(label.toUpperCase(), p.x, p.y + 32);
    }
    if ('letterSpacing' in tracked) tracked.letterSpacing = '0px';
  }
}
