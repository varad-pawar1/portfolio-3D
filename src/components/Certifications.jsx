import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications } from '../constants';
import { AnimatedWords, AnimatedLabel } from './AnimatedText';

export default function Certifications() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="certifications" className="relative py-10 overflow-hidden">
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-purple-900/10 rounded-full blur-3xl" />

      <div className="section-padding">
        <div className="text-center mb-8">
          <AnimatedLabel text="✦ Credentials ✦" className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2 block" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <AnimatedWords text="Certifications" delay={0.1} />
          </h2>
          <p className="text-gray-500 text-sm mt-3">Click any certificate to view full details</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <motion.div
              key={`${cert.name}-${cert.issuer}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelected(cert)}
              className="relative bg-gradient-to-br from-[#0d0a1a] to-[#080d1a] border border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all duration-300 group cursor-pointer"
            >
              {cert.image && (
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a1a] via-transparent to-transparent" />
                </div>
              )}

              <div className="p-5">
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
                />

                <div className="flex items-start gap-3 mb-2">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl border shrink-0"
                    style={{ background: cert.color + '15', borderColor: cert.color + '40' }}
                  >
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm leading-snug">{cert.name}</h3>
                    <p className="text-gray-500 text-xs mt-0.5">{cert.issuer}</p>
                    {cert.period && <p className="text-gray-600 text-xs mt-0.5">{cert.period}</p>}
                  </div>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: cert.color + '20', border: `1px solid ${cert.color}40` }}
                  >
                    <span className="text-xs">✓</span>
                  </div>
                </div>

                {cert.description && (
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mt-2">{cert.description}</p>
                )}

                <p className="text-purple-400 text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view details →
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full max-h-[90vh] bg-gradient-to-br from-[#0d0a1a] to-[#080d1a] border border-purple-800/50 rounded-2xl overflow-hidden flex flex-col"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black/90 transition-colors border border-purple-800/40"
                aria-label="Close"
              >
                ✕
              </button>

              {selected.image && (
                <div className="relative bg-[#050816] shrink-0">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="w-full max-h-[50vh] object-contain"
                  />
                </div>
              )}

              <div className="p-6 overflow-y-auto">
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl border shrink-0"
                    style={{ background: selected.color + '15', borderColor: selected.color + '40' }}
                  >
                    {selected.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl">{selected.name}</h3>
                    <p className="font-medium mt-1" style={{ color: selected.color }}>{selected.issuer}</p>
                    {selected.period && (
                      <p className="text-gray-500 text-sm mt-1">📅 {selected.period}</p>
                    )}
                  </div>
                </div>

                {selected.description && (
                  <div className="mb-5">
                    <h4 className="text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">About</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{selected.description}</p>
                  </div>
                )}

                {selected.skills?.length > 0 && (
                  <div>
                    <h4 className="text-purple-400 text-xs font-semibold uppercase tracking-wider mb-3">Skills Covered</h4>
                    <div className="flex flex-wrap gap-2">
                      {selected.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs rounded-full border font-medium"
                          style={{
                            color: selected.color,
                            borderColor: selected.color + '40',
                            background: selected.color + '10',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
