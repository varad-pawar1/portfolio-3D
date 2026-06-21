import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { achievements } from '../constants';
import { AnimatedWords, AnimatedLabel } from './AnimatedText';

export default function Achievements() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="achievements" className="relative py-10 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-900/10 rounded-full blur-3xl" />

      <div className="section-padding">
        <div className="text-center mb-8">
          <AnimatedLabel text="✦ Milestones ✦" className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2 block" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <AnimatedWords text="Achievements" delay={0.1} />
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => item.image && setSelected(item)}
              className={`relative bg-gradient-to-br from-[#0d0a1a] to-[#080d1a] border border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all duration-300 group ${item.image ? 'cursor-pointer' : 'cursor-default'}`}
            >
              {item.image && (
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a1a] via-[#0d0a1a]/40 to-transparent" />
                </div>
              )}

              <div className="p-5">
                <div
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
                  style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }}
                />

                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border shrink-0"
                    style={{ background: item.color + '15', borderColor: item.color + '40' }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm leading-snug">{item.title}</h3>
                    <p className="text-gray-500 text-xs mt-1">{item.period}</p>
                  </div>
                </div>

                <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>

                {item.image && (
                  <p className="text-purple-400 text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to view certificate →
                  </p>
                )}
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
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-[#0d0a1a] border border-purple-800/50 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                ✕
              </button>
              <img src={selected.image} alt={selected.title} className="w-full max-h-[70vh] object-contain" />
              <div className="p-4 border-t border-purple-900/30">
                <h3 className="text-white font-semibold">{selected.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
