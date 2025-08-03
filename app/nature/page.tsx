'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import UniversalNavigation from '../../components/UniversalNavigation';
import { 
  Leaf, 
  TreePine, 
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
  Sprout,
  Flower,
  Mountain,
  Sun,
  Globe,
  Zap
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

// Nature Background Component
const NatureBackground = () => (
  <div className="fixed inset-0 -z-10">
    {/* Earth Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800"></div>
    
    {/* Organic Pattern Overlay */}
    <div className="absolute inset-0 opacity-20">
      <div className="absolute inset-0" style={{
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 50% 50%, rgba(5, 150, 105, 0.1) 0%, transparent 50%)
        `,
        backgroundSize: '300px 300px, 400px 400px, 200px 200px'
      }}></div>
    </div>
    
    {/* Floating Leaves */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute text-green-300/30"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          fontSize: `${Math.random() * 20 + 15}px`,
        }}
        animate={{
          x: [0, Math.random() * 100 - 50],
          y: [0, Math.random() * 100 - 50],
          rotate: [0, Math.random() * 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: Math.random() * 20 + 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {i % 4 === 0 ? '🍃' : i % 4 === 1 ? '🌿' : i % 4 === 2 ? '🍀' : '🌱'}
      </motion.div>
    ))}
    
    {/* Growing Vines */}
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={`vine-${i}`}
        className="absolute w-1 bg-green-600/20 rounded-full"
        style={{
          height: '200px',
          left: `${20 + i * 30}%`,
          bottom: '0',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{
          duration: 3,
          delay: i * 0.5,
          ease: "easeOut",
        }}
      />
    ))}
  </div>
);

// Organic Card Component
const OrganicCard = ({ children, className = "", delay = 0, onClick }: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  onClick?: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={`bg-green-900/20 backdrop-blur-sm border border-green-400/30 rounded-3xl shadow-2xl relative overflow-hidden ${className}`}
    onClick={onClick}
    style={{
      borderRadius: '2rem',
      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
    }}
  >
    {/* Organic texture overlay */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(34, 197, 94, 0.3) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>
    </div>
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

// Loading Component
const NatureLoading = () => (
  <div className="min-h-screen flex items-center justify-center relative">
    <NatureBackground />
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="w-24 h-24 mx-auto mb-8 text-green-300 flex items-center justify-center"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <TreePine size={48} />
      </motion.div>
      <h2 className="text-3xl font-bold text-green-100 mb-6">
        Growing Digital Gardens...
      </h2>
      <div className="flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-green-400 rounded-full"
            animate={{ 
              scale: [1, 1.5, 1], 
              opacity: [0.5, 1, 0.5],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 1.5, 
              delay: i * 0.3, 
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

  return (
    <section ref={ref} className="min-h-screen flex items-center justify-center px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <OrganicCard className="p-12" delay={0.2}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-8"
          >
            <div className="w-32 h-32 mx-auto mb-8 text-green-300 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-green-600/10 rounded-full animate-pulse"></div>
              <TreePine size={64} className="relative z-10" />
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-5xl md:text-6xl font-bold text-green-100 mb-6"
          >
            Ahmad Alghawi
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl text-green-200/80 mb-8 leading-relaxed"
          >
            Full Stack Developer cultivating sustainable digital ecosystems
            with organic growth and natural innovation.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.a
              href="#projects"
              className="bg-green-600/30 backdrop-blur-sm border border-green-400/40 text-green-100 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-green-600/40 hover:border-green-300/60"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Sprout size={20} />
                Explore Projects
              </span>
            </motion.a>
            <motion.a
              href="#contact"
              className="bg-transparent border-2 border-emerald-400/40 text-green-100 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-emerald-600/10 hover:border-emerald-300/60"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                <Flower size={20} />
                Let's Connect
              </span>
            </motion.a>
          </motion.div>
        </OrganicCard>
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
          <h2 className="text-4xl font-bold text-green-100 mb-4">About Me</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <OrganicCard className="p-8" delay={0.2}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-green-700/30 backdrop-blur-sm border border-green-400/30 rounded-2xl flex items-center justify-center">
                <User className="text-green-300" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-green-100">Profile</h3>
            </div>
            <div className="space-y-4 text-green-200/80">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-green-400" />
                <span>Malmö, Sweden</span>
              </div>
              <div className="flex items-center gap-3">
                <Building size={18} className="text-green-400" />
                <span>Full Stack Developer at Cognes</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-green-400" />
                <span>2012 - Present (13+ years)</span>
              </div>
              <p className="leading-relaxed mt-4">
                Nurturing developer specializing in React Native, Next.js, and AI-powered solutions. 
                Currently cultivating innovative dementia detection systems while growing sustainable international projects.
              </p>
            </div>
          </OrganicCard>

          <OrganicCard className="p-8" delay={0.4}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-700/30 backdrop-blur-sm border border-emerald-400/30 rounded-2xl flex items-center justify-center">
                <Sprout className="text-emerald-300" size={24} />
              </div>
              <h3 className="text-2xl font-bold text-green-100">Growth Areas</h3>
            </div>
            <div className="space-y-4">
              {[
                { label: "Frontend & Mobile", skills: ["React.js", "Next.js", "React Native", "TypeScript"] },
                { label: "Backend & Database", skills: ["Node.js", "Firebase", "MySQL", "API Development"] },
                { label: "AI & Tools", skills: ["ChatGPT", "Cursor", "Windsurf", "Bolt.new"] }
              ].map((category, index) => (
                <div key={category.label}>
                  <h4 className="text-green-100 font-semibold mb-2 flex items-center gap-2">
                    <Leaf size={16} className="text-green-400" />
                    {category.label}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-green-800/20 backdrop-blur-sm border border-green-400/20 text-green-200 px-3 py-1 rounded-xl text-sm hover:bg-green-600/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </OrganicCard>
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
          <h2 className="text-4xl font-bold text-green-100 mb-4">Experience</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="space-y-6">
          {experiences.slice(0, 4).map((exp, index) => (
            <OrganicCard key={exp.id} className="p-8" delay={index * 0.1}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-green-100 mb-2">{exp.title}</h3>
                  <div className="flex items-center gap-4 text-green-200/70">
                    <div className="flex items-center gap-2">
                      <Building size={16} className="text-green-400" />
                      <span>{exp.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-green-400" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    exp.type === 'fulltime' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                    exp.type === 'freelance' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  }`}>
                    {exp.type === 'fulltime' ? 'Full-time' : exp.type === 'freelance' ? 'Freelance' : 'Technical'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                {exp.description.slice(0, 3).map((desc, i) => (
                  <p key={i} className="text-green-200/80 leading-relaxed flex items-start gap-3">
                    <Leaf className="text-green-400 mt-1 flex-shrink-0" size={16} />
                    {desc}
                  </p>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {exp.skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="bg-green-800/20 backdrop-blur-sm border border-green-400/20 text-green-200 px-3 py-1 rounded-xl text-sm"
                  >
                    {skill}
                  </span>
                ))}
                {exp.skills.length > 6 && (
                  <span className="bg-green-900/20 border border-green-500/10 text-green-300/50 px-3 py-1 rounded-xl text-sm">
                    +{exp.skills.length - 6} more
                  </span>
                )}
              </div>
            </OrganicCard>
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

  return (
    <section id="projects" ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-green-100 mb-4">Featured Projects</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full mb-8"></div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['All', 'Web', 'Mobile'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 backdrop-blur-sm border ${
                  selectedFilter === filter
                    ? 'bg-green-500/30 text-green-100 border-green-400/50 shadow-lg shadow-green-400/20'
                    : 'bg-green-800/20 text-green-200 border-green-400/20 hover:border-green-400/40 hover:bg-green-700/30'
                }`}
              >
                🌱 {filter}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(selectedFilter === 'All' 
            ? projectsData 
            : projectsData.filter(project => project.tag.includes(selectedFilter))
          ).slice(0, 9).map((project, index) => (
            <OrganicCard
              key={project.id}
              className="p-6 cursor-pointer hover:bg-green-800/10 transition-all duration-300"
              delay={index * 0.1}
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-700/30 backdrop-blur-sm border border-green-400/30 rounded-2xl flex items-center justify-center">
                  <Sprout className="text-green-300" size={20} />
                </div>
                <h3 className="text-xl font-bold text-green-100">{project.title}</h3>
              </div>
              
              <p className="text-green-200/80 mb-4 leading-relaxed line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tag.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-green-800/20 backdrop-blur-sm border border-green-400/20 text-green-200 px-2 py-1 rounded-lg text-sm"
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
                  className="text-green-300 hover:text-green-200 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={20} />
                </a>
                {project.previewUrl && (
                  <a
                    href={project.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-300 hover:text-green-200 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={20} />
                  </a>
                )}
              </div>
            </OrganicCard>
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
                className="bg-green-900/20 backdrop-blur-md border border-green-400/30 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-700/30 backdrop-blur-sm border border-green-400/30 rounded-2xl flex items-center justify-center">
                    <Sprout className="text-green-300" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-green-100">{selectedProject.title}</h3>
                </div>
                
                <p className="text-green-200/80 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tag.map((tag) => (
                    <span
                      key={tag}
                      className="bg-green-800/20 backdrop-blur-sm border border-green-400/20 text-green-200 px-3 py-1 rounded-xl text-sm"
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
                    className="bg-green-600/30 backdrop-blur-sm border border-green-400/40 text-green-100 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-green-600/40 flex items-center gap-2"
                  >
                    <Github size={20} />
                    View Code
                  </a>
                  {selectedProject.previewUrl && (
                    <a
                      href={selectedProject.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-transparent border-2 border-emerald-400/40 text-green-100 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:bg-emerald-600/10 flex items-center gap-2"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </a>
                  )}
                </div>
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="mt-6 w-full bg-green-800/20 backdrop-blur-sm border border-green-400/20 text-green-200 py-3 rounded-2xl transition-colors hover:bg-green-700/30"
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
          <h2 className="text-4xl font-bold text-green-100 mb-4">Get In Touch</h2>
          <div className="w-24 h-2 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto rounded-full"></div>
        </motion.div>

        <OrganicCard className="p-8 text-center" delay={0.2}>
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-green-100 mb-4 flex items-center justify-center gap-3">
              <Flower className="text-green-300" size={28} />
              Let's Grow Something Beautiful Together
            </h3>
            <p className="text-green-200/80 leading-relaxed">
              Ready to cultivate your digital vision with sustainable, innovative solutions that flourish and thrive.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-green-700/30 backdrop-blur-sm border border-green-400/30 rounded-2xl flex items-center justify-center">
                  <MapPin className="text-green-300" size={20} />
                </div>
                <span className="text-green-200">Malmö, Sweden</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-green-700/30 backdrop-blur-sm border border-green-400/30 rounded-2xl flex items-center justify-center">
                  <Phone className="text-green-300" size={20} />
                </div>
                <span className="text-green-200">073-742 14 90</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-emerald-700/30 backdrop-blur-sm border border-emerald-400/30 rounded-2xl flex items-center justify-center">
                  <Mail className="text-emerald-300" size={20} />
                </div>
                <a
                  href="mailto:ahmadalghawi.86@gmail.com"
                  className="text-green-200 hover:text-green-100 transition-colors"
                >
                  ahmadalghawi.86@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 bg-emerald-700/30 backdrop-blur-sm border border-emerald-400/30 rounded-2xl flex items-center justify-center">
                  <Globe className="text-emerald-300" size={20} />
                </div>
                <a
                  href="https://ahmadalghawi.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-200 hover:text-green-100 transition-colors"
                >
                  ahmadalghawi.com
                </a>
              </div>
            </div>
          </div>
        </OrganicCard>
      </div>
    </section>
  );
};

// Navigation Footer Component
const ThemeNavigationFooter = () => (
  <motion.footer 
    className="bg-green-900/10 backdrop-blur-sm border-t border-green-400/20 pt-8 mt-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1 }}
  >
    <div className="max-w-6xl mx-auto px-6 text-center">
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <Link 
          href="/"
          className="text-green-200/80 hover:text-green-100 transition-colors text-sm font-medium underline hover:no-underline flex items-center gap-1"
        >
          <TreePine size={14} />
          Home
        </Link>
        <span className="text-green-400/40">•</span>
        <Link 
          href="/portfolio"
          className="text-green-200/80 hover:text-green-100 transition-colors text-sm font-medium underline hover:no-underline"
        >
          Developer Playground
        </Link>
        <span className="text-green-400/40">•</span>
        <Link 
          href="/vintage-newspaper"
          className="text-green-200/80 hover:text-green-100 transition-colors text-sm font-medium underline hover:no-underline"
        >
          Vintage Newspaper
        </Link>
        <span className="text-green-400/40">•</span>
        <Link 
          href="/art-deco"
          className="text-green-200/80 hover:text-green-100 transition-colors text-sm font-medium underline hover:no-underline"
        >
          Art Deco Classic
        </Link>
        <span className="text-green-400/40">•</span>
        <Link 
          href="/cyberpunk"
          className="text-green-200/80 hover:text-green-100 transition-colors text-sm font-medium underline hover:no-underline"
        >
          Cyberpunk Edition
        </Link>
        <span className="text-green-400/40">•</span>
        <Link 
          href="/watercolor"
          className="text-green-200/80 hover:text-green-100 transition-colors text-sm font-medium underline hover:no-underline"
        >
          Watercolor Artist
        </Link>
        <span className="text-green-400/40">•</span>
        <Link 
          href="/glassmorphism"
          className="text-green-300/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          Glassmorphism
        </Link>
        <span className="text-green-400/40">•</span>
        <Link 
          href="/ai-generator"
          className="text-green-300/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          AI Code Generator
        </Link>
      </div>
      <div className="text-xs text-green-300/60">
        <p> 2025 Ahmad Alghawi - Full Stack Developer</p>
        <p className="mt-1 italic flex items-center justify-center gap-2">
          <Leaf size={12} />
          "Growing Digital Dreams, Naturally"
          <Sprout size={12} />
        </p>
      </div>
    </div>
  </motion.footer>
);

export default function NaturePortfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <NatureLoading />;
  }

  return (
    <div className="min-h-screen relative">
      <NatureBackground />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection selectedProject={selectedProject} setSelectedProject={setSelectedProject} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter} />
      <ContactSection />
      <UniversalNavigation currentTheme="Nature/Organic" position="top-right" variant="light" />
      <ThemeNavigationFooter />
    </div>
  );
}
