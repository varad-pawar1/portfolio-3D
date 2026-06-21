import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Contact from './components/Contact';
import ChatBot from './components/ChatBot';
import Stars from './components/canvas/Stars';

export default function App() {
  return (
    <div className="bg-[#050816] min-h-screen relative">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Stars />
      </div>

      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Certifications />
      <Resume />
      <Contact />
      <ChatBot />
    </div>
  );
}
