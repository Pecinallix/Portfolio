'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { RiGithubFill, RiLinkedinBoxFill, RiMailFill } from 'react-icons/ri';

import Button from '@/components/common/Button/Button';
import SectionTitle from '@/components/common/SectionTitle/SectionTitle';

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
    { icon: <RiMailFill className="h-7 w-7" />, url: `mailto:${email}` },
    { icon: <RiLinkedinBoxFill className="h-7 w-7" />, url: linkedinUrl },
    { icon: <RiGithubFill className="h-7 w-7" />, url: githubUrl },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-4 md:px-12 bg-gray-950 text-gray-300"
    >
      <SectionTitle title="Contato" />
      <div className="container mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mt-8">
        <div className="flex flex-col space-y-4 text-center lg:text-left">
          <h3 className="text-3xl font-bold text-white">Vamos conversar?</h3>
          <p className="text-lg leading-relaxed">
            Estou sempre em busca de novos desafios e oportunidades. Sinta-se à
            vontade para me enviar uma mensagem.
          </p>
          <div className="flex justify-center lg:justify-start space-x-6 mt-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-indigo-600 transition-colors duration-200"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-400 font-semibold mb-2">
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-400 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="text-gray-400 font-semibold mb-2"
            >
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all duration-200"
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
          </Button>
          {status === 'success' && (
            <p className="text-green-500 text-center font-semibold mt-4">
              Mensagem enviada com sucesso!
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-center font-semibold mt-4">
              Ocorreu um erro. Tente novamente mais tarde.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
