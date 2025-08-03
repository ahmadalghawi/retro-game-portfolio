'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import UniversalNavigation from '../../components/UniversalNavigation';
import { 
  Palette, 
  Brush, 
  Droplets, 
  Target, 
  Shield, 
  Zap,
  Github, 
  ExternalLink, 
  Mail, 
  Download,
  Briefcase,
  MapPin,
  Code,
  Layers,
  Monitor,
  Database,
  Calendar,
  Award,
  Sparkles,
  Star,
  Circle
} from 'lucide-react';
import projectsData from '../../data/projectsData';
import { experiences } from '../../data/experienceData';

const WatercolorPortfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [contactRef, contactInView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced animated background components
  const FloatingParticle = ({ delay = 0, size = 'w-2 h-2', color = 'bg-blue-400', x = 0, y = 0 }) => (
    <motion.div
      className={`${size} ${color} rounded-full absolute opacity-60`}
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [0, -20, 0],
        x: [0, 10, -5, 0],
        scale: [1, 1.2, 0.8, 1],
        opacity: [0.6, 1, 0.3, 0.6],
      }}
      transition={{
        duration: 6 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  const InkBlob = ({ delay = 0, size = 'w-32 h-32', color = 'bg-slate-400', x = 0, y = 0 }) => (
    <motion.div
      className={`${size} ${color} rounded-full absolute blur-2xl opacity-30`}
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        x: [0, 50, -30, 0],
        y: [0, -60, 40, 0],
        scale: [1, 1.3, 0.7, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: 12 + delay,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  const AnimatedGradient = () => (
    <motion.div
      className="absolute inset-0 opacity-50"
      animate={{
        background: [
          'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
          'radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.3) 0%, transparent 50%)',
          'radial-gradient(circle at 40% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)',
          'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)'
        ]
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );

  const FloatingElements = () => (
    <>
      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <FloatingParticle
          key={i}
          delay={i * 0.5}
          size={Math.random() > 0.5 ? 'w-1 h-1' : 'w-2 h-2'}
          color={['bg-blue-400', 'bg-indigo-400', 'bg-slate-400', 'bg-gray-300'][Math.floor(Math.random() * 4)]}
          x={Math.random() * 100}
          y={Math.random() * 100}
        />
      ))}
      
      {/* Ink Blobs */}
      <InkBlob delay={0} size="w-64 h-64" color="bg-blue-600" x={10} y={20} />
      <InkBlob delay={2} size="w-48 h-48" color="bg-slate-500" x={70} y={60} />
      <InkBlob delay={4} size="w-56 h-56" color="bg-indigo-600" x={30} y={80} />
      <InkBlob delay={6} size="w-40 h-40" color="bg-gray-600" x={80} y={10} />
      <InkBlob delay={8} size="w-32 h-32" color="bg-blue-500" x={50} y={40} />
    </>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-700 flex items-center justify-center relative overflow-hidden">
        {/* Enhanced animated background during loading */}
        <AnimatedGradient />
        <FloatingElements />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center z-10 relative"
        >
          {/* Glowing circle background */}
          <motion.div
            className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-20 h-20 mx-auto mb-8 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full p-4 shadow-2xl">
              <Brush className="w-full h-full text-white" />
            </div>
            {/* Orbiting particles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-300 rounded-full"
                style={{
                  top: '50%',
                  left: '50%',
                  transformOrigin: '0 0'
                }}
                animate={{
                  rotate: 360,
                  x: [0, 40, 0, -40, 0],
                  y: [0, -20, 0, 20, 0]
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </motion.div>
          
          <motion.h1 
            className="text-4xl font-bold text-slate-200 mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Crafting Digital Artistry...
          </motion.h1>
          
          <div className="flex items-center justify-center gap-3 mb-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full"
                animate={{ 
                  scale: [1, 1.8, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: i * 0.2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
          
          <motion.p
            className="text-slate-400 text-lg"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Preparing your creative experience
          </motion.p>
        </motion.div>
      </div>
    );
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-700 relative overflow-hidden">
      {/* Enhanced animated background */}
      <AnimatedGradient />
      <FloatingElements />
      
      {/* Animated mesh gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)',
            'linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)',
            'linear-gradient(225deg, rgba(99, 102, 241, 0.1) 0%, rgba(147, 51, 234, 0.1) 50%, rgba(59, 130, 246, 0.1) 100%)',
            'linear-gradient(45deg, rgba(59, 130, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 50%, rgba(147, 51, 234, 0.1) 100%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/50 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Code className="text-blue-400" size={24} />
              <span className="text-xl font-bold text-slate-200">Ahmad Alghawi</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-6"
            >
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-slate-300 hover:text-blue-400 transition-colors font-medium px-4 py-2 rounded-lg hover:bg-slate-800/50 border border-transparent hover:border-slate-600"
                >
                  {item}
                </motion.a>
              ))}
              <Link
                href="/"
                className="bg-slate-700 hover:bg-slate-600 text-slate-200 px-4 py-2 rounded-lg font-medium transition-colors border border-slate-600 hover:border-slate-500"
              >
                ← Back
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        {/* Hero background effects */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated light rays */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-r from-transparent via-blue-400/10 to-transparent h-px"
              style={{
                width: '200%',
                left: '-50%',
                top: `${20 + i * 15}%`,
                transform: `rotate(${-45 + i * 15}deg)`
              }}
              animate={{
                opacity: [0, 0.8, 0],
                scaleX: [0, 1, 0]
              }}
              transition={{
                duration: 4,
                delay: i * 0.5,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Enhanced hero icon with multiple effects */}
            <div className="mb-12 relative">
              {/* Glowing background rings */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-full border border-blue-400/20"
                  style={{
                    width: `${140 + i * 20}px`,
                    height: `${140 + i * 20}px`,
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)'
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: 360
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              ))}
              
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="relative"
              >
                <motion.div
                  className="w-36 h-36 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 rounded-full flex items-center justify-center mx-auto shadow-2xl border-4 border-slate-600/50 backdrop-blur-sm"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                      '0 0 40px rgba(99, 102, 241, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0.3)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Code className="text-white" size={56} />
                  </motion.div>
                  
                  {/* Floating code symbols */}
                  {['<', '>', '{', '}', '/', '*'].map((symbol, i) => (
                    <motion.div
                      key={symbol}
                      className="absolute text-blue-300 font-mono text-lg font-bold"
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-80px)`
                      }}
                      animate={{
                        rotate: [0, 360],
                        opacity: [0.4, 1, 0.4]
                      }}
                      transition={{
                        duration: 8,
                        delay: i * 0.3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    >
                      {symbol}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
            
            {/* Enhanced title with gradient animation */}
            <motion.h1
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 100 }}
              className="text-6xl md:text-7xl font-bold mb-8 relative"
            >
              <motion.span 
                className="bg-gradient-to-r from-slate-200 via-blue-200 to-slate-200 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Digital{' '}
              </motion.span>
              <motion.span 
                className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Craftsman
              </motion.span>
              
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
              />
            </motion.h1>
            
            {/* Enhanced description with typewriter effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mb-12"
            >
              <motion.p
                className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Blending{' '}
                <motion.span 
                  className="text-blue-400 font-semibold"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  technical precision
                </motion.span>
                {' '}with{' '}
                <motion.span 
                  className="text-indigo-400 font-semibold"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
                >
                  creative vision
                </motion.span>
                {' '}to craft exceptional digital experiences.
              </motion.p>
              <motion.p
                className="text-lg text-slate-500 mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                Where code meets artistry in the modern web landscape.
              </motion.p>
            </motion.div>
            
            {/* Enhanced CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <motion.a
                href="#projects"
                className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl shadow-blue-600/30 overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </span>
              </motion.a>
              
              <motion.a
                href="#contact"
                className="group border-2 border-slate-600 hover:border-blue-400 text-slate-300 hover:text-white px-10 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-800/50 backdrop-blur-sm"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Get In Touch
                  <motion.div
                    className="w-2 h-2 bg-blue-400 rounded-full"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.5, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-slate-800/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1"></div>
                <div className="mx-6 flex items-center gap-2">
                  <Target className="text-blue-400" size={24} />
                  <h2 className="text-4xl font-bold text-slate-200">About Me</h2>
                  <Target className="text-blue-400" size={24} />
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1"></div>
              </div>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-slate-200 mb-4">Full-Stack Developer & Digital Artist</h3>
                  <p className="text-slate-400 leading-relaxed mb-6">
                    I'm a passionate full-stack developer who approaches coding as both a technical discipline 
                    and a creative art form. With expertise spanning modern web technologies, I craft digital 
                    solutions that are not only functional but also aesthetically compelling.
                  </p>
                  <p className="text-slate-400 leading-relaxed">
                    My work combines the precision of engineering with the vision of design, creating 
                    experiences that resonate with users and drive business success.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Code className="text-blue-400" size={24} />, label: 'Clean Code' },
                    { icon: <Layers className="text-indigo-400" size={24} />, label: 'Architecture' },
                    { icon: <Target className="text-slate-400" size={24} />, label: 'Precision' },
                    { icon: <Shield className="text-gray-400" size={24} />, label: 'Security' }
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={aboutInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-slate-800/50 p-4 rounded-lg text-center border border-slate-700 hover:border-slate-600 transition-colors"
                    >
                      <div className="mb-2">{item.icon}</div>
                      <span className="text-slate-300 text-sm font-medium">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20 bg-slate-900/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1"></div>
                <div className="mx-6 flex items-center gap-2">
                  <Code className="text-blue-400" size={24} />
                  <h2 className="text-4xl font-bold text-slate-200">Technical Skills</h2>
                  <Code className="text-blue-400" size={24} />
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Frontend',
                  icon: <Monitor className="text-blue-400" size={32} />,
                  skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
                },
                {
                  title: 'Backend',
                  icon: <Database className="text-indigo-400" size={32} />,
                  skills: ['Node.js', 'Express.js', 'MySQL', 'MongoDB', 'RESTful APIs']
                },
                {
                  title: 'Mobile',
                  icon: <Layers className="text-slate-400" size={32} />,
                  skills: ['React Native', 'Expo', 'Cross-platform', 'Mobile UI/UX']
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-slate-800/70 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-200">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.skills.map((skill, i) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, x: -20 }}
                        animate={skillsInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: (index * 0.2) + (i * 0.1) }}
                        className="bg-slate-700/50 backdrop-blur-sm px-4 py-2 rounded-lg text-center shadow-md hover:bg-slate-600/50 transition-all duration-300"
                      >
                        <span className="text-slate-300 font-medium">{skill}</span>
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
      <section id="experience" ref={experienceRef} className="py-20 bg-slate-800/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1"></div>
                <div className="mx-6 flex items-center gap-2">
                  <Briefcase className="text-blue-400" size={24} />
                  <h2 className="text-4xl font-bold text-slate-200">Experience</h2>
                  <Briefcase className="text-blue-400" size={24} />
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1"></div>
              </div>
            </div>

            <div className="space-y-8">
              {experiences.slice(0, 3).map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={experienceInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-slate-700 hover:border-slate-600 transition-all duration-300"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Briefcase className="text-slate-200" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-200 mb-2">{exp.title}</h3>
                      <h4 className="text-lg text-blue-400 mb-2">{exp.company}</h4>
                      <p className="text-slate-400 mb-4 flex items-center gap-2">
                        <Calendar className="text-slate-500" size={16} />
                        {exp.period}
                      </p>
                      <div className="space-y-2 mb-4">
                        {exp.description.slice(0, 2).map((desc, i) => (
                          <p key={i} className="text-slate-400 leading-relaxed flex items-start gap-2">
                            <Target className="text-blue-400 mt-1 flex-shrink-0" size={16} />
                            {desc}
                          </p>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.slice(0, 4).map((skill) => (
                          <span key={skill} className="bg-slate-800/50 text-slate-300 px-3 py-1 rounded-lg text-sm border border-slate-700 shadow-sm">
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
      <section id="projects" ref={projectsRef} className="py-20 bg-slate-900/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1"></div>
                <div className="mx-6 flex items-center gap-2">
                  <Code className="text-blue-400" size={24} />
                  <h2 className="text-4xl font-bold text-slate-200">Projects</h2>
                  <Code className="text-blue-400" size={24} />
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1"></div>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {['All', 'Web', 'Mobile'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      selectedFilter === filter
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 transform scale-105'
                        : 'bg-slate-700/50 text-slate-300 border border-slate-600 hover:border-blue-400 hover:bg-slate-600/50'
                    }`}
                  >
                    {filter}
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
                  className="bg-slate-800/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl border border-slate-700 hover:border-slate-600 hover:scale-105 transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="h-48 bg-gradient-to-br from-slate-700 via-gray-700 to-slate-600 relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-90"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-slate-700 via-gray-700 to-slate-600 flex items-center justify-center"><svg class="text-blue-400" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>';
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-700 via-gray-700 to-slate-600 flex items-center justify-center">
                        <Code className="text-blue-400" size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-200 mb-3">{project.title}</h3>
                    <p className="text-slate-400 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tag.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="bg-slate-700/50 text-slate-300 px-3 py-1 rounded-lg text-sm border border-slate-600">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.gitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                        title="View on GitHub"
                      >
                        <Github size={20} />
                      </a>
                      {project.previewUrl && (
                        <a
                          href={project.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-400 hover:text-indigo-300 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          title="Live Preview"
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
      <section id="contact" ref={contactRef} className="py-20 bg-slate-800/50 backdrop-blur-sm relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1"></div>
                <div className="mx-6 flex items-center gap-2">
                  <Mail className="text-blue-400" size={24} />
                  <h2 className="text-4xl font-bold text-slate-200">Get In Touch</h2>
                  <Mail className="text-blue-400" size={24} />
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent flex-1"></div>
              </div>
            </div>

            <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl p-12 shadow-2xl border border-slate-700">
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                Ready to collaborate on your next project? Let's combine technical expertise 
                with creative vision to build something exceptional together.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Mail className="text-slate-200" size={24} />
                  </div>
                  <h3 className="font-bold text-slate-200 mb-2">Email</h3>
                  <p className="text-slate-400 text-sm">ahmadalghawi.86@gmail.com</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Github className="text-slate-200" size={24} />
                  </div>
                  <h3 className="font-bold text-slate-200 mb-2">GitHub</h3>
                  <p className="text-slate-400 text-sm">https://github.com/ahmadalghawi</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <MapPin className="text-slate-200" size={24} />
                  </div>
                  <h3 className="font-bold text-slate-200 mb-2">Location</h3>
                  <p className="text-slate-400 text-sm">Sweden</p>
                </div>
              </div>

              <a
                href="/data/Rsume.pdf"
                download
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-8 py-4 rounded-lg shadow-xl shadow-blue-600/30 transition-all duration-300 font-medium"
              >
                <Download size={20} />
                Download Resume
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full border border-slate-700 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-slate-200 mb-4">{selectedProject.title}</h3>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Code className="text-slate-200" size={24} />
                </div>
              </div>
              <p className="text-slate-400 mb-6 leading-relaxed">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {selectedProject.tag.map((tag: string) => (
                  <span key={tag} className="bg-slate-800/50 text-slate-300 px-3 py-2 rounded-lg border border-slate-700">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <a
                  href={selectedProject.gitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-medium shadow-lg"
                >
                  <Github size={20} />
                  View Code
                </a>
                {selectedProject.previewUrl && selectedProject.previewUrl !== selectedProject.gitUrl && (
                  <a
                    href={selectedProject.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-medium shadow-lg"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="border border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-lg"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Universal Navigation */}
      <UniversalNavigation currentTheme="Watercolor Artist" position="bottom-right" variant="dark" />
      
      {/* Navigation Footer */}
      <ThemeNavigationFooter />
    </div>
  );
};

// Navigation Footer Component
const ThemeNavigationFooter = () => (
  <motion.footer 
    className="border-t border-slate-600/50 bg-slate-900/80 backdrop-blur-sm pt-8 mt-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1 }}
  >
    <div className="max-w-6xl mx-auto px-6 text-center">
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <Link 
          href="/"
          className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold underline hover:no-underline"
        >
          ← Home
        </Link>
        <span className="text-slate-600">•</span>
        <Link 
          href="/portfolio"
          className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold underline hover:no-underline"
        >
          Developer Playground
        </Link>
        <span className="text-slate-600">•</span>
        <Link 
          href="/vintage-newspaper"
          className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold underline hover:no-underline"
        >
          Vintage Newspaper
        </Link>
        <span className="text-slate-600">•</span>
        <Link 
          href="/art-deco"
          className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold underline hover:no-underline"
        >
          Art Deco Classic
        </Link>
        <span className="text-slate-600">•</span>
        <Link 
          href="/glassmorphism"
          className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold underline hover:no-underline"
        >
          Glassmorphism
        </Link>
        <span className="text-slate-600">•</span>
        <Link 
          href="/nature"
          className="text-slate-300/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Nature/Organic
        </Link>
        <span className="text-slate-400/40">•</span>
        <Link 
          href="/ai-generator"
          className="text-slate-300/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          AI Code Generator
        </Link>
        <span className="text-slate-600">•</span>
        <Link 
          href="/cyberpunk"
          className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold underline hover:no-underline"
        >
          Cyberpunk Edition
        </Link>
      </div>
      <div className="text-xs text-slate-500">
        <p className="text-slate-400">© 2025 Ahmad Alghawi - Full Stack Developer</p>
        <p className="mt-1 italic text-blue-400/70">"Crafting Digital Artistry with Technical Precision"</p>
      </div>
    </div>
  </motion.footer>
);

export default WatercolorPortfolio;
