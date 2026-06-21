import { motion } from 'framer-motion';
import { experiences } from '../constants';
import { AnimatedWords, AnimatedLabel } from './AnimatedText';

export default function Experience() {
  return (
    <section id="experience" className="relative py-10 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-900/10 rounded-full blur-3xl" />

      <div className="section-padding">
        <div className="text-center mb-8">
          <AnimatedLabel text="✦ Professional Journey ✦" className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2 block" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <AnimatedWords text="Professional Experience" delay={0.1} />
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-xl mx-auto">
            2+ years in software development · 1.5+ years professional · 6 months Masai School internship
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-600 via-blue-500 to-transparent" />

          {experiences.map((exp, i) => (
            <motion.div
              key={`${exp.company}-${i}`}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative pl-16 mb-12 last:mb-0"
            >
              {/* Dot */}
              <div
                className="absolute left-0 top-1 w-12 h-12 rounded-full flex items-center justify-center text-xl border-4 border-[#050816]"
                style={{ background: `linear-gradient(135deg, ${exp.color}40, ${exp.color}20)`, borderColor: exp.color + '60' }}
              >
                {exp.icon}
              </div>

              {/* Card */}
              <div className="card-3d bg-gradient-to-br from-[#0d0a1a] to-[#080d1a] border border-purple-900/30 rounded-2xl p-6 hover:border-purple-600/40 transition-all duration-300">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-white text-xl font-bold">{exp.title}</h3>
                    <p className="font-semibold mt-1" style={{ color: exp.color }}>{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 text-xs rounded-full border font-medium"
                      style={{ color: exp.color, borderColor: exp.color + '50', background: exp.color + '15' }}>
                      {exp.period}
                    </span>
                    <p className="text-gray-500 text-xs mt-1">📍 {exp.location}</p>
                  </div>
                </div>

                <ul className="space-y-2">
                  {exp.points.map((point, j) => (
                    <motion.li
                      key={j}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + j * 0.1 }}
                      className="flex gap-2 text-gray-400 text-sm leading-relaxed"
                    >
                      <span className="text-purple-400 mt-0.5 shrink-0">▸</span>
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
