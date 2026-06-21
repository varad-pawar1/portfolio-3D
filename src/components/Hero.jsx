import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  AnimatedLetters,
  AnimatedParagraph,
  AnimatedLabel,
} from "./AnimatedText";
import { smoothScrollTo } from "../utils/smoothScroll";
import { personalInfo, heroStats } from "../constants";

const rotatingWords = ["Varad", "a Developer", "Full Stack Dev"];

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block relative" style={{ minWidth: "260px" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 40, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -40, opacity: 0, rotateX: 90 }}
          transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
          className="gradient-text inline-block"
          style={{
            transformOrigin: "center center",
            perspectiveOrigin: "center",
          }}
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const floatingBadges = [
  { label: "React.js", icon: "⚛️", style: "top-[2%]   left-[22%]", delay: 0 },
  { label: "Angular", icon: "🅰️", style: "top-[30%]  left-[-2%]", delay: 0.3 },
  { label: "Node.js", icon: "🟢", style: "bottom-[24%] left-[2%]", delay: 0.4 },
  { label: "Gen AI", icon: "🤖", style: "top-[26%]  right-[-2%]", delay: 0.5 },
  { label: "MongoDB", icon: "🍃", style: "top-[52%]  right-[-2%]", delay: 0.1 },
  {
    label: "TypeScript",
    icon: "🔷",
    style: "top-[55%]  left-[-2%]",
    delay: 0.2,
  },
];

const codeLines = [
  { text: "const dev = {", color: "text-purple-300" },
  { text: `  name: "${personalInfo.fullName}",`, color: "text-blue-300" },
  { text: '  role: "Full Stack Dev",', color: "text-green-300" },
  { text: '  stack: ["MERN", "Angular"],', color: "text-yellow-300" },
  { text: "  open: true,", color: "text-pink-300" },
  { text: "};", color: "text-purple-300" },
];

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 flex flex-col lg:flex-row items-center gap-16 w-full">
        <div className="flex-1 text-center lg:text-left">
          <AnimatedLabel
            text={`✦ ${personalInfo.tagline} ✦`}
            className="text-purple-400 text-sm font-semibold tracking-widest uppercase mb-4 block"
          />

          <h1
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4"
            style={{ perspective: "800px" }}
          >
            <AnimatedLetters text="Hi, I'm " delay={0.2} />
            <RotatingText />
          </h1>

          <div className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
            <AnimatedParagraph
              text="Full Stack Developer with 1.5+ years of professional experience building production apps for VenturePact, Outgrow, and Masters' Union. Specializing in MERN stack, AI integration, and scalable web solutions."
              delay={0.6}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center lg:justify-start"
          >
            <button
              onClick={() => smoothScrollTo("contact")}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full font-medium hover:from-purple-500 hover:to-purple-700 transition-all duration-300 glow-purple hover:scale-105"
            >
              Get In Touch
            </button>
            <button
              onClick={() => smoothScrollTo("experience")}
              className="px-8 py-3 border border-purple-600 text-purple-400 rounded-full font-medium hover:bg-purple-600/10 transition-all duration-300 hover:scale-105"
            >
              View Experience
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-6 mt-12 justify-center lg:justify-start"
          >
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.9 + i * 0.15,
                  type: "spring",
                  stiffness: 200,
                }}
                className="text-center"
              >
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex-1 flex justify-center items-center"
        >
          <div className="relative w-[340px] h-[420px] sm:w-[380px] sm:h-[460px]">
            {floatingBadges.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + badge.delay }}
                style={{ animationDelay: `${i * 0.7}s` }}
                className={`absolute ${badge.style} float-animation z-20`}
              >
                <div className="flex items-center gap-1.5 bg-[#0d0a1a]/90 border border-purple-700/50 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-white font-medium shadow-lg shadow-purple-900/20 whitespace-nowrap">
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </div>
              </motion.div>
            ))}

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-64 h-64 rounded-full border border-purple-600/20 animate-spin"
                style={{ animationDuration: "20s" }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-72 h-72 rounded-full border border-blue-600/10 animate-spin"
                style={{
                  animationDuration: "28s",
                  animationDirection: "reverse",
                }}
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="w-52 h-52 rounded-3xl p-[2px] bg-gradient-to-br from-purple-500 via-blue-500 to-purple-800 shadow-2xl shadow-purple-900/50">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#0f0a1e] to-[#0a0f1e] flex flex-col items-center justify-center gap-3 relative overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle at 2px 2px, #7c3aed 1px, transparent 0)",
                        backgroundSize: "24px 24px",
                      }}
                    />

                    <div className="relative z-10">
                      <img
                        src={personalInfo.profileImage}
                        alt={personalInfo.fullName}
                        className="w-20 h-20 rounded-2xl object-cover shadow-lg shadow-purple-900/50"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#0f0a1e] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                      </div>
                    </div>

                    <div className="text-center z-10 px-3">
                      <p className="text-white font-bold text-base">
                        {personalInfo.fullName}
                      </p>
                      <p className="text-purple-300 text-xs mt-0.5">
                        {personalInfo.title}
                      </p>
                    </div>

                    <div className="flex gap-2 z-10">
                      {["MERN", "Angular"].map((s) => (
                        <span
                          key={s}
                          className="text-[10px] px-2 py-0.5 bg-purple-900/60 border border-purple-700/50 text-purple-300 rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-8 bg-purple-600/30 blur-xl rounded-full" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -bottom-2 -right-4 sm:right-0 z-20"
            >
              <div className="bg-[#0d0a1a]/95 border border-purple-800/50 backdrop-blur-sm rounded-xl p-3 shadow-xl w-44">
                <div className="flex gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500/70" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
                  <div className="w-2 h-2 rounded-full bg-green-500/70" />
                </div>
                <div className="font-mono space-y-0.5">
                  {codeLines.map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 + i * 0.15 }}
                      className={`text-[9px] leading-relaxed ${line.color}`}
                    >
                      {line.text}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="absolute top-2 right-0 sm:-right-6 z-20"
            >
              <div className="bg-[#0d0a1a]/95 border border-blue-800/40 backdrop-blur-sm rounded-xl px-3 py-2 text-xs text-gray-300 shadow-lg flex items-center gap-2">
                <span>📍</span>
                <span>{personalInfo.locationShort}</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              className="absolute top-14 -left-4 sm:-left-8 z-20"
            >
              <div className="bg-gradient-to-br from-purple-900/90 to-purple-800/80 border border-purple-600/40 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
                <p className="text-purple-200 font-bold text-lg leading-none">
                  {personalInfo.professionalExperience}
                </p>
                <p className="text-purple-400 text-[10px] mt-0.5">Yrs Pro</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
      >
        <p className="text-gray-500 text-xs tracking-widest uppercase">
          Scroll
        </p>
        <div className="w-0.5 h-8 bg-gradient-to-b from-purple-400 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
