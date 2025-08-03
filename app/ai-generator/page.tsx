'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import UniversalNavigation from '../../components/UniversalNavigation';
import { 
  Brain, 
  Code, 
  Cpu, 
  Zap, 
  Bot, 
  Sparkles, 
  User, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  ExternalLink,
  Calendar,
  Building,
  Terminal,
  Globe,
  MessageSquare,
  Lightbulb,
  Rocket,
  Database,
  Network
} from 'lucide-react';

// Import data
import projectsData from '../../data/projectsData';
import { experiences } from '../../data/experienceData';

// Type definitions
type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  previewUrl: string;
};

// AI Background Component
const AIBackground = () => (
  <div className="fixed inset-0 -z-10">
    {/* Neural Network Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900"></div>
    
    {/* Neural Network Pattern */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.3) 1px, transparent 1px),
          radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 1px, transparent 1px),
          radial-gradient(circle at 40% 60%, rgba(168, 85, 247, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px, 150px 150px, 80px 80px'
      }}></div>
    </div>
    
    {/* Floating Neural Nodes */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-purple-400 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 1, 0.3],
          x: [0, Math.random() * 50 - 25],
          y: [0, Math.random() * 50 - 25],
        }}
        transition={{
          duration: Math.random() * 4 + 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* Data Flow Lines */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={`line-${i}`}
        className="absolute h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
        style={{
          width: '200px',
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 80 + 10}%`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }}
        animate={{
          opacity: [0, 1, 0],
          scaleX: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          delay: i * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// AI Card Component
const AICard = ({ children, className = "", delay = 0, onClick }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  onClick?: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={`bg-slate-800/40 backdrop-blur-md border border-purple-500/30 rounded-2xl shadow-2xl relative overflow-hidden ${className}`}
    onClick={onClick}
    style={{
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(88, 28, 135, 0.2) 100%)',
    }}
  >
    {/* AI Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 opacity-50"></div>
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// Typing Animation Component
const TypingAnimation = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }
    }, 50 + delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay]);

  return (
    <span className="font-mono">
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-purple-400"
      >
        |
      </motion.span>
    </span>
  );
};

// Loading Component
const AILoading = () => (
  <div className="min-h-screen flex items-center justify-center relative">
    <AIBackground />
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-24 h-24 mx-auto mb-8 text-purple-400 flex items-center justify-center relative"
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ 
          rotate: { duration: 3, repeat: Infinity, ease: "linear" }
        }}
      >
        <Brain size={48} />
        <motion.div
          className="absolute inset-0 border-2 border-purple-400/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <h2 className="text-3xl font-bold text-white mb-6">
        <TypingAnimation text="Initializing AI Systems..." />
      </h2>
      <div className="flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-purple-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1], 
              opacity: [0.5, 1, 0.5],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 1.5, 
              delay: i * 0.2, 
              repeat: Infinity 
            }}
          />
        ))}
      </div>
    </motion.div>
  </div>
);

// Hero Section
const HeroSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [codeText, setCodeText] = useState('');

  const aiGeneratedCode = `// AI-Generated Portfolio Component
const AhmadAlghawi = () => {
  const skills = ['React', 'Next.js', 'AI Tools'];
  const passion = 'Building the Future';
  
  return (
    <Developer
      name="Ahmad Alghawi"
      location="Malmö, Sweden"
      expertise={skills}
      aiPowered={true}
      innovation={passion}
    />
  );
};`;

  useEffect(() => {
    if (inView) {
      let index = 0;
      const timer = setInterval(() => {
        if (index <= aiGeneratedCode.length) {
          setCodeText(aiGeneratedCode.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [inView]);

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Profile */}
          <AICard className="p-12 text-center" delay={0.2}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
              className="mb-8"
            >
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
                <Brain size={64} className="text-white relative z-10" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-5xl md:text-6xl font-bold text-white mb-6"
            >
              Ahmad Alghawi
            </motion.h1>
            
            {/* AI Metrics Dashboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-green-400/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">2,847</div>
                <div className="text-xs text-green-300">Lines Generated Today</div>
              </div>
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-blue-400/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-400 mb-1">89%</div>
                <div className="text-xs text-blue-300">Productivity Boost</div>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-violet-500/20 backdrop-blur-sm border border-purple-400/20 rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">156</div>
                <div className="text-xs text-purple-300">Problems Solved</div>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-xl text-purple-200 mb-8 leading-relaxed"
            >
              AI-Powered Full Stack Developer
              <br />
              <span className="text-blue-300">Amplifying Human Creativity with AI Intelligence</span>
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.a
                href="#projects"
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:from-purple-500 hover:to-blue-500"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <Rocket size={20} />
                  Explore AI Projects
                </span>
              </motion.a>
              <motion.a
                href="#contact"
                className="bg-transparent border-2 border-purple-400/40 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-purple-600/10 hover:border-purple-300/60"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  <MessageSquare size={20} />
                  Connect
                </span>
              </motion.a>
            </motion.div>
          </AICard>

          {/* Right Side - AI Code Generation */}
          <AICard className="p-8" delay={0.4}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">AI Code Generator</h3>
                <p className="text-sm text-purple-300">Powered by ChatGPT & Cursor</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-xs text-green-400">ACTIVE</span>
              </div>
            </div>
            
            <div className="bg-slate-900/60 rounded-xl p-6 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 ml-2">AI_Generator.tsx</span>
              </div>
              
              <pre className="text-purple-300 leading-relaxed whitespace-pre-wrap">
                {codeText}
              </pre>
              
              {codeText.length < aiGeneratedCode.length && (
                <motion.div
                  className="flex items-center gap-2 mt-4 text-blue-400"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles size={16} />
                  <span className="text-sm">AI is generating code...</span>
                </motion.div>
              )}
            </div>
          </AICard>
        </div>
      </div>
    </section>
  );
};

// AI Tools Section
const AIToolsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const aiTools = [
    {
      name: 'ChatGPT',
      description: 'Problem solving, code review, architecture planning',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
      status: 'ACTIVE',
      stats: { usage: '847 queries', saved: '23.5 hrs', efficiency: '+67%' }
    },
    {
      name: 'Cursor',
      description: 'Real-time code completion, refactoring, debugging',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      status: 'ACTIVE',
      stats: { usage: '1,234 completions', saved: '15.2 hrs', efficiency: '+89%' }
    },
    {
      name: 'Windsurf',
      description: 'Fast development, AI-assisted coding, project setup',
      icon: Zap,
      color: 'from-purple-500 to-violet-500',
      status: 'ACTIVE',
      stats: { usage: '156 projects', saved: '31.8 hrs', efficiency: '+124%' }
    },
    {
      name: 'Bolt.new',
      description: 'Rapid prototyping, full-stack generation, deployment',
      icon: Rocket,
      color: 'from-orange-500 to-red-500',
      status: 'ACTIVE',
      stats: { usage: '43 prototypes', saved: '18.7 hrs', efficiency: '+156%' }
    }
  ];

  return (
    <section id="ai-tools" ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">AI Tools Arsenal</h2>
          <p className="text-purple-200 text-lg mb-8">Amplifying productivity with cutting-edge AI</p>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiTools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <AICard
                key={tool.name}
                className="p-6 text-center hover:bg-slate-700/20 transition-all duration-300"
                delay={index * 0.1}
              >
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  <IconComponent size={32} className="text-white relative z-10" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{tool.name}</h3>
                <p className="text-purple-200 text-sm mb-4 leading-relaxed">{tool.description}</p>
                
                {/* Usage Statistics */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-300">Usage:</span>
                    <span className="text-white font-medium">{tool.stats.usage}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-300">Time Saved:</span>
                    <span className="text-blue-400 font-medium">{tool.stats.saved}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-purple-300">Efficiency:</span>
                    <span className="text-green-400 font-medium">{tool.stats.efficiency}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs text-green-400 font-medium">{tool.status}</span>
                </div>
              </AICard>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">AI-Enhanced Developer</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        <AICard className="p-12" delay={0.2}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Amplifying Human Creativity with AI Intelligence</h3>
                <p className="text-purple-200 leading-relaxed mb-6">
                  Full Stack Developer based in Malmö, Sweden, specializing in AI-enhanced development workflows. 
                  I leverage cutting-edge AI tools to amplify productivity, accelerate innovation, and deliver 
                  exceptional digital solutions.
                </p>
                <p className="text-purple-200 leading-relaxed mb-6">
                  Currently developing mobile applications and admin portals at Cognes, focusing on early dementia 
                  detection using React Native, Firebase, and Next.js. My approach combines human creativity with 
                  AI intelligence to build the future of technology.
                </p>
                {/* AI Workflow Diagram */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">AI-Enhanced Development Workflow</h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/20 rounded-lg p-3 text-center">
                      <MessageSquare className="w-6 h-6 text-green-400 mx-auto mb-2" />
                      <div className="text-xs text-green-300">1. AI Planning</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-lg p-3 text-center">
                      <Code className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                      <div className="text-xs text-blue-300">2. AI Coding</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-400/20 rounded-lg p-3 text-center">
                      <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                      <div className="text-xs text-purple-300">3. AI Testing</div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-400/20 rounded-lg p-3 text-center">
                      <Rocket className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                      <div className="text-xs text-orange-300">4. AI Deploy</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {['React.js', 'Next.js', 'React Native', 'TypeScript', 'AI Tools', 'Firebase'].map((skill) => (
                    <span
                      key={skill}
                      className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/20 text-purple-200 px-3 py-1 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl flex items-center justify-center relative overflow-hidden backdrop-blur-sm border border-purple-400/20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-blue-600/10"></div>
                <Network size={120} className="text-purple-300 relative z-10" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
                      'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)',
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </div>
        </AICard>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="experience" ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">AI-Accelerated Experience</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-8">
          {experiences.slice(0, 4).map((exp, index) => (
            <AICard
              key={exp.id}
              className="p-8"
              delay={index * 0.1}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <Building className="text-white" size={32} />
                  </div>
                </div>
                
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{exp.title}</h3>
                      <p className="text-purple-300 font-medium">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 text-purple-200 text-sm">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  
                  <p className="text-purple-200 leading-relaxed mb-4">{exp.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.slice(0, 6).map((skill) => (
                      <span
                        key={skill}
                        className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/20 text-purple-200 px-2 py-1 rounded-lg text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AICard>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = ({ selectedProject, setSelectedProject, selectedFilter, setSelectedFilter }: {
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
}) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  // Filter projects based on selected filter
  const filteredProjects = selectedFilter === 'All' 
    ? projectsData 
    : projectsData.filter(project => 
        project.tag.some(tag => 
          selectedFilter === 'Web' ? ['React', 'Next.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Node.js'].includes(tag) :
          selectedFilter === 'Mobile' ? ['React Native', 'Mobile', 'iOS', 'Android', 'Flutter'].includes(tag) :
          false
        )
      );

  const displayedProjects = filteredProjects.slice(0, 9);

  return (
    <section id="projects" ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">AI-Generated Projects</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* AI-themed Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="flex gap-4 bg-slate-800/40 backdrop-blur-md border border-purple-500/30 rounded-2xl p-2">
            {['All', 'Web', 'Mobile'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-purple-200 hover:text-white hover:bg-slate-700/40'
                }`}
              >
                {filter === 'All' && <Brain size={16} />}
                {filter === 'Web' && <Globe size={16} />}
                {filter === 'Mobile' && <Terminal size={16} />}
                <span className="font-mono">[{filter.toUpperCase()}]</span>
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <AICard
              key={project.id}
              className="p-6 cursor-pointer hover:bg-slate-700/20 transition-all duration-300"
              delay={index * 0.1}
              onClick={() => setSelectedProject(project)}
            >
              {/* Project Image */}
              <div className="mb-4 rounded-xl overflow-hidden bg-slate-700/30">
                <img
                  src={project.image || '/api/placeholder/400/200'}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/api/placeholder/400/200';
                  }}
                />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Terminal className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              
              <p className="text-purple-200 mb-4 leading-relaxed line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tag.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/20 text-purple-200 px-2 py-1 rounded-lg text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-3">
                <a
                  href={project.gitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-200 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={20} />
                </a>
                {project.previewUrl && (
                  <a
                    href={project.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-300 hover:text-purple-200 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </AICard>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-slate-800/40 backdrop-blur-md border border-purple-500/30 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Project Image in Modal */}
                <div className="mb-6 rounded-xl overflow-hidden bg-slate-700/30">
                  <img
                    src={selectedProject.image || '/api/placeholder/600/300'}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/api/placeholder/600/300';
                    }}
                  />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <Terminal className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                </div>
                
                <p className="text-purple-200 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tag.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-400/20 text-purple-200 px-3 py-1 rounded-xl text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  <a
                    href={selectedProject.gitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:from-purple-500 hover:to-blue-500 flex items-center gap-2"
                  >
                    <Github size={20} />
                    View Code
                  </a>
                  {selectedProject.previewUrl && (
                    <a
                      href={selectedProject.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent border-2 border-purple-400/40 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-purple-600/10 flex items-center gap-2"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </a>
                  )}
                </div>
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="mt-6 w-full bg-slate-800/40 backdrop-blur-sm border border-purple-400/20 text-purple-200 py-3 rounded-2xl transition-colors hover:bg-slate-700/40"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

// AI Lab Section
const AILabSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const experiments = [
    {
      name: 'Neural Code Review',
      description: 'AI-powered code analysis with 97% accuracy in bug detection',
      status: 'Beta Testing',
      progress: 85,
      icon: Brain
    },
    {
      name: 'Auto Documentation',
      description: 'Generate comprehensive docs from code using GPT-4',
      status: 'Live',
      progress: 100,
      icon: Database
    },
    {
      name: 'Smart Refactoring',
      description: 'Intelligent code optimization with performance insights',
      status: 'Development',
      progress: 60,
      icon: Cpu
    },
    {
      name: 'AI Test Generation',
      description: 'Automated test suite creation with edge case detection',
      status: 'Prototype',
      progress: 40,
      icon: Lightbulb
    }
  ];

  return (
    <section id="ai-lab" ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">AI Innovation Lab</h2>
          <p className="text-purple-200 text-lg mb-8">Experimental AI projects pushing the boundaries of development</p>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {experiments.map((experiment, index) => {
            const IconComponent = experiment.icon;
            return (
              <AICard
                key={experiment.name}
                className="p-6 hover:bg-slate-700/20 transition-all duration-300"
                delay={index * 0.1}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <IconComponent size={24} className="text-white" />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-white">{experiment.name}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        experiment.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                        experiment.status === 'Beta Testing' ? 'bg-blue-500/20 text-blue-400' :
                        experiment.status === 'Development' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        {experiment.status}
                      </span>
                    </div>
                    
                    <p className="text-purple-200 text-sm mb-4 leading-relaxed">{experiment.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="mb-2">
                      <div className="flex justify-between text-xs text-purple-300 mb-1">
                        <span>Progress</span>
                        <span>{experiment.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-700/60 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-400 to-blue-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${experiment.progress}%` } : { width: 0 }}
                          transition={{ duration: 1.5, delay: index * 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </AICard>
            );
          })}
        </div>
        
        {/* Future Vision */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <AICard className="p-8" delay={0.8}>
            <h3 className="text-2xl font-bold text-white mb-4">The Future of AI Development</h3>
            <p className="text-purple-200 leading-relaxed mb-6">
              "In the next 5 years, AI will transform from a tool that assists developers to a collaborative 
              partner that understands context, anticipates needs, and co-creates solutions. I'm building 
              that future today."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <Sparkles className="text-purple-400" size={20} />
                <span className="text-purple-300 text-sm">AI-First Development</span>
              </div>
              <div className="flex items-center gap-2">
                <Network className="text-blue-400" size={20} />
                <span className="text-blue-300 text-sm">Neural Collaboration</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="text-green-400" size={20} />
                <span className="text-green-300 text-sm">Exponential Innovation</span>
              </div>
            </div>
          </AICard>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [chatMessages, setChatMessages] = useState([
    { type: 'ai', message: 'Hello! I\'m Ahmad\'s AI assistant. How can I help you learn about his work?' },
    { type: 'user', message: 'What makes Ahmad different as a developer?' },
    { type: 'ai', message: 'Ahmad leverages cutting-edge AI tools to amplify productivity by 89% and deliver innovative solutions faster than traditional development.' }
  ]);

  return (
    <section id="contact" ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Connect with AI Innovation</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* AI Assistant Chat */}
          <AICard className="p-8" delay={0.2}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                <Bot className="text-white" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">AI Assistant</h3>
                <p className="text-purple-300 text-sm">Ask me anything about Ahmad's work</p>
              </div>
            </div>
            
            <div className="bg-slate-900/60 rounded-xl p-4 h-64 overflow-y-auto mb-4">
              {chatMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.5 }}
                  className={`mb-3 ${msg.type === 'ai' ? 'text-left' : 'text-right'}`}
                >
                  <div className={`inline-block max-w-[80%] p-3 rounded-2xl ${
                    msg.type === 'ai' 
                      ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-200' 
                      : 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 text-blue-200'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.message}</p>
                  </div>
                </motion.div>
              ))}
              
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-2 text-purple-400 text-sm"
              >
                <Bot size={16} />
                <span>AI is typing...</span>
              </motion.div>
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask about Ahmad's AI expertise..."
                className="flex-1 bg-slate-800/60 border border-purple-400/20 rounded-xl px-4 py-2 text-white placeholder-purple-300 text-sm focus:outline-none focus:border-purple-400"
              />
              <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl transition-all duration-300">
                <Sparkles size={16} />
              </button>
            </div>
          </AICard>

          {/* Contact Information */}
          <AICard className="p-8 text-center" delay={0.4}>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-3">
              <Brain className="text-purple-400" size={28} />
              Let's Build the Future Together
            </h3>
            <p className="text-purple-200 leading-relaxed">
              Ready to leverage AI-powered development to accelerate your projects and deliver 
              innovative solutions that push the boundaries of what's possible.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <MapPin className="text-white" size={20} />
                </div>
                <span className="text-purple-200">Malmö, Sweden</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Phone className="text-white" size={20} />
                </div>
                <span className="text-purple-200">073-742 14 90</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Mail className="text-white" size={20} />
                </div>
                <a
                  href="mailto:ahmadalghawi.86@gmail.com"
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  ahmadalghawi.86@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <Globe className="text-white" size={20} />
                </div>
                <a
                  href="https://ahmadalghawi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-200 hover:text-white transition-colors"
                >
                  ahmadalghawi.com
                </a>
              </div>
            </div>
          </div>
        </AICard>
        </div>
      </div>
    </section>
  );
};

// Navigation Footer Component
const ThemeNavigationFooter = () => (
  <motion.footer 
    className="bg-slate-900/20 backdrop-blur-sm border-t border-purple-500/20 pt-8 mt-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1 }}
  >
    <div className="max-w-6xl mx-auto px-6 text-center">
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <Link 
          href="/"
          className="text-purple-200/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline flex items-center gap-1"
        >
          <Brain size={14} />
          Home
        </Link>
        <span className="text-purple-400/40">•</span>
        <Link 
          href="/portfolio"
          className="text-purple-200/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Developer Playground
        </Link>
        <span className="text-purple-400/40">•</span>
        <Link 
          href="/vintage-newspaper"
          className="text-purple-200/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Vintage Newspaper
        </Link>
        <span className="text-purple-400/40">•</span>
        <Link 
          href="/art-deco"
          className="text-purple-200/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Art Deco Classic
        </Link>
        <span className="text-purple-400/40">•</span>
        <Link 
          href="/cyberpunk"
          className="text-purple-200/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Cyberpunk Edition
        </Link>
        <span className="text-purple-400/40">•</span>
        <Link 
          href="/watercolor"
          className="text-purple-200/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Watercolor Artist
        </Link>
        <span className="text-purple-400/40">•</span>
        <Link 
          href="/glassmorphism"
          className="text-purple-200/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Glassmorphism
        </Link>
        <span className="text-purple-400/40">•</span>
        <Link 
          href="/nature"
          className="text-purple-200/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Nature/Organic
        </Link>
      </div>
      <div className="text-xs text-purple-300/60">
        <p>© 2025 Ahmad Alghawi - AI-Powered Full Stack Developer</p>
        <p className="mt-1 italic flex items-center justify-center gap-2">
          <Sparkles size={12} />
          "Amplifying Human Creativity with AI Intelligence"
          <Bot size={12} />
        </p>
      </div>
    </div>
  </motion.footer>
);

export default function AIGeneratorPortfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AILoading />;
  }

  return (
    <div className="min-h-screen relative">
      <AIBackground />
      <HeroSection />
      <AIToolsSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection selectedProject={selectedProject} setSelectedProject={setSelectedProject} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      <AILabSection />
      <ContactSection />
      <UniversalNavigation currentTheme="AI Code Generator" position="top-right" variant="dark" />
      <ThemeNavigationFooter />
    </div>
  );
}
