import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '1efa6327-a8af-428f-97c2-eb2e4558d945',
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to: 'icaropecinalli@gmail.com',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { icon: Mail, title: t('contact.email'), value: 'icaropecinalli@gmail.com', link: 'mailto:icaropecinalli@gmail.com' },
    { icon: Phone, title: t('contact.phone'), value: '+55 (22) 99267-9550', link: 'https://wa.link/edn4ap' },
    { icon: MapPin, title: t('contact.location'), value: 'Rio de Janeiro, Araruama', link: '#' },
  ];

  const inputClasses =
    'w-full border-b border-line bg-transparent py-3 text-ink placeholder:text-faint focus:border-accent focus:outline-none transition-colors';
  const labelClasses = 'mb-2 block text-[0.68rem] uppercase tracking-[0.2em] text-faint';

  return (
    <section id="contact" className="relative overflow-hidden bg-base-2 py-28 sm:py-36">
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 glow-soft rounded-full" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          viewport={{ once: true }}
          className="mb-16 max-w-3xl"
        >
          <div className="mb-6 flex items-baseline gap-4">
            <span className="index-num text-2xl">06</span>
            <span className="kicker-plain">Contato</span>
          </div>
          <h2 className="display mb-6 text-[clamp(2.5rem,7vw,5rem)] text-ink">
            Vamos criar algo{' '}
            <span className="text-gilt serif-italic">memorável</span>.
          </h2>
          <p className="text-lg leading-relaxed text-muted">{t('contact.subtitle')}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            viewport={{ once: true }}
          >
            <p className="mb-10 max-w-sm leading-relaxed text-muted">
              {t('contact.description')}
            </p>

            <div className="space-y-1">
              {contactInfo.map((info) => (
                <a
                  key={info.title}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 border-t border-line py-5 last:border-b"
                >
                  <info.icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                  <div className="flex-1">
                    <div className="text-[0.62rem] uppercase tracking-[0.22em] text-faint">{info.title}</div>
                    <div className="font-serif text-lg text-ink transition-colors group-hover:text-accent">{info.value}</div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              ))}
            </div>

            <div className="mt-10">
              <p className="mb-4 text-[0.62rem] uppercase tracking-[0.24em] text-faint">{t('contact.social')}</p>
              <div className="flex gap-6">
                <a href="https://github.com/Pecinallix" target="_blank" rel="noopener noreferrer" className="link-underline text-sm">GitHub</a>
                <a href="https://www.linkedin.com/in/icaropecinalli/" target="_blank" rel="noopener noreferrer" className="link-underline text-sm">LinkedIn</a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClasses}>{t('contact.form.name')}</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClasses} placeholder={t('contact.form.namePlaceholder')} />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>{t('contact.form.email')}</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClasses} placeholder={t('contact.form.emailPlaceholder')} />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className={labelClasses}>{t('contact.form.subject')}</label>
              <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={inputClasses} placeholder={t('contact.form.subjectPlaceholder')} />
            </div>

            <div>
              <label htmlFor="message" className={labelClasses}>{t('contact.form.message')}</label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className={`${inputClasses} resize-none`} placeholder={t('contact.form.messagePlaceholder')} />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`btn-gold flex w-full items-center justify-center gap-2 py-4 text-sm sm:w-auto sm:px-12 ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {t('contact.form.sending')}
                </>
              ) : (
                <>
                  {t('contact.form.send')}
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-2 border-accent bg-accent-soft px-4 py-3 text-sm text-ink"
              >
                {t('contact.form.success')}
              </motion.p>
            )}
            {submitStatus === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-l-2 border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                {t('contact.form.error')}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
