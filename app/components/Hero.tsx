import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { useEffect } from 'react';

const ease = [0.16, 1, 0.3, 1] as const;

const focus = [
  { num: '01', label: 'Front-end', val: 'React · TypeScript' },
  { num: '02', label: 'Back-end', val: 'Node.js · APIs' },
  { num: '03', label: 'Interface', val: 'Tailwind · UX' },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/Pecinallix' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/icaropecinalli/' },
  { label: 'Email', href: 'mailto:icaropecinalli@gmail.com' },
];

export default function Hero() {
  const { t } = useLanguage();

  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);

  const spring = { stiffness: 50, damping: 18, mass: 0.6 };
  const sx = useSpring(cx, spring);
  const sy = useSpring(cy, spring);
  const plateX = useTransform(sx, [-0.5, 0.5], [14, -14]);
  const plateY = useTransform(sy, [-0.5, 0.5], [14, -14]);

  const spotX = useTransform(pointerX, (v) => `${v * 100}%`);
  const spotY = useTransform(pointerY, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${spotX} ${spotY}, rgba(201,168,106,0.07), transparent 60%)`;

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth;
      const ny = e.clientY / window.innerHeight;
      pointerX.set(nx);
      pointerY.set(ny);
      cx.set(nx - 0.5);
      cy.set(ny - 0.5);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [pointerX, pointerY, cx, cy]);

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-base grain"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[44rem] w-[44rem] glow-soft rounded-full" />
      <div className="pointer-events-none absolute inset-0 bg-rules opacity-60" />
      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{ background: spotlight }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1400px] flex-col justify-center px-5 pt-28 pb-20 sm:px-8 lg:px-12">
        {/* Dateline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.7rem] uppercase tracking-[0.24em] text-faint"
        >
          <span className="kicker-plain">Portfólio</span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span>Rio de Janeiro · BR</span>
          <span className="hidden h-3 w-px bg-line sm:block" />
          <span>Est. {new Date().getFullYear()}</span>
        </motion.div>

        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-[1fr_22rem]">
          {/* Main column */}
          <div>
            <h1 className="display text-[clamp(3.5rem,11vw,9rem)] text-ink">
              {['Ícaro', 'Pecinalli'].map((word, i) => (
                <motion.span
                  key={word}
                  className={`block ${i === 1 ? 'text-gilt animate-gilt serif-italic' : ''}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
              className="mt-8 max-w-xl font-serif text-xl leading-relaxed text-muted sm:text-2xl"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease }}
              className="mt-10 h-px w-full max-w-xl bg-line"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease }}
              className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-center"
            >
              <div className="flex flex-wrap gap-3">
                <a href="#projects" className="btn-gold group flex items-center gap-2 px-7 py-3.5 text-sm">
                  {t('hero.cta')}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="/curriculo.pdf"
                  download="Icaro_Pecinalli_Curriculo.pdf"
                  className="btn-ghost px-7 py-3.5 text-sm"
                >
                  {t('hero.download')}
                </a>
              </div>

              <div className="flex items-center gap-5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-sm"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Calling-card plate */}
          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease }}
            style={{ x: plateX, y: plateY }}
            className="hidden lg:block"
          >
            <div className="plate p-7">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="text-[0.7rem] uppercase tracking-[0.22em] text-muted">
                  Disponível para projetos
                </span>
              </div>

              <div className="my-6 rule" />

              <p className="mb-4 text-[0.65rem] uppercase tracking-[0.28em] text-faint">Foco</p>
              <ul className="space-y-4">
                {focus.map((f) => (
                  <li key={f.num} className="flex items-baseline gap-3">
                    <span className="font-serif italic text-sm text-accent">{f.num}</span>
                    <span>
                      <span className="block font-serif text-ink">{f.label}</span>
                      <span className="block text-xs text-faint">{f.val}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <div className="my-6 rule" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="mb-1 text-[0.65rem] uppercase tracking-[0.28em] text-faint">Base</p>
                  <p className="font-serif text-ink">Araruama, RJ</p>
                </div>
                <span className="text-gilt font-serif text-4xl leading-none">íp</span>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-accent sm:flex"
      >
        <span className="text-[0.62rem] uppercase tracking-[0.3em]">Role</span>
        <motion.span animate={{ y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
