import { motion } from 'framer-motion';
import { education } from '../constants';
import { AnimatedWords, AnimatedLabel } from './AnimatedText';

export default function Education() {
  return (
    <section id="education" className="relative py-10 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-900/10 rounded-full blur-3xl" />

      <div className="section-padding">
        <div className="text-center mb-8">
          <AnimatedLabel text="✦ My Journey ✦" className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2 block" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <AnimatedWords text="Education" delay={0.1} />
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {education.map((edu, i) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="card-3d relative bg-gradient-to-br from-[#0d0a1a] to-[#080d1a] border border-purple-900/30 rounded-2xl p-8 hover:border-purple-600/50 transition-all duration-300 overflow-hidden group"
            >
              {/* Background accent */}
              <div
                className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 group-hover:opacity-20 transition-opacity"
                style={{ background: edu.color }}
              />

              <div className="relative flex flex-col items-center text-center gap-2">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl border"
                  style={{ background: edu.color + '15', borderColor: edu.color + '40' }}
                >
                  {edu.icon}
                </div>

                <h3 className="text-white text-lg font-bold">{edu.degree}</h3>
                <p className="font-semibold" style={{ color: edu.color }}>{edu.institution}</p>

                <span
                  className="px-4 py-1 text-xs rounded-full border font-medium"
                  style={{ color: edu.color, borderColor: edu.color + '50', background: edu.color + '15' }}
                >
                  {edu.period}
                </span>

                <p className="text-gray-500 text-xs">{edu.field}</p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-400 text-sm leading-relaxed"
                >
                  {edu.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
