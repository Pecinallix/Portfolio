import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      value: 'icaropecinalli@gmail.com',
      link: 'mailto:icaropecinalli@gmail.com',
    },
    {
      icon: Phone,
      title: t('contact.phone'),
      value: '+55 (22) 99267-9550',
      link: 'https://wa.link/edn4ap',
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      value: 'Rio de Janeiro, Araruama',
      link: 'https://www.google.com/maps/place/Araruama,+RJ,+28970-000/@-22.8722194,-42.3249471,15z/data=!4m6!3m5!1s0x976960700fa6fb:0xdecb667ffd84cc3c!8m2!3d-22.8728058!4d-42.3413939!16s%2Fm%2F027l4j8?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoASAFQAw%3D%3D',
    },
  ];

  return (
    <section id="contact" className="py-20 dark:bg-gray-800 light:bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              {t('contact.info')}
            </h3>
            <p className="text-gray-400 mb-8">
              {t('contact.description')}
            </p>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 dark:bg-gray-900 light:bg-white rounded-lg dark:hover:bg-gray-700 light:hover:bg-gray-50 transition-all group"
                >
                  <div className="p-3 dark:bg-cyan-500/10 light:bg-cyan-100 rounded-lg dark:group-hover:bg-cyan-500/20 light:group-hover:bg-cyan-200 transition-colors">
                    <info.icon className="w-6 h-6 dark:text-cyan-400 light:text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      {info.title}
                    </h4>
                    <p className="text-gray-400">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">
                {t('contact.social')}
              </h4>
              <div className="flex gap-3 sm:gap-4">
                <a
                  href="https://github.com/Pecinallix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 dark:bg-gray-900 light:bg-white rounded-lg dark:hover:bg-cyan-500 light:hover:bg-cyan-600 transition-all hover:scale-110 dark:border-gray-700 light:border-gray-200 group"
                >
                  <svg
                    className="w-6 h-6 dark:text-white light:text-slate-800 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/icaropecinalli/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 dark:bg-gray-900 light:bg-white rounded-lg dark:hover:bg-cyan-500 light:hover:bg-cyan-600 transition-all hover:scale-110 dark:border-gray-700 light:border-gray-200 group"
                >
                  <svg
                    className="w-6 h-6 dark:text-white light:text-slate-800 group-hover:text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label
                  htmlFor="name"
                  className="block text-white mb-2 font-medium"
                >
                  {t('contact.form.name')}
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 dark:bg-gray-900 light:bg-white dark:text-white light:text-slate-800 rounded-lg focus:outline-none focus:ring-2 dark:focus:ring-cyan-500 light:focus:ring-cyan-600 transition-all dark:border-gray-700 light:border-gray-200"
                  placeholder={t('contact.form.namePlaceholder')}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label
                  htmlFor="email"
                  className="block dark:text-white light:text-slate-800 mb-2 font-medium"
                >
                  {t('contact.form.email')}
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 dark:bg-gray-900 light:bg-white dark:text-white light:text-slate-800 rounded-lg focus:outline-none focus:ring-2 dark:focus:ring-cyan-500 light:focus:ring-cyan-600 transition-all dark:border-gray-700 light:border-gray-200"
                  placeholder={t('contact.form.emailPlaceholder')}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label
                  htmlFor="subject"
                  className="block dark:text-white light:text-slate-800 mb-2 font-medium"
                >
                  {t('contact.form.subject')}
                </label>
                <motion.input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 dark:bg-gray-900 light:bg-white dark:text-white light:text-slate-800 rounded-lg focus:outline-none focus:ring-2 dark:focus:ring-cyan-500 light:focus:ring-cyan-600 transition-all dark:border-gray-700 light:border-gray-200"
                  placeholder={t('contact.form.subjectPlaceholder')}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
              >
                <label
                  htmlFor="message"
                  className="block dark:text-white light:text-slate-800 mb-2 font-medium"
                >
                  {t('contact.form.message')}
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 dark:bg-gray-900 light:bg-white dark:text-white light:text-slate-800 rounded-lg focus:outline-none focus:ring-2 dark:focus:ring-cyan-500 light:focus:ring-cyan-600 transition-all resize-none dark:border-gray-700 light:border-gray-200"
                  placeholder={t('contact.form.messagePlaceholder')}
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 relative overflow-hidden group ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                <motion.span className="absolute inset-0 bg-linear-to-r from-cyan-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="relative z-10"
                    >
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    </motion.div>
                    <span className="relative z-10">{t('contact.form.sending')}</span>
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10"
                    >
                      <Send className="w-5 h-5" />
                    </motion.div>
                    <span className="relative z-10">{t('contact.form.send')}</span>
                  </>
                )}
              </motion.button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center"
                >
                  {t('contact.form.success')}
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center"
                >
                  {t('contact.form.error')}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
