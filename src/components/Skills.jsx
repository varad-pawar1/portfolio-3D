import { motion } from 'framer-motion';
import { skills, personalInfo } from '../constants';
import { AnimatedWords, AnimatedLabel } from './AnimatedText';

function SkillBar({ skill, index }) {
  return (
    <motion.a
      href={skill.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group card-3d bg-gradient-to-br from-[#0d0a1a] to-[#080d1a] border border-purple-900/20 rounded-xl p-5 hover:border-purple-600/40 transition-all duration-300 block cursor-pointer"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{skill.icon}</span>
          <span className="text-white font-medium group-hover:text-purple-300 transition-colors">{skill.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: skill.color }}>{skill.level}%</span>
          <span className="text-gray-600 group-hover:text-purple-400 transition-colors text-xs">↗</span>
        </div>
      </div>
      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.05 + 0.2, ease: 'easeOut' }}
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, #7c3aed, ${skill.color})` }}
        />
      </div>
    </motion.a>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative py-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-900/10 rounded-full blur-3xl" />

      <div className="section-padding">
        <div className="text-center mb-8">
          <AnimatedLabel text="✦ My Arsenal ✦" className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2 block" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <AnimatedWords text="Technical Skills" delay={0.1} />
          </h2>
        </div>

        <div className="flex justify-center mb-10">
          <div className="relative w-72 h-72">
            <div className="absolute inset-0 rounded-full border border-purple-700/30 animate-spin" style={{ animationDuration: '20s' }} />
            <div className="absolute inset-4 rounded-full border border-blue-700/20 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
            <div className="absolute inset-8 rounded-full border border-purple-600/20 animate-spin" style={{ animationDuration: '10s' }} />

            {['⚛️', '🅰️', '🟢', '🔷', '🍃', '🤖'].map((icon, i) => {
              const angle = (i / 6) * 2 * Math.PI;
              const r = 110;
              const x = 50 + (r / 144) * 50 * Math.cos(angle);
              const y = 50 + (r / 144) * 50 * Math.sin(angle);
              return (
                <div
                  key={i}
                  className="absolute text-xl w-10 h-10 flex items-center justify-center bg-[#0d0a1a] border border-purple-800/40 rounded-full"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                >
                  {icon}
                </div>
              );
            })}

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex flex-col items-center justify-center glow-purple pulse-glow">
                <span className="text-white font-bold text-xl">{personalInfo.initials}</span>
                <span className="text-white/70 text-[10px]">Dev</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
