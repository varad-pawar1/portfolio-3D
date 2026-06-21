import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects } from '../constants';
import { AnimatedWords, AnimatedLabel } from './AnimatedText';

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-gradient-to-br from-[#0d0a1a] to-[#080d1a] border border-purple-900/30 rounded-2xl overflow-hidden hover:border-purple-600/50 transition-all duration-300 flex flex-col"
    >
      {project.image && (
        <div className="relative h-48 overflow-hidden bg-[#0a0a12]">
          <img
            src={project.image}
            alt={`${project.name} dashboard`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0a1a] via-[#0d0a1a]/20 to-transparent" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <div
          className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
        />

        <div
          className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity blur-2xl"
          style={{ background: project.color }}
        />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl border shrink-0"
              style={{ background: project.color + '15', borderColor: project.color + '40' }}
            >
              {project.icon}
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">{project.name}</h3>
              <div className="flex flex-wrap items-center gap-2 mt-0.5">
                {project.client && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/30 text-blue-300 border border-blue-700/40">
                    {project.client}
                  </span>
                )}
                {project.category === 'professional' && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/40 text-purple-300 border border-purple-700/40">
                    Professional
                  </span>
                )}
                {project.live && (
                  <span className="flex items-center gap-1 text-green-400 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Live
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800/60 border border-gray-700/40 flex items-center justify-center text-sm hover:bg-gray-700/60 hover:border-purple-600/50 transition-all"
                title="GitHub"
              >
                🐙
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm hover:scale-110 transition-all border"
                style={{ background: project.color + '20', borderColor: project.color + '50' }}
                title="Live Demo"
              >
                🔗
              </a>
            )}
          </div>
        </div>

        <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-xs rounded-full border font-medium"
              style={{ color: project.color, borderColor: project.color + '40', background: project.color + '10' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState('professional');
  const professional = projects.filter((p) => p.category === 'professional');
  const personal = projects.filter((p) => p.category === 'personal');

  const tabs = [
    { id: 'all', label: 'All Projects', items: projects },
    { id: 'professional', label: 'Professional', items: professional },
    { id: 'personal', label: 'Personal', items: personal },
  ];

  const activeItems = tabs.find((t) => t.id === activeTab)?.items ?? projects;

  return (
    <section id="projects" className="relative py-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-60 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="section-padding">
        <div className="text-center mb-8">
          <AnimatedLabel text="✦ Client Deliverables ✦" className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2 block" />
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            <AnimatedWords text="Projects" delay={0.1} />
          </h2>
          <p className="text-gray-500 text-sm mt-3 max-w-lg mx-auto">
            Professional client work featured first — VenturePact, Outgrow & Masters' Union
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white glow-purple'
                  : 'border border-purple-700/40 text-purple-300 hover:bg-purple-900/30'
              }`}
            >
              {tab.label}
              <span className="ml-2 text-xs opacity-70">({tab.items.length})</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {activeItems.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
