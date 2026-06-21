import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navLinks, personalInfo } from '../constants';
import { smoothScrollTo, smoothScrollToTop } from '../utils/smoothScroll';

export default function Navbar() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.id);
    const observers = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        {
          rootMargin: '-30% 0px -60% 0px',
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    const handleScrollTop = () => {
      if (window.scrollY < 80) setActive('');
    };
    window.addEventListener('scroll', handleScrollTop);

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener('scroll', handleScrollTop);
    };
  }, []);

  const handleNav = (id) => {
    setActive(id);
    setMenuOpen(false);
    smoothScrollTo(id);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 nav-blur ${
        scrolled
          ? 'bg-[#050816]/80 border-b border-purple-900/30 shadow-lg shadow-purple-900/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => { setActive(''); smoothScrollToTop(); }}
          className="flex items-center gap-2 group"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-600 to-blue-400 flex items-center justify-center text-white font-bold text-sm pulse-glow">
            {personalInfo.initials}
          </div>
          <span className="text-white font-semibold text-lg hidden sm:block">
            {personalInfo.firstName} <span className="gradient-text">{personalInfo.lastName}</span>
          </span>
        </button>

        <ul className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNav(link.id)}
                className={`text-sm font-medium transition-all duration-200 relative group cursor-pointer ${
                  active === link.id ? 'text-purple-400' : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.title}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-purple-400 transition-all duration-200 ${
                  active === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white p-2"
        >
          <div className={`w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
          <div className={`w-6 h-0.5 bg-white my-1.5 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-white transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#050816]/95 border-t border-purple-900/30 px-6 py-4"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`block w-full text-left py-3 transition-colors text-sm font-medium ${
                active === link.id ? 'text-purple-400' : 'text-gray-300 hover:text-purple-400'
              }`}
            >
              {active === link.id && <span className="mr-2 text-purple-400">▸</span>}
              {link.title}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
