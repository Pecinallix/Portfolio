import { motion } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage, type Language } from '../contexts/LanguageContext';
import { SwarmSim, type SwarmColors, type SwarmEvent, type SwarmStats } from '../lib/swarm';

const ease = [0.16, 1, 0.3, 1] as const;
const MAX_LOG = 9;

type Localized = Record<Language, string>;

const LANES: { id: string; label: string }[] = [
  { id: 'front', label: 'Front-end' },
  { id: 'back', label: 'Back-end' },
  { id: 'infra', label: 'Infra' },
  { id: 'bots', label: 'Bots' },
];

// Tarefas reais dos meus produtos (Idle RO, FindMyAI, PromoRadar).
const TASKS: Localized[][] = [
  [
    { pt: 'Phaser: render do mapa', en: 'Phaser: render map tiles' },
    { pt: 'comparador lado a lado', en: 'side-by-side comparator' },
    { pt: 'i18n em 5 idiomas', en: 'i18n in 5 languages' },
    { pt: 'Pinia: store do inventário', en: 'Pinia: inventory store' },
    { pt: 'PWA: cache offline', en: 'PWA: offline cache' },
    { pt: 'busca com filtros', en: 'filtered search' },
  ],
  [
    { pt: 'Socket.IO: sync do mundo', en: 'Socket.IO: world sync' },
    { pt: 'Express: rate limiting', en: 'Express: rate limiting' },
    { pt: 'PostgreSQL: migration', en: 'PostgreSQL: migration' },
    { pt: 'API de rankings', en: 'rankings API' },
    { pt: 'JWT: refresh de sessão', en: 'JWT: session refresh' },
    { pt: 'e-mails com Resend', en: 'Resend e-mails' },
  ],
  [
    { pt: 'nginx: proxy de websocket', en: 'nginx: websocket proxy' },
    { pt: 'PM2: restart sem downtime', en: 'PM2: zero-downtime restart' },
    { pt: 'CI: Vitest + build', en: 'CI: Vitest + build' },
    { pt: 'troca atômica do build', en: 'atomic build swap' },
    { pt: 'certbot: renovar TLS', en: 'certbot: renew TLS' },
    { pt: 'fail2ban: regras', en: 'fail2ban: rules' },
  ],
  [
    { pt: 'scraper: Magalu', en: 'scraper: Magalu' },
    { pt: 'Puppeteer: Shopee', en: 'Puppeteer: Shopee' },
    { pt: 'Telegram: postar ofertas', en: 'Telegram: post deals' },
    { pt: 'WhatsApp: grupos por categoria', en: 'WhatsApp: category groups' },
    { pt: 'afiliados: rastrear conversão', en: 'affiliates: track conversions' },
    { pt: 'monitor de uptime', en: 'uptime monitor' },
  ],
];

function readColors(): SwarmColors {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string) => css.getPropertyValue(name).trim();
  return {
    accent: v('--accent'),
    accent2: v('--accent-2'),
    ink: v('--ink'),
    muted: v('--muted'),
    faint: v('--faint'),
    line: v('--line'),
    lineStrong: v('--line-strong'),
    surface: v('--surface'),
  };
}

const pad = (n: number) => String(n).padStart(2, '0');

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${pad(m)}:${s.toFixed(1).padStart(4, '0')}`;
}

export default function Swarm() {
  const { t, language } = useLanguage();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<SwarmSim | null>(null);
  const redrawRef = useRef<() => void>(() => {});
  const reducedRef = useRef(false);
  const labelsRef = useRef({ root: t('swarm.root') });

  const [events, setEvents] = useState<SwarmEvent[]>([]);
  const [stats, setStats] = useState<SwarmStats>({ active: 0, done: 0, cycle: 1 });

  labelsRef.current.root = t('swarm.root');

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!wrap || !canvas || !ctx) return;

    const pending: SwarmEvent[] = [];
    const sim = new SwarmSim(
      TASKS.map((lane) => lane.length),
      (e) => pending.push(e),
    );
    simRef.current = sim;

    let colors = readColors();
    const laneLabels = LANES.map((l) => l.label);
    const draw = () => sim.draw(ctx, colors, laneLabels, labelsRef.current.root);
    // O primeiro flush substitui o log: se o efeito remontar (StrictMode/HMR),
    // a nova simulação reinicia os ids e não pode se misturar com a anterior.
    let fresh = true;
    const flush = () => {
      if (pending.length || fresh) {
        const batch = pending.splice(0).reverse();
        const replace = fresh;
        fresh = false;
        setEvents((prev) => (replace ? batch : [...batch, ...prev]).slice(0, MAX_LOG));
      }
      setStats(sim.stats());
    };

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sim.resize(rect.width, rect.height);
      draw();
    };
    resize();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    reducedRef.current = reduced;

    // Pré-aquece a simulação para a seção já chegar "trabalhando".
    const advance = (seconds: number) => {
      for (let i = 0; i < seconds * 60; i++) sim.update(1 / 60);
    };
    advance(reduced ? 12 : 4);
    draw();
    flush();

    redrawRef.current = () => {
      if (reducedRef.current) advance(3);
      draw();
      flush();
    };

    let raf = 0;
    let last = 0;
    let acc = 0;
    let visible = false;

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      sim.update(dt);
      draw();
      acc += dt;
      if (acc > 0.25) {
        acc = 0;
        flush();
      }
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduced || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => (visible && !document.hidden ? start() : stop());

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.05 },
    );
    io.observe(wrap);

    const mo = new MutationObserver(() => {
      colors = readColors();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    document.addEventListener('visibilitychange', sync);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener('visibilitychange', sync);
      simRef.current = null;
    };
  }, []);

  const toLocal = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!simRef.current || e.pointerType !== 'mouse') return;
    simRef.current.pointer = toLocal(e);
    if (reducedRef.current) redrawRef.current();
  };

  const onPointerLeave = () => {
    if (!simRef.current) return;
    simRef.current.pointer = null;
    if (reducedRef.current) redrawRef.current();
  };

  const delegate = () => {
    simRef.current?.burst();
    redrawRef.current();
  };

  const describe = (e: SwarmEvent) => {
    const task = e.lane >= 0 && e.task >= 0 ? TASKS[e.lane][e.task][language] : '';
    const worker = `worker-${pad(e.worker)}`;
    switch (e.kind) {
      case 'plan':
        return { actor: `planner/${LANES[e.lane].id}`, text: `${t('swarm.ev.plan')} · ${task}`, tone: 'muted' };
      case 'claim':
        return { actor: worker, text: `${t('swarm.ev.claim')} · ${task}`, tone: 'muted' };
      case 'done':
        return { actor: worker, text: `✓ ${task}`, tone: 'ink' };
      case 'fail':
        return { actor: worker, text: `✗ ${t('swarm.ev.fail')} · ${task}`, tone: 'faint' };
      case 'judge':
        return { actor: 'judge', text: t('swarm.ev.judge').replace('{n}', String(e.cycle)), tone: 'accent' };
      case 'user':
        return { actor: t('swarm.you'), text: t('swarm.ev.user'), tone: 'accent' };
    }
  };

  const toneClass: Record<string, string> = {
    muted: 'text-muted',
    ink: 'text-ink',
    faint: 'text-faint',
    accent: 'text-accent',
  };

  const principles = [
    { num: '01', title: t('swarm.p1.title'), text: t('swarm.p1.text') },
    { num: '02', title: t('swarm.p2.title'), text: t('swarm.p2.text') },
    { num: '03', title: t('swarm.p3.title'), text: t('swarm.p3.text') },
  ];

  const statItems = [
    { value: String(stats.active), label: t('swarm.stat.active') },
    { value: String(stats.done), label: t('swarm.stat.done') },
    { value: pad(stats.cycle), label: t('swarm.stat.cycle') },
  ];

  return (
    <section id="swarm" className="relative overflow-hidden border-t border-line bg-base py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-columns opacity-40" />
      <div className="pointer-events-none absolute -right-48 top-24 h-[40rem] w-[40rem] glow-soft rounded-full" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="mb-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20"
        >
          <div>
            <div className="mb-6 flex items-baseline gap-4">
              <span className="index-num text-2xl">00</span>
              <span className="kicker-plain">{t('swarm.kicker')}</span>
            </div>
            <h2 className="display text-[clamp(2.5rem,6vw,4.5rem)] text-ink">
              {t('swarm.title')} <span className="text-gilt animate-gilt serif-italic">{t('swarm.titleAccent')}</span>.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-relaxed text-muted">{t('swarm.subtitle')}</p>
        </motion.div>

        {/* Visualization + live panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_22rem]"
        >
          <div className="plate overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-line px-5 py-4">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.65rem] uppercase tracking-[0.22em] text-faint">
                <li className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 border border-accent bg-surface" />
                  {t('swarm.legend.root')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2 w-2 rotate-45 border border-accent" />
                  {t('swarm.legend.planner')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {t('swarm.legend.worker')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 border border-dashed border-accent" />
                  {t('swarm.legend.task')}
                </li>
              </ul>
              <button
                type="button"
                onClick={delegate}
                className="btn-ghost flex items-center gap-2 px-4 py-2 text-xs"
              >
                <MousePointerClick className="h-3.5 w-3.5" />
                {t('swarm.delegate')}
              </button>
            </div>

            <div
              ref={wrapRef}
              onPointerMove={onPointerMove}
              onPointerLeave={onPointerLeave}
              onClick={delegate}
              className="relative h-[420px] cursor-pointer select-none sm:h-[520px]"
            >
              <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
              <p className="sr-only">{t('swarm.srDescription')}</p>
              <p className="pointer-events-none absolute bottom-4 left-5 text-[0.62rem] uppercase tracking-[0.24em] text-faint">
                {t('swarm.hint')}
              </p>
            </div>
          </div>

          <aside className="plate flex flex-col p-6">
            <div className="grid grid-cols-3 gap-4">
              {statItems.map((s) => (
                <div key={s.label}>
                  <span className="block font-serif text-4xl leading-none text-ink tabular-nums">{s.value}</span>
                  <span className="mt-2 block text-[0.6rem] uppercase leading-snug tracking-[0.2em] text-faint">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="my-6 rule" />

            <div className="mb-4 flex items-center gap-2.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.28em] text-faint">{t('swarm.log')}</span>
            </div>

            <ol
              className="relative flex-1 space-y-2.5 overflow-hidden text-[0.74rem] leading-snug"
              style={{ maskImage: 'linear-gradient(to bottom, black 65%, transparent)' }}
            >
              {events.map((e) => {
                const d = describe(e);
                return (
                  <motion.li
                    key={e.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, ease }}
                    className="grid grid-cols-[3.6rem_1fr] gap-2"
                  >
                    <span className="tabular-nums text-faint">{formatTime(e.time)}</span>
                    <span className="min-w-0">
                      <span className="text-accent">{d.actor}</span>{' '}
                      <span className={toneClass[d.tone]}>{d.text}</span>
                    </span>
                  </motion.li>
                );
              })}
            </ol>
          </aside>
        </motion.div>

        {/* Principles */}
        <div className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-12 md:grid-cols-3 md:gap-12">
          {principles.map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.08, ease }}
              viewport={{ once: true }}
            >
              <div className="mb-4 flex items-baseline gap-3">
                <span className="index-num">{p.num}</span>
                <h3 className="font-serif text-2xl text-ink">{p.title}</h3>
              </div>
              <p className="leading-relaxed text-muted">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
