import { motion } from 'framer-motion';
import { AnimatedWords, AnimatedLabel, AnimatedParagraph } from './AnimatedText';
import { personalInfo, aboutHighlights, aboutTags, aboutBio } from '../constants';

export default function About() {
  return (
    <section id="about" className="relative py-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/10 rounded-full blur-3xl" />

      <div className="section-padding">
        <div className="text-center mb-8">
          <AnimatedLabel text="✦ Introduction ✦" className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2 block" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <AnimatedWords text="About Me" delay={0.1} />
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative mb-8">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.fullName}
                className="w-36 h-36 rounded-2xl object-cover mx-auto lg:mx-0 glow-purple float-animation"
              />
              <div className="absolute -bottom-3 -right-3 lg:right-auto lg:-left-3 bg-purple-900/80 border border-purple-700/50 rounded-xl px-4 py-2 text-sm text-purple-300 hidden lg:block">
                📍 {personalInfo.locationShort}
              </div>
            </div>

            <AnimatedParagraph
              text={aboutBio.primary}
              className="text-gray-300 text-lg leading-relaxed mb-4"
              delay={0.1}
            />
            <AnimatedParagraph
              text={aboutBio.secondary}
              className="text-gray-400 leading-relaxed mb-6"
              delay={0.2}
            />

            <div className="flex flex-wrap gap-3">
              {aboutTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 text-sm bg-purple-900/40 border border-purple-700/40 text-purple-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {aboutHighlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="card-3d bg-gradient-to-br from-[#0f0a1e] to-[#0a0f1e] border border-purple-900/30 rounded-2xl p-6 hover:border-purple-600/50 transition-all duration-300 cursor-default"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
