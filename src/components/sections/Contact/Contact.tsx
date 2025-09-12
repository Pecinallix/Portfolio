'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { RiGithubFill, RiLinkedinBoxFill, RiMailFill } from 'react-icons/ri';
import styles from './Contact.module.css';
import SectionTitle from '@/components/common/SectionTitle';
import Button from '@/components/common/Button';

interface ContactProps {
  email: string;
  githubUrl: string;
  linkedinUrl: string;
}

const Contact: React.FC<ContactProps> = ({ email, githubUrl, linkedinUrl }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // Simulação de envio do formulário
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Formulário enviado:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setStatus('error');
    }
  };

  const socialLinks = [
    { icon: <RiMailFill />, url: `mailto:${email}` },
    { icon: <RiLinkedinBoxFill />, url: linkedinUrl },
    { icon: <RiGithubFill />, url: githubUrl },
  ];

  return (
    <section id="contact" className={styles.contact}>
      <SectionTitle title="Contato" />
      <div className={styles.content}>
        <motion.div
          className={styles.info}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3>Vamos conversar?</h3>
          <p>
            Estou sempre em busca de novos desafios e oportunidades. Sinta-se à
            vontade para me enviar uma mensagem.
          </p>
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, color: 'var(--color-primary)' }}
                whileTap={{ scale: 0.9 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Mensagem</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" primary disabled={status === 'sending'}>
            {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
          </Button>
          {status === 'success' && (
            <p className={styles.statusSuccess}>
              Mensagem enviada com sucesso!
            </p>
          )}
          {status === 'error' && (
            <p className={styles.statusError}>
              Ocorreu um erro. Tente novamente mais tarde.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
