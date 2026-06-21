import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../constants';

const knowledge = [
  {
    tags: ['who', 'introduce', 'yourself', 'about', 'varad', 'tell me'],
    answer: `Hi! I'm ${personalInfo.fullName} 👋 — a Full Stack Developer based in ${personalInfo.locationShort}.
I have **2+ years in software development**, including **1.5+ years of professional experience** as a MERN Stack Developer.
Currently working on client projects for **VenturePact, Outgrow, and Masters' Union**, building AI-integrated production platforms.`,
  },
  {
    tags: ['skill', 'tech', 'stack', 'know', 'technology', 'expertise'],
    answer: `Varad's tech stack includes:
• **Frontend** — React.js, Angular, TypeScript, Redux, Tailwind CSS, Bootstrap
• **Backend** — Node.js, Express.js, REST APIs, Socket.io, Redis, BullMQ
• **Database** — MongoDB, MySQL, Firebase
• **AI** — Generative AI, OpenAI, Gemini
• **Tools** — Git, Postman, Python`,
  },
  {
    tags: ['experience', 'work', 'job', 'company', 'employ', 'venturepact', 'outgrow'],
    answer: `Varad has **2+ years in software development** with **1.5+ years of professional experience**:

💼 **Full Stack Developer (MERN Stack)** — VenturePact · Outgrow · Masters' Union *(Feb 2025 – Present)*
• Developed scalable web apps with React.js, Node.js, Express.js, MongoDB
• Built AI platforms: Sales Coach AI, Interview AI, Punjab Startup
• REST APIs, Razorpay payments, Socket.io, Redis + BullMQ, JWT auth
• Full SDLC: requirements, development, testing, deployment, maintenance

🎓 **Full Stack Developer Intern** — Masai School *(6 Months, May–Oct 2024)*
• Hands-on MERN stack development and industry-standard practices
• Construct Week challenges and agile team collaboration`,
  },
  {
    tags: ['education', 'study', 'degree', 'college', 'university', 'masai', 'bba', 'apna'],
    answer: `Varad's education:

🎓 **Masai School** — Full Stack Web Development *(May 2024 – Jan 2025)*
📚 **Apna College** — Full Stack Web Development / MERN *(Aug 2023 – Jan 2024)*
🏫 **New Arts, Commerce and Science College (SPPU)** — BBA in Computer Applications *(Jun 2021 – Aug 2024)*`,
  },
  {
    tags: ['certif', 'course', 'ai', 'microsoft', 'hackerrank', 'linkedin learn'],
    answer: `Varad holds 6+ certifications:
✓ Construct Week Certificate — Masai School
✓ Full Stack Web Development — Apna College
✓ Career Essentials in Generative AI — Microsoft & LinkedIn
✓ Python Basic — HackerRank
✓ SQL Basic & Intermediate — HackerRank`,
  },
  {
    tags: ['project', 'built', 'portfolio', 'work done', 'application', 'mediconnect', 'sales coach', 'interview'],
    answer: `Varad has delivered **3 major client platforms** professionally:

**Professional (VenturePact / Outgrow / Masters' Union):**
• Sales Coach AI Platform — AI call analysis & coaching
• Interview AI Platform — Mock interviews with resume parsing
• Punjab Startup — Digital university platform

**Personal Projects:**
• MediConnect, ER-SQL, Quick Slot, Custom Website Builder

Check the Projects section — professional work is featured first!`,
  },
  {
    tags: ['contact', 'email', 'reach', 'hire', 'connect', 'linkedin', 'github', 'phone'],
    answer: `You can reach Varad here:
📧 ${personalInfo.email}
📱 ${personalInfo.phone}
💼 ${personalInfo.linkedinDisplay}
🐙 ${personalInfo.githubDisplay}
📍 ${personalInfo.address}`,
  },
  {
    tags: ['available', 'open', 'looking', 'opportunity', 'relocat', 'hire', 'join'],
    answer: `Yes! Varad is **open to new opportunities** — full-time roles, freelance projects, and collaborations.
Feel free to reach out at ${personalInfo.email} or connect on LinkedIn.`,
  },
  {
    tags: ['salary', 'ctc', 'expect', 'package', 'pay'],
    answer: `For salary expectations, please reach out directly to Varad at ${personalInfo.email} or via LinkedIn — happy to discuss based on the role and responsibilities.`,
  },
  {
    tags: ['strength', 'good at', 'best', 'specialise', 'specializ'],
    answer: `Varad's key strengths:
💼 **1.5+ years professional experience** on client projects (VenturePact, Outgrow, Masters' Union)
💡 Strong MERN stack expertise with production AI platform delivery
⚡ Full SDLC ownership — from requirements to deployment and maintenance
🤝 Effective collaborator in cross-functional, fast-paced environments`,
  },
  {
    tags: ['weakness', 'improve', 'challenge', 'difficult'],
    answer: `Varad is continuously improving in:
• System design & large-scale architecture patterns
• DevOps and cloud deployment (Docker, CI/CD)
• Contributing to open-source projects
Always learning and growing! 🚀`,
  },
  {
    tags: ['react', 'angular', 'next', 'reactjs'],
    answer: `Varad has **90% proficiency in React.js** and **85% in Angular**.
Experience includes: component architecture, hooks, Redux state management, REST API integration, and responsive UI with Tailwind CSS.`,
  },
  {
    tags: ['node', 'backend', 'server', 'express', 'socket', 'redis'],
    answer: `On the backend, Varad works with:
• **Node.js + Express.js** — REST API development, middleware, JWT authentication
• **Socket.io** — Real-time chat and call intelligence
• **Redis + BullMQ** — Scalable background job processing
• **MongoDB** — Schema design, aggregation, indexing`,
  },
  {
    tags: ['ai', 'openai', 'gemini', 'generative', 'chatbot'],
    answer: `Varad has hands-on AI integration experience:
• OpenAI/Gemini for call analysis, interview evaluation, and coaching insights
• Resume parser & JD matching features
• AI chatbots and learning assistance modules
• Career Essentials in Generative AI certification from Microsoft & LinkedIn`,
  },
  {
    tags: ['location', 'where', 'based', 'city', 'ahmednagar', 'india'],
    answer: `Varad is based in **${personalInfo.address}** and is open to remote work as well as relocation opportunities.`,
  },
  {
    tags: ['achievement', 'award', 'topper', 'hotel'],
    answer: `Varad's key achievement:
🥇 **Project Topper (3rd Year)** — Built a comprehensive Hotel Booking Website with user/admin panels and PhonePe payment gateway integration. Awarded top position for advanced implementation and innovative design.`,
  },
  {
    tags: ['hello', 'hi', 'hey', 'hii', 'helo', 'namaste'],
    answer: `Hello! 👋 I'm Varad's AI assistant. Ask me anything about his skills, experience, projects, or availability — I'm here to help interviewers get the right information!`,
  },
  {
    tags: ['thank', 'thanks', 'great', 'awesome', 'good', 'nice'],
    answer: `You're welcome! 😊 Feel free to ask anything else about Varad. Happy to help!`,
  },
];

const quickQuestions = [
  'Tell me about yourself',
  'What is your tech stack?',
  'Work experience?',
  'Are you available?',
  'How to contact you?',
];

function getAnswer(query) {
  const q = query.toLowerCase();
  for (const item of knowledge) {
    if (item.tags.some((tag) => q.includes(tag))) {
      return item.answer;
    }
  }
  return `I don't have a specific answer for that, but you can reach Varad directly at **${personalInfo.email}** or on LinkedIn for detailed discussions. 😊`;
}

function renderMessage(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: `Hi! 👋 I'm ${personalInfo.firstName}'s AI assistant. Ask me anything about his skills, experience, projects, or availability!`,
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const q = text.trim();
    if (!q) return;
    setMessages((prev) => [...prev, { from: 'user', text: q }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((prev) => [...prev, { from: 'bot', text: getAnswer(q) }]);
    }, 700);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center shadow-2xl shadow-purple-900/50 glow-purple"
        aria-label="Open AI assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="text-white text-xl">
              ✕
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }} className="text-2xl">
              🤖
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-[#050816]">
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-75" />
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[340px] sm:w-[380px] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/40 border border-purple-800/40"
            style={{ maxHeight: '520px' }}
          >
            <div className="bg-gradient-to-r from-purple-900/90 to-blue-900/80 px-4 py-3 flex items-center gap-3 border-b border-purple-800/30 backdrop-blur-md">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-blue-400 flex items-center justify-center text-lg shrink-0">
                🤖
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{personalInfo.firstName}'s AI Assistant</p>
                <p className="text-green-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  Online — Ask me anything!
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-[#080d1a]/95 backdrop-blur-md px-4 py-3 space-y-3" style={{ minHeight: '300px', maxHeight: '340px' }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.from === 'bot' && (
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-xs mr-2 mt-0.5 shrink-0">🤖</div>
                  )}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                      msg.from === 'user'
                        ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white rounded-tr-sm'
                        : 'bg-[#0d0a1a] border border-purple-900/40 text-gray-300 rounded-tl-sm'
                    }`}
                  >
                    {msg.from === 'bot' ? renderMessage(msg.text) : msg.text}
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-xs mr-2 shrink-0">🤖</div>
                  <div className="bg-[#0d0a1a] border border-purple-900/40 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="bg-[#080d1a]/95 px-3 py-2 flex gap-2 overflow-x-auto border-t border-purple-900/20" style={{ scrollbarWidth: 'none' }}>
              {quickQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-[10px] whitespace-nowrap px-2.5 py-1 rounded-full border border-purple-700/50 text-purple-300 hover:bg-purple-900/40 hover:border-purple-500 transition-all shrink-0"
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="bg-[#0a0d1f]/95 backdrop-blur-md px-3 py-2.5 flex items-center gap-2 border-t border-purple-900/30">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about skills, experience..."
                className="flex-1 bg-[#0d0a1a] border border-purple-900/40 rounded-full px-4 py-2 text-xs text-white placeholder-gray-600 outline-none focus:border-purple-600 transition-colors"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white disabled:opacity-40 hover:scale-105 transition-all shrink-0"
              >
                <svg className="w-3.5 h-3.5 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
