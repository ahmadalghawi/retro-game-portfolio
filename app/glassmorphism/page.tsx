'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import UniversalNavigation from '../../components/UniversalNavigation';
import { 
  Sparkles, 
  Code, 
  User, 
  Briefcase, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  ExternalLink,
  Calendar,
  Building,
  Target,
  Layers,
  Monitor,
  Database,
  Zap,
  Globe
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

// Glassmorphism Background Component
const GlassmorphismBackground = () => (
  <div className="fixed inset-0 -z-10">
    {/* Masculine Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-blue-900 to-teal-800"></div>
    
    {/* Geometric Pattern Overlay */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%),
          linear-gradient(-45deg, transparent 40%, rgba(14, 165, 233, 0.1) 50%, transparent 60%)
        `,
        backgroundSize: '60px 60px'
      }}></div>
    </div>
    
    {/* Floating Glass Orbs with Masculine Styling */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white/5 backdrop-blur-sm border border-blue-400/20"
        style={{
          width: `${Math.random() * 150 + 80}px`,
          height: `${Math.random() * 150 + 80}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          borderRadius: i % 2 === 0 ? '50%' : '20px', // Mix of circles and rounded squares
        }}
        animate={{
          x: [0, Math.random() * 80 - 40],
          y: [0, Math.random() * 80 - 40],
          scale: [1, 1.05, 1],
          rotate: [0, Math.random() * 360],
        }}
        transition={{
          duration: Math.random() * 15 + 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
    
    {/* Technical Grid Pattern */}
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={`grid-${i}`}
        className="absolute border border-blue-400/10"
        style={{
          width: '200px',
          height: '200px',
          left: `${Math.random() * 80 + 10}%`,
          top: `${Math.random() * 80 + 10}%`,
          borderRadius: '8px',
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: Math.random() * 20 + 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    ))}
  </div>
);

// Glass Card Component
const GlassCard = ({ children, className = "", delay = 0, onClick }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  onClick?: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl ${className}`}
    onClick={onClick}
  >
    {children}
  </motion.div>
);

// Loading Component
const GlassmorphismLoading = () => (
  <div className="min-h-screen flex items-center justify-center relative">
    <GlassmorphismBackground />
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-24 h-24 mx-auto mb-8 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="text-white" size={32} />
      </motion.div>
      <h2 className="text-3xl font-bold text-white mb-6">
        Crafting Glass Magic...
      </h2>
      <div className="flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-white/60 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  </div>
);

// Hero Section
const HeroSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <GlassCard className="p-12" delay={0.2}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 bg-slate-800/30 backdrop-blur-md border border-blue-400/30 rounded-2xl flex items-center justify-center relative overflow-hidden">
              {/* Technical Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-teal-500/10"></div>
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}></div>
              <Code className="text-blue-300 relative z-10" size={48} />
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
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl text-white/80 mb-8 leading-relaxed"
          >
            Full Stack Developer architecting robust, scalable digital solutions
            with precision engineering and innovative technology.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              className="bg-blue-600/20 backdrop-blur-md border border-blue-400/30 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-blue-600/30 hover:border-blue-300/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects
            </motion.a>
            <motion.a
              href="#contact"
              className="bg-transparent border-2 border-teal-400/40 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-teal-600/10 hover:border-teal-300/60"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
};

// About Section
const AboutSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <GlassCard className="p-8" delay={0.2}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-700/30 backdrop-blur-md border border-blue-400/30 rounded-lg flex items-center justify-center">
                <User className="text-blue-300" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Profile</h3>
            </div>
            <div className="space-y-4 text-white/80">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-white/60" />
                <span>Malmö, Sweden</span>
              </div>
              <div className="flex items-center gap-3">
                <Building size={18} className="text-white/60" />
                <span>Full Stack Developer at Cognes</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-white/60" />
                <span>2012 - Present (13+ years)</span>
              </div>
              <p className="leading-relaxed mt-4">
                Strategic developer specializing in React Native, Next.js, and AI-powered solutions. 
                Currently architecting innovative dementia detection systems while delivering enterprise-grade international projects.
              </p>
            </div>
          </GlassCard>

          <GlassCard className="p-8" delay={0.4}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-700/30 backdrop-blur-md border border-teal-400/30 rounded-lg flex items-center justify-center">
                <Target className="text-teal-300" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white">Expertise</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Frontend & Mobile", skills: ["React.js", "Next.js", "React Native", "TypeScript"] },
                { label: "Backend & Database", skills: ["Node.js", "Firebase", "MySQL", "API Development"] },
                { label: "AI & Tools", skills: ["ChatGPT", "Cursor", "Windsurf", "Bolt.new"] }
              ].map((category, index) => (
                <div key={category.label}>
                  <h4 className="text-white font-semibold mb-2">{category.label}</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-slate-800/20 backdrop-blur-sm border border-blue-400/20 text-blue-100 px-3 py-1 rounded-lg text-sm hover:bg-blue-600/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-6">
          {experiences.slice(0, 4).map((exp, index) => (
            <GlassCard key={exp.id} className="p-8" delay={index * 0.1}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{exp.title}</h3>
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="flex items-center gap-2">
                      <Building size={16} />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    exp.type === 'fulltime' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    exp.type === 'freelance' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                    'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  }`}>
                    {exp.type === 'fulltime' ? 'Full-time' : exp.type === 'freelance' ? 'Freelance' : 'Technical'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                {exp.description.slice(0, 3).map((desc, i) => (
                  <p key={i} className="text-white/80 leading-relaxed flex items-start gap-3">
                    <Zap className="text-white/60 mt-1 flex-shrink-0" size={16} />
                    {desc}
                  </p>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {exp.skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 px-3 py-1 rounded-lg text-sm"
                  >
                    {skill}
                  </span>
                ))}
                {exp.skills.length > 6 && (
                  <span className="bg-white/5 border border-white/10 text-white/50 px-3 py-1 rounded-lg text-sm">
                    +{exp.skills.length - 6} more
                  </span>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const ProjectsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

  return (
    <section id="projects" ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full mb-8"></div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['All', 'Web', 'Mobile'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 backdrop-blur-md border ${
                  selectedFilter === filter
                    ? 'bg-blue-400/30 text-white border-blue-400/50 shadow-lg shadow-blue-400/20'
                    : 'bg-white/10 text-white/70 border-white/20 hover:border-teal-400/50 hover:bg-white/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedFilter === 'All' 
            ? projectsData 
            : projectsData.filter(project => project.tag.includes(selectedFilter))
          ).slice(0, 9).map((project, index) => (
            <GlassCard
              key={project.id}
              className="p-6 cursor-pointer hover:bg-white/15 transition-all duration-300"
              delay={index * 0.1}
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg flex items-center justify-center">
                  <Monitor className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
              </div>
              
              <p className="text-white/80 mb-4 leading-relaxed line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tag.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 px-2 py-1 rounded text-sm"
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
                  className="text-white/70 hover:text-white transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={20} />
                </a>
                {project.previewUrl && (
                  <a
                    href={project.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </GlassCard>
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
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg flex items-center justify-center">
                    <Monitor className="text-white" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tag.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 px-3 py-1 rounded-lg text-sm"
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
                    className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/30 flex items-center gap-2"
                  >
                    <Github size={20} />
                    View Code
                  </a>
                  {selectedProject.previewUrl && (
                    <a
                      href={selectedProject.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent border-2 border-white/40 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10 flex items-center gap-2"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </a>
                  )}
                </div>
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="mt-6 w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 py-3 rounded-lg transition-colors hover:bg-white/20"
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

// Contact Section
const ContactSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section id="contact" ref={ref} className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-teal-400 mx-auto rounded-full"></div>
        </motion.div>

        <GlassCard className="p-8 text-center" delay={0.2}>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Let's Create Something Amazing Together
            </h3>
            <p className="text-white/80 leading-relaxed">
              Ready to bring your digital vision to life with cutting-edge technology and creative solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg flex items-center justify-center">
                  <MapPin className="text-white" size={20} />
                </div>
                <span className="text-white">Malmö, Sweden</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg flex items-center justify-center">
                  <Phone className="text-white" size={20} />
                </div>
                <span className="text-white">073-742 14 90</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg flex items-center justify-center">
                  <Mail className="text-white" size={20} />
                </div>
                <a
                  href="mailto:ahmadalghawi.86@gmail.com"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  ahmadalghawi.86@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg flex items-center justify-center">
                  <Globe className="text-white" size={20} />
                </div>
                <a
                  href="https://ahmadalghawi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  ahmadalghawi.com
                </a>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

// Navigation Footer Component
const ThemeNavigationFooter = () => (
  <motion.footer 
    className="bg-white/5 backdrop-blur-md border-t border-white/20 pt-8 mt-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1 }}
  >
    <div className="max-w-6xl mx-auto px-6 text-center">
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <Link 
          href="/"
          className="text-white/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          ← Home
        </Link>
        <span className="text-white/40">•</span>
        <Link 
          href="/portfolio"
          className="text-white/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Developer Playground
        </Link>
        <span className="text-white/40">•</span>
        <Link 
          href="/vintage-newspaper"
          className="text-white/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Vintage Newspaper
        </Link>
        <span className="text-white/40">•</span>
        <Link 
          href="/art-deco"
          className="text-white/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Art Deco Classic
        </Link>
        <span className="text-white/40">•</span>
        <Link 
          href="/nature"
          className="text-blue-300/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Nature/Organic
        </Link>
        <span className="text-blue-400/40">•</span>
        <Link 
          href="/ai-generator"
          className="text-blue-300/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          AI Code Generator
        </Link>
        <span className="text-white/40">•</span>
        <Link 
          href="/cyberpunk"
          className="text-white/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Cyberpunk Edition
        </Link>
        <span className="text-white/40">•</span>
        <Link 
          href="/watercolor"
          className="text-white/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Watercolor Artist
        </Link>
      </div>
      <div className="text-xs text-white/60">
        <p>© 2025 Ahmad Alghawi - Full Stack Developer</p>
        <p className="mt-1 italic">"Precision Engineering, Transparent Excellence"</p>
      </div>
    </div>
  </motion.footer>
);

// Main Component
const GlassmorphismPortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <GlassmorphismLoading />;
  }

  return (
    <div className="min-h-screen relative">
      <GlassmorphismBackground />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <UniversalNavigation currentTheme="Glassmorphism" position="top-right" variant="dark" />
      <ThemeNavigationFooter />
    </div>
  );
};

export default GlassmorphismPortfolio;
