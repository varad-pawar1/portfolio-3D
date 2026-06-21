import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatedWords, AnimatedLabel, AnimatedParagraph } from './AnimatedText';
import { personalInfo } from '../constants';

const contactLinks = [
  {
    icon: '📧',
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    color: '#ea4335',
  },
  {
    icon: '📱',
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone.replace(/\s/g, '')}`,
    color: '#34d399',
  },
  {
    icon: '💼',
    label: 'LinkedIn',
    value: personalInfo.linkedinDisplay,
    href: personalInfo.linkedin,
    color: '#0077b5',
  },
  {
    icon: '🐙',
    label: 'GitHub',
    value: personalInfo.githubDisplay,
    href: personalInfo.github,
    color: '#ffffff',
  },
  {
    icon: '📍',
    label: 'Location',
    value: personalInfo.address,
    href: null,
    color: '#38bdf8',
  },
];

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(personalInfo.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  return (
    <section id="contact" className="relative py-10 overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl" />

      <div className="section-padding">
        <div className="text-center mb-8">
          <AnimatedLabel text="✦ Let's Talk ✦" className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2 block" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <AnimatedWords text="Get In Touch" delay={0.1} />
          </h2>
          <AnimatedParagraph
            text="I'm currently open to new opportunities. Whether you have a project, a question, or just want to say hi — my inbox is open!"
            className="text-gray-400 max-w-lg mx-auto justify-center"
            delay={0.2}
          />
        </div>

        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            {contactLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="flex items-center gap-4 p-5 bg-gradient-to-br from-[#0d0a1a] to-[#080d1a] border border-purple-900/30 rounded-xl hover:border-purple-600/50 transition-all duration-300 group"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border"
                      style={{ background: link.color + '15', borderColor: link.color + '40' }}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">{link.label}</p>
                      <p className="text-white text-sm group-hover:text-purple-300 transition-colors">{link.value}</p>
                    </div>
                    <span className="ml-auto text-gray-600 group-hover:text-purple-400 transition-colors">→</span>
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-5 bg-gradient-to-br from-[#0d0a1a] to-[#080d1a] border border-purple-900/30 rounded-xl">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border"
                      style={{ background: link.color + '15', borderColor: link.color + '40' }}
                    >
                      {link.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs mb-0.5">{link.label}</p>
                      <p className="text-white text-sm">{link.value}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            <div className="flex gap-3 pt-2">
              {[
                { href: personalInfo.linkedin, icon: '💼', bg: 'bg-blue-900/30 border-blue-700/40 hover:bg-blue-800/40' },
                { href: personalInfo.github, icon: '🐙', bg: 'bg-gray-900/50 border-gray-700/40 hover:bg-gray-800/60' },
              ].map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 rounded-full border flex items-center justify-center text-lg transition-colors ${s.bg}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-[#0d0a1a] to-[#080d1a] border border-purple-900/30 rounded-2xl p-6"
          >
            <h3 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <span>✉️</span> Send a Message
            </h3>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="text-white font-bold text-lg mb-2">Message Sent!</h4>
                <p className="text-gray-400 text-sm mb-6">Thanks for reaching out. I'll get back to you within 24 hours.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2 border border-purple-600 text-purple-400 rounded-full text-sm hover:bg-purple-600/10 transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-500 text-xs mb-1 block">Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-[#050816] border border-purple-900/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-gray-500 text-xs mb-1 block">Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-[#050816] border border-purple-900/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-gray-500 text-xs mb-1 block">Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className="w-full bg-[#050816] border border-purple-900/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-600 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-gray-500 text-xs mb-1 block">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full bg-[#050816] border border-purple-900/40 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-purple-600 transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-400 text-xs flex items-center gap-1">
                    <span>⚠️</span> {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl font-medium hover:from-purple-500 hover:to-purple-700 transition-all duration-300 glow-purple disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'loading' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <><span>🚀</span> Send Message</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-16 pb-8 text-gray-600 text-sm"
      >
        <p>Designed & Built by <span className="gradient-text font-semibold">{personalInfo.fullName}</span></p>
      </motion.div>
    </section>
  );
}
