import { motion } from 'framer-motion';
import { useRef } from 'react';
import { AnimatedWords, AnimatedLabel, AnimatedParagraph } from './AnimatedText';
import { personalInfo, experiences, education, certifications, languages, aboutBio } from '../constants';

const resumeData = {
  name: personalInfo.fullName,
  title: personalInfo.tagline,
  location: personalInfo.location,
  email: personalInfo.email,
  phone: personalInfo.phone,
  linkedin: personalInfo.linkedinDisplay,
  summary: aboutBio.primary + ' ' + aboutBio.secondary,
  experience: experiences.map((exp) => ({
    role: exp.title,
    company: exp.company,
    period: exp.period,
    location: exp.location,
    bullets: exp.points,
  })),
  education: education.map((edu) => ({
    degree: edu.degree,
    institution: edu.institution,
    period: edu.period,
  })),
  skills: {
    Frontend: ['React.js', 'Angular', 'TypeScript', 'Redux', 'Tailwind CSS', 'Bootstrap'],
    Backend: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io', 'Redis', 'BullMQ'],
    Database: ['MongoDB', 'MySQL', 'Firebase'],
    'AI & Tools': ['Generative AI', 'OpenAI', 'Gemini', 'Git', 'Postman', 'Python'],
  },
  certifications: certifications.map((c) => `${c.name} — ${c.issuer}`),
};

function handlePrint() {
  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8" />
      <title>${resumeData.name} — Resume</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Arial, sans-serif; color: #1a1a2e; background: #fff; padding: 40px; max-width: 860px; margin: 0 auto; }
        h1 { font-size: 28px; color: #1a1a2e; }
        .subtitle { color: #7c3aed; font-size: 14px; margin-top: 4px; font-weight: 600; }
        .contact-row { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 8px; font-size: 12px; color: #555; }
        hr { border: none; border-top: 2px solid #7c3aed; margin: 18px 0 14px; }
        h2 { font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: #7c3aed; margin-bottom: 12px; }
        .summary { font-size: 13px; color: #444; line-height: 1.7; }
        .exp-header { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
        .exp-role { font-weight: 700; font-size: 14px; color: #1a1a2e; }
        .exp-company { font-weight: 600; font-size: 13px; color: #7c3aed; }
        .exp-meta { font-size: 12px; color: #777; }
        .exp-block { margin-bottom: 18px; }
        ul { padding-left: 16px; margin-top: 6px; }
        ul li { font-size: 12px; color: #444; line-height: 1.65; margin-bottom: 2px; }
        .edu-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
        .edu-degree { font-size: 13px; font-weight: 600; color: #1a1a2e; }
        .edu-inst { font-size: 12px; color: #7c3aed; }
        .edu-period { font-size: 12px; color: #777; }
        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .skill-label { font-size: 11px; font-weight: 700; color: #7c3aed; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
        .skill-tags { display: flex; flex-wrap: wrap; gap: 5px; }
        .skill-tag { background: #f3f0ff; color: #5b21b6; font-size: 11px; padding: 2px 8px; border-radius: 12px; }
        .cert-list { columns: 2; font-size: 12px; color: #444; }
        .cert-list li { margin-bottom: 4px; break-inside: avoid; }
        section { margin-bottom: 24px; }
        @media print { body { padding: 20px; } @page { margin: 0.5in; } }
      </style>
    </head>
    <body>
      <h1>${resumeData.name}</h1>
      <p class="subtitle">${resumeData.title}</p>
      <div class="contact-row">
        <span>📧 ${resumeData.email}</span>
        <span>📱 ${resumeData.phone}</span>
        <span>💼 ${resumeData.linkedin}</span>
        <span>📍 ${resumeData.location}</span>
      </div>
      <hr />
      <section><h2>Summary</h2><p class="summary">${resumeData.summary}</p></section>
      <hr />
      <section>
        <h2>Experience</h2>
        ${resumeData.experience.map(exp => `
          <div class="exp-block">
            <div class="exp-header">
              <div>
                <div class="exp-role">${exp.role}</div>
                <div class="exp-company">${exp.company} &nbsp;·&nbsp; <span class="exp-meta">${exp.location}</span></div>
              </div>
              <div class="exp-meta">${exp.period}</div>
            </div>
            <ul>${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
          </div>
        `).join('')}
      </section>
      <hr />
      <section>
        <h2>Education</h2>
        ${resumeData.education.map(edu => `
          <div class="edu-row">
            <div><div class="edu-degree">${edu.degree}</div><div class="edu-inst">${edu.institution}</div></div>
            <div class="edu-period">${edu.period}</div>
          </div>
        `).join('')}
      </section>
      <hr />
      <section>
        <h2>Skills</h2>
        <div class="skills-grid">
          ${Object.entries(resumeData.skills).map(([cat, items]) => `
            <div>
              <div class="skill-label">${cat}</div>
              <div class="skill-tags">${items.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
            </div>
          `).join('')}
        </div>
      </section>
      <hr />
      <section>
        <h2>Certifications</h2>
        <ul class="cert-list">${resumeData.certifications.map(c => `<li>${c}</li>`).join('')}</ul>
      </section>
      <script>window.onload = () => { window.print(); }</script>
    </body>
    </html>
  `);
  printWindow.document.close();
}

function handlePdfDownload() {
  const link = document.createElement('a');
  link.href = personalInfo.resumePdf;
  link.download = personalInfo.resumeFileName;
  link.target = '_blank';
  link.click();
}

export default function Resume() {
  const resumeRef = useRef();

  return (
    <section id="resume" className="relative py-10 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-60 bg-purple-900/10 rounded-full blur-3xl pointer-events-none" />

      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <AnimatedLabel text="✦ My CV ✦" className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-2 block" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            <AnimatedWords text="Resume" delay={0.1} />
          </h2>

          <div className="flex flex-wrap gap-4 justify-center mt-2 mb-4">
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePdfDownload}
              className="inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full font-medium hover:from-purple-500 hover:to-purple-700 transition-all duration-300 glow-purple"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-7 py-3 border border-purple-600 text-purple-400 rounded-full font-medium hover:bg-purple-600/10 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              Print Resume
            </motion.button>
          </div>

          <div className="block w-full mt-1">
            <AnimatedParagraph
              text="A snapshot of my professional journey, skills, and achievements."
              className="text-gray-400 max-w-lg mx-auto text-sm justify-center"
              delay={0.3}
            />
          </div>
        </motion.div>

        <motion.div
          ref={resumeRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto bg-gradient-to-br from-[#0d0a1a] to-[#080d1a] border border-purple-900/30 rounded-3xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-purple-900/60 to-blue-900/40 px-8 py-8 border-b border-purple-900/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-3xl font-bold text-white">{resumeData.name}</h3>
                <p className="gradient-text font-semibold mt-1">{resumeData.title}</p>
              </div>
              <div className="flex flex-col gap-1.5 text-sm text-gray-400">
                <span className="flex items-center gap-2"><span className="text-purple-400">📧</span> {resumeData.email}</span>
                <span className="flex items-center gap-2"><span className="text-purple-400">📱</span> {resumeData.phone}</span>
                <span className="flex items-center gap-2"><span className="text-purple-400">💼</span> {resumeData.linkedin}</span>
                <span className="flex items-center gap-2"><span className="text-purple-400">📍</span> {resumeData.location}</span>
              </div>
            </div>
          </div>

          <div className="p-8 grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-8">
              <ResumeSection title="Summary" icon="👤">
                <p className="text-gray-400 text-sm leading-relaxed">{resumeData.summary}</p>
              </ResumeSection>

              <ResumeSection title="Experience" icon="💼">
                <div className="space-y-6">
                  {resumeData.experience.map((exp, i) => (
                    <motion.div
                      key={exp.company}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-4 border-l-2 border-purple-800/50"
                    >
                      <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-purple-500" />
                      <div className="flex flex-wrap justify-between items-start gap-2 mb-1">
                        <div>
                          <p className="text-white font-semibold text-sm">{exp.role}</p>
                          <p className="text-purple-400 text-xs font-medium">{exp.company} · {exp.location}</p>
                        </div>
                        <span className="text-xs text-gray-500 bg-purple-900/30 px-2 py-0.5 rounded-full shrink-0">{exp.period}</span>
                      </div>
                      <ul className="mt-2 space-y-1">
                        {exp.bullets.map((b, j) => (
                          <li key={j} className="flex gap-2 text-gray-400 text-xs leading-relaxed">
                            <span className="text-purple-500 shrink-0 mt-0.5">▸</span> {b}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection title="Education" icon="🎓">
                <div className="space-y-4">
                  {resumeData.education.map((edu, i) => (
                    <motion.div
                      key={edu.institution}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative pl-4 border-l-2 border-blue-800/50"
                    >
                      <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-blue-400" />
                      <div className="flex flex-wrap justify-between gap-2">
                        <div>
                          <p className="text-white font-semibold text-sm">{edu.degree}</p>
                          <p className="text-blue-400 text-xs">{edu.institution}</p>
                        </div>
                        <span className="text-xs pt-2.5 text-gray-500 bg-blue-900/20 px-2 py-0.5 rounded-full shrink-0">{edu.period}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ResumeSection>
            </div>

            <div className="lg:col-span-2 space-y-8">
              <ResumeSection title="Skills" icon="⚡">
                <div className="space-y-4">
                  {Object.entries(resumeData.skills).map(([category, items], i) => (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <p className="text-purple-400 text-xs font-semibold uppercase tracking-wider mb-2">{category}</p>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <span key={skill} className="px-3 py-1 text-xs bg-purple-900/30 border border-purple-800/40 text-purple-200 rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ResumeSection>

              <ResumeSection title="Certifications" icon="🏆">
                <ul className="space-y-2">
                  {resumeData.certifications.map((cert, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                      className="flex gap-2 text-gray-400 text-xs leading-relaxed"
                    >
                      <span className="text-purple-400 shrink-0">✓</span>
                      {cert}
                    </motion.li>
                  ))}
                </ul>
              </ResumeSection>

              <ResumeSection title="Languages" icon="🌐">
                <div className="space-y-2">
                  {languages.map((l) => (
                    <div key={l.lang}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-300">{l.lang}</span>
                        <span className="text-gray-500">{l.level}</span>
                      </div>
                      <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${l.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-purple-600 to-blue-400 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </ResumeSection>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ResumeSection({ title, icon, children }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-lg">{icon}</span>
        <h4 className="text-white font-bold text-sm uppercase tracking-widest">{title}</h4>
        <div className="flex-1 h-px bg-purple-900/40 ml-2" />
      </div>
      {children}
    </div>
  );
}
