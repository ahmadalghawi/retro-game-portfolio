'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import UniversalNavigation from '../../components/UniversalNavigation';
import { useInView } from 'react-intersection-observer';
import {
  Zap,
  Code,
  Cpu,
  Terminal,
  Wifi,
  Shield,
  Eye,
  Rocket,
  Mail,
  Github,
  ExternalLink,
  Download,
  User,
  Briefcase,
  Target
} from 'lucide-react';
import { experiences } from '../../data/experienceData';
import projectsData from '../../data/projectsData';

// Cyberpunk/Neon Theme
const CyberpunkPortfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [glitchText, setGlitchText] = useState('AHMAD AL-GHAWI');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (heroInView) setActiveSection('hero');
    else if (aboutInView) setActiveSection('about');
    else if (skillsInView) setActiveSection('skills');
    else if (experienceInView) setActiveSection('experience');
    else if (projectsInView) setActiveSection('projects');
    else if (contactInView) setActiveSection('contact');
  }, [heroInView, aboutInView, skillsInView, experienceInView, projectsInView, contactInView]);

  // Glitch effect for text
  useEffect(() => {
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const originalText = 'AHMAD AL-GHAWI';
    
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        let glitched = '';
        for (let i = 0; i < originalText.length; i++) {
          if (Math.random() > 0.8 && originalText[i] !== ' ') {
            glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          } else {
            glitched += originalText[i];
          }
        }
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(originalText), 100);
      }
    }, 200);

    return () => clearInterval(glitchInterval);
  }, []);

  // Cyberpunk Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Matrix-style background */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 text-xs font-mono animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            >
              {Math.random().toString(36).substring(2, 15)}
            </div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto shadow-lg shadow-cyan-400/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Cpu className="text-cyan-400 animate-pulse" size={48} />
            </div>
          </div>
          
          <div className="space-y-4">
            <TypeAnimation
              sequence={[
                'INITIALIZING NEURAL NETWORK...',
                1000,
                'LOADING CYBERNETIC INTERFACE...',
                1000,
                'CONNECTING TO THE MATRIX...',
                1000,
                'WELCOME TO THE FUTURE...',
                500
              ]}
              wrapper="div"
              className="text-cyan-400 text-2xl font-mono tracking-wider"
              cursor={true}
              repeat={0}
            />
            <div className="flex items-center justify-center gap-2 text-pink-400 font-mono">
              <Zap size={16} className="animate-pulse" />
              <span>SYSTEM READY</span>
              <Zap size={16} className="animate-pulse" />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Neon Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-cyan-400/30">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-400/50">
                <Terminal className="text-black" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-mono font-bold text-cyan-400 tracking-wider">{glitchText}</h1>
                <p className="text-pink-400 text-sm font-mono">CYBERPUNK.EXE</p>
              </div>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-6">
              {[
                { id: 'hero', label: 'HOME' },
                { id: 'about', label: 'ABOUT' },
                { id: 'skills', label: 'SKILLS' },
                { id: 'experience', label: 'EXP' },
                { id: 'projects', label: 'PROJECTS' },
                { id: 'contact', label: 'CONTACT' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 font-mono text-sm tracking-wider ${
                    activeSection === item.id
                      ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/50'
                      : 'text-cyan-400 hover:text-pink-400 hover:bg-pink-400/10 border border-transparent hover:border-pink-400/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Link
              href="/"
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300 font-mono text-sm tracking-wider shadow-lg shadow-pink-500/30"
            >
              EXIT
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center pt-20 relative">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Neon Title */}
            <div className="mb-8">
              <h1 className="text-6xl md:text-8xl font-mono font-bold mb-4 relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 animate-pulse">
                  {glitchText}
                </span>
                <div className="absolute inset-0 text-cyan-400 opacity-20 blur-sm">
                  {glitchText}
                </div>
              </h1>
            </div>
            
            <div className="text-2xl md:text-3xl text-pink-400 mb-8 font-mono tracking-wider">
              <TypeAnimation
                sequence={[
                  'FULL STACK DEVELOPER',
                  2000,
                  'DIGITAL ARCHITECT',
                  2000,
                  'CODE WARRIOR',
                  2000,
                  'CYBER CRAFTSMAN',
                  2000
                ]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
              />
            </div>

            <div className="max-w-2xl mx-auto text-lg text-gray-300 mb-12 leading-relaxed font-mono">
              Welcome to my digital realm. I craft cutting-edge web experiences using advanced technologies. 
              Currently interfacing with the future at Cognes, specializing in React Native, AI integration, and cybernetic solutions.
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-black px-8 py-4 rounded-lg shadow-xl shadow-cyan-400/30 transition-all duration-300 font-mono text-lg tracking-wider"
              >
                VIEW PROJECTS
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400 hover:text-black px-8 py-4 rounded-lg transition-all duration-300 font-mono text-lg tracking-wider shadow-lg shadow-pink-400/20"
              >
                CONNECT
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-mono font-bold text-cyan-400 mb-4 tracking-wider">
                ABOUT.EXE
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="bg-gray-900/50 p-6 rounded-lg border border-cyan-400/30 backdrop-blur-sm">
                  <p className="text-gray-300 leading-relaxed font-mono mb-4">
                    I am Ahmad Al-Ghawi, a digital architect navigating the intersection of technology and innovation. 
                    My neural pathways are optimized for full-stack development, with specialized subroutines in React, Node.js, and AI integration.
                  </p>
                  <p className="text-gray-300 leading-relaxed font-mono">
                    Currently operating from Cognes headquarters, where I engineer cutting-edge solutions using React Native, 
                    Expo frameworks, and advanced AI protocols. My mission: to bridge the gap between human creativity and machine precision.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-cyan-400/10 to-blue-500/10 p-4 rounded-lg border border-cyan-400/30">
                    <div className="text-cyan-400 font-mono text-sm mb-1">EXPERIENCE</div>
                    <div className="text-white font-mono text-xl">5+ YEARS</div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 p-4 rounded-lg border border-pink-400/30">
                    <div className="text-pink-400 font-mono text-sm mb-1">PROJECTS</div>
                    <div className="text-white font-mono text-xl">50+ DEPLOYED</div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="w-80 h-80 mx-auto relative">
                  {/* Holographic effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-500/20 rounded-full animate-pulse"></div>
                  <div className="absolute inset-4 bg-gradient-to-r from-cyan-400 to-pink-500 rounded-full flex items-center justify-center">
                    <User className="text-black" size={120} />
                  </div>
                  {/* Orbiting elements */}
                  <motion.div
                    className="absolute top-0 left-1/2 w-4 h-4 bg-cyan-400 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "0 160px" }}
                  />
                  <motion.div
                    className="absolute top-0 left-1/2 w-4 h-4 bg-pink-400 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "0 160px" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-mono font-bold text-cyan-400 mb-4 tracking-wider">
                SKILLS.SYS
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'FRONTEND.EXE',
                  icon: <Code className="text-cyan-400" size={32} />,
                  skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
                  color: 'cyan'
                },
                {
                  title: 'BACKEND.SYS',
                  icon: <Cpu className="text-pink-400" size={32} />,
                  skills: ['Node.js', 'Express.js', 'MySQL', 'MongoDB', 'RESTful APIs'],
                  color: 'pink'
                },
                {
                  title: 'MOBILE.APP',
                  icon: <Rocket className="text-purple-400" size={32} />,
                  skills: ['React Native', 'Expo', 'Cross-platform', 'Mobile UI/UX'],
                  color: 'purple'
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`bg-gray-900/50 rounded-lg p-6 border border-${category.color}-400/30 backdrop-blur-sm hover:border-${category.color}-400/60 transition-all duration-300`}
                >
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r from-${category.color}-400/20 to-${category.color}-600/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-${category.color}-400/30`}>
                      {category.icon}
                    </div>
                    <h3 className={`text-xl font-mono font-bold text-${category.color}-400 tracking-wider`}>{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.skills.map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: (index * 0.2) + (i * 0.1) }}
                        className={`bg-${category.color}-400/10 px-4 py-2 rounded border border-${category.color}-400/20 text-center hover:border-${category.color}-400/40 transition-colors`}
                      >
                        <span className="text-gray-300 font-mono text-sm">{skill}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={experienceRef} className="py-20 bg-gray-900/20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-mono font-bold text-cyan-400 mb-4 tracking-wider">
                EXPERIENCE.LOG
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto"></div>
            </div>

            <div className="space-y-8">
              {experiences.slice(0, 3).map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={experienceInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-gray-900/50 rounded-lg p-6 border border-cyan-400/30 backdrop-blur-sm hover:border-pink-400/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-pink-500/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-cyan-400/30">
                      <Briefcase className="text-cyan-400" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-mono font-bold text-cyan-400 mb-2 tracking-wider">{exp.title}</h3>
                      <h4 className="text-lg text-pink-400 mb-2 font-mono">{exp.company}</h4>
                      <p className="text-purple-400 mb-4 font-mono text-sm tracking-wider">{exp.period}</p>
                      <div className="space-y-2 mb-4">
                        {exp.description.slice(0, 2).map((desc, i) => (
                          <p key={i} className="text-gray-300 leading-relaxed font-mono text-sm">{'>'} {desc}</p>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.slice(0, 4).map((skill) => (
                          <span key={skill} className="bg-cyan-400/10 text-cyan-400 px-3 py-1 rounded border border-cyan-400/30 text-xs font-mono tracking-wider">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" ref={projectsRef} className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-mono font-bold text-cyan-400 mb-4 tracking-wider">
                PROJECTS.DIR
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto mb-8"></div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {['All', 'Web', 'Mobile'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-6 py-3 rounded-lg font-mono tracking-wider transition-all duration-300 border ${
                      selectedFilter === filter
                        ? 'bg-cyan-400 text-black border-cyan-400 shadow-lg shadow-cyan-400/50'
                        : 'bg-gray-900/50 text-cyan-400 border-cyan-400/30 hover:border-pink-400/50 hover:text-pink-400'
                    }`}
                  >
                    [{filter.toUpperCase()}.EXE]
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedFilter === 'All' 
                ? projectsData 
                : projectsData.filter(project => project.tag.includes(selectedFilter))
              ).slice(0, 9).map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={projectsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gray-900/50 rounded-lg overflow-hidden border border-cyan-400/30 backdrop-blur-sm hover:border-pink-400/50 hover:shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="h-48 bg-gradient-to-br from-cyan-400/20 to-pink-500/20 relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-80"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-cyan-400/20 to-pink-500/20 flex items-center justify-center"><svg class="text-cyan-400" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0L19.2 12l-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg></div>';
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-cyan-400/20 to-pink-500/20 flex items-center justify-center">
                        <Code className="text-cyan-400" size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-mono font-bold text-cyan-400 mb-3 tracking-wider">{project.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3 font-mono text-sm">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tag.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="bg-pink-400/10 text-pink-400 px-2 py-1 rounded text-xs font-mono border border-pink-400/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.gitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </a>
                      {project.previewUrl && (
                        <a
                          href={project.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-pink-400 hover:text-pink-300 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-20 bg-gray-900/20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-16">
              <h2 className="text-4xl font-mono font-bold text-cyan-400 mb-4 tracking-wider">
                CONTACT.NET
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-pink-500 mx-auto"></div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-12 border border-cyan-400/30 backdrop-blur-sm">
              <p className="text-xl text-gray-300 mb-8 font-mono leading-relaxed">
                Ready to jack into the matrix together? Let's establish a secure connection 
                and architect the digital future with cutting-edge precision.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                    <Mail className="text-cyan-400" size={24} />
                  </div>
                  <h3 className="font-mono font-bold text-cyan-400 mb-2 tracking-wider">EMAIL.PROTOCOL</h3>
                  <p className="text-gray-300 font-mono text-sm">ahmadalghawi.86@gmail.com</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-pink-400/30">
                    <Github className="text-pink-400" size={24} />
                  </div>
                  <h3 className="font-mono font-bold text-pink-400 mb-2 tracking-wider">GIT.REPOSITORY</h3>
                  <p className="text-gray-300 font-mono text-sm">https://github.com/ahmadalghawi</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-cyan-400/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-purple-400/30">
                    <Wifi className="text-purple-400" size={24} />
                  </div>
                  <h3 className="font-mono font-bold text-purple-400 mb-2 tracking-wider">LOCATION.GPS</h3>
                  <p className="text-gray-300 font-mono text-sm">Sweden</p>
                </div>
              </div>

              <a
                href="/data/Rsume.pdf"
                download
                className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-pink-500 hover:from-cyan-500 hover:to-pink-600 text-black px-8 py-4 rounded-lg shadow-xl shadow-cyan-400/30 transition-all duration-300 font-mono text-lg tracking-wider"
              >
                <Download size={20} />
                DOWNLOAD.RESUME
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-gray-900/90 rounded-lg p-8 max-w-2xl w-full border-2 border-cyan-400/50 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-mono font-bold text-cyan-400 mb-4 tracking-wider">{selectedProject.title}</h3>
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 border border-cyan-400/30">
                  <Code className="text-cyan-400" size={24} />
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed font-mono">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {selectedProject.tag.map((tag: string) => (
                  <span key={tag} className="bg-pink-400/10 text-pink-400 px-3 py-2 rounded border border-pink-400/30 font-mono text-sm">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <a
                  href={selectedProject.gitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-cyan-400 hover:bg-cyan-500 text-black px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-mono tracking-wider"
                >
                  <Github size={20} />
                  VIEW.CODE
                </a>
                {selectedProject.previewUrl && selectedProject.previewUrl !== selectedProject.gitUrl && (
                  <a
                    href={selectedProject.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-mono tracking-wider"
                  >
                    <ExternalLink size={20} />
                    LIVE.DEMO
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-6 py-3 rounded-lg transition-colors font-mono tracking-wider"
                >
                  CLOSE.EXE
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Universal Navigation */}
      <UniversalNavigation currentTheme="Cyberpunk Edition" position="bottom-right" variant="dark" />
      
      {/* Navigation Footer */}
      <ThemeNavigationFooter />
    </div>
  );
};

// Navigation Footer Component
const ThemeNavigationFooter = () => (
  <motion.footer 
    className="border-t border-cyan-400/30 bg-black/50 backdrop-blur-sm pt-8 mt-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1 }}
  >
    <div className="max-w-6xl mx-auto px-6 text-center">
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <Link 
          href="/"
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-mono underline hover:no-underline tracking-wider"
        >
          [HOME.EXE]
        </Link>
        <span className="text-purple-500">|</span>
        <Link 
          href="/portfolio"
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-mono underline hover:no-underline tracking-wider"
        >
          [DEV.PLAYGROUND]
        </Link>
        <span className="text-purple-500">|</span>
        <Link 
          href="/vintage-newspaper"
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-mono underline hover:no-underline tracking-wider"
        >
          [VINTAGE.NEWS]
        </Link>
        <span className="text-purple-500">|</span>
        <Link 
          href="/art-deco"
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-mono underline hover:no-underline tracking-wider"
        >
          [ART.DECO]
        </Link>
        <span className="text-purple-500">|</span>
        <Link 
          href="/watercolor"
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-mono underline hover:no-underline tracking-wider"
        >
          [WATERCOLOR.ART]
        </Link>
        <span className="text-purple-500">|</span>
        <Link 
          href="/glassmorphism"
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-mono underline hover:no-underline tracking-wider"
        >
          [GLASS.MORPH]
        </Link>
        <span className="text-purple-500">|</span>
        <Link 
          href="/nature"
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-mono underline hover:no-underline tracking-wider"
        >
          [NATURE.ORG]
        </Link>
        <span className="text-purple-500">|</span>
        <Link 
          href="/ai-generator"
          className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm font-mono underline hover:no-underline tracking-wider"
        >
          [AI.GENERATOR]
        </Link>
      </div>
      <div className="text-xs text-gray-500 font-mono">
        <p className="text-cyan-400">© 2025 AHMAD.ALGHAWI - FULL.STACK.DEVELOPER</p>
        <p className="mt-1 text-purple-400 tracking-wider">// NEURAL.NETWORK.PORTFOLIO.SYSTEM.ONLINE</p>
      </div>
    </div>
  </motion.footer>
);

export default CyberpunkPortfolio;
