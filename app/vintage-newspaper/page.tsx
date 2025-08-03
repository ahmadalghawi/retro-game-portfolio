'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import UniversalNavigation from '../../components/UniversalNavigation';
import { 
  Newspaper, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Github, 
  Award,
  Briefcase,
  Code,
  Star,
  Clock,
  Building,
  User,
  BookOpen,
  Coffee,
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

// Vintage Newspaper Components
const NewspaperHeader = () => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <motion.div 
      className="border-b-4 border-double border-gray-800 pb-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold text-gray-900 mb-2 font-serif tracking-wider"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          THE DEVELOPER TIMES
        </motion.h1>
        <motion.div 
          className="text-sm text-gray-600 mb-4 font-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex justify-between items-center max-w-4xl mx-auto">
            <span>EST. 2012</span>
            <span className="text-lg font-semibold">{formattedDate}</span>
            <span>PRICE: FREE</span>
          </div>
        </motion.div>
        <motion.div 
          className="text-xs text-gray-500 font-serif italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          "All the Code That's Fit to Print"
        </motion.div>
      </div>
    </motion.div>
  );
};

const NewspaperColumn = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`border-r border-gray-300 pr-6 mr-6 last:border-r-0 last:mr-0 last:pr-0 ${className}`}>
    {children}
  </div>
);

const HeadlineArticle = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.section 
      ref={ref}
      className="mb-12"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif leading-tight"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            LOCAL DEVELOPER REVOLUTIONIZES DIGITAL LANDSCAPE
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700 mb-6 font-serif leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="font-bold text-xl">MALMÖ, SWEDEN</span> - In a remarkable display of technical prowess and creative innovation, 
            Ahmad Alghawi, a distinguished Full-Stack Developer, continues to make waves in the digital development community. 
            With over a decade of experience spanning multiple technologies and platforms, Alghawi has established himself 
            as a formidable force in modern web and mobile development.
          </motion.p>
          <motion.p 
            className="text-base text-gray-600 font-serif leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Currently serving as a Full Stack Developer at Cognes in Stockholm, Alghawi is developing a revolutionary 
            mobile app and admin portal for early dementia detection using React Native (Expo), Firebase, and Next.js. 
            His recent freelance work includes building StramEnergi.dk (clean energy platform) and Syrexperts.com 
            (multilingual consultancy platform), showcasing his versatility across diverse industries.
          </motion.p>
        </div>
        
        <div className="space-y-6">
          <motion.div 
            className="bg-gray-100 p-6 border-2 border-gray-400"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <h3 className="font-bold text-lg mb-3 font-serif border-b border-gray-400 pb-2">DEVELOPER PROFILE</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span><strong>Name:</strong> Ahmad Alghawi</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span><strong>Location:</strong> Malmö, Sweden</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} />
                <span><strong>Position:</strong> Full Stack Developer</span>
              </div>
              <div className="flex items-center gap-2">
                <Building size={16} />
                <span><strong>Company:</strong> Cognes (Stockholm)</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span><strong>Experience:</strong> 2012 - Present</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span><strong>Phone:</strong> 073-742 14 90</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-yellow-50 p-4 border-2 border-yellow-400"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <h4 className="font-bold text-sm mb-2 font-serif">BREAKING NEWS</h4>
            <p className="text-xs font-serif">
              Developer successfully integrates cutting-edge AI tools including Cursor, Windsurf, ChatGPT, 
              and Bolt.new into development workflow, boosting productivity while delivering projects like 
              StramEnergi.dk and Syrexperts.com for international clients.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

const ExperienceSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.section 
      ref={ref}
      className="mb-12 border-t-2 border-gray-800 pt-8"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-gray-900 mb-6 font-serif text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        CAREER CHRONICLE: A DECADE OF DIGITAL EXCELLENCE
      </motion.h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        {experiences.map((exp, index) => (
          <motion.article 
            key={exp.id}
            className="bg-white border-2 border-gray-400 p-6 shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <div className="border-b border-gray-300 pb-3 mb-4">
              <h3 className="text-xl font-bold text-gray-900 font-serif">{exp.title}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <Building size={14} />
                  <span className="font-semibold">{exp.company}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{exp.period}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              {exp.description.map((desc, i) => (
                <p key={i} className="text-sm text-gray-700 font-serif leading-relaxed">
                  • {desc}
                </p>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                {exp.skills.slice(0, 4).map((skill, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 bg-gray-200 text-xs font-semibold text-gray-700 rounded"
                  >
                    {skill}
                  </span>
                ))}
                {exp.skills.length > 4 && (
                  <span className="px-2 py-1 bg-gray-300 text-xs font-semibold text-gray-600 rounded">
                    +{exp.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

const ProjectsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const featuredProjects = projectsData.slice(0, 6);

  return (
    <motion.section 
      ref={ref}
      className="mb-12 border-t-2 border-gray-800 pt-8"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-gray-900 mb-6 font-serif text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        PORTFOLIO GAZETTE: FEATURED DIGITAL WORKS
      </motion.h2>
      
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {['All', 'Web', 'Mobile'].map((filter) => (
          <button
            key={filter}
            onClick={() => setSelectedFilter(filter)}
            className={`px-6 py-3 font-serif transition-all duration-300 border-2 ${
              selectedFilter === filter
                ? 'bg-gray-800 text-white border-gray-800 shadow-lg'
                : 'bg-white text-gray-800 border-gray-400 hover:border-gray-600 hover:bg-gray-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {(selectedFilter === 'All' 
          ? projectsData 
          : projectsData.filter(project => project.tag.includes(selectedFilter))
        ).slice(0, 9).map((project, index) => (
          <motion.article 
            key={project.id}
            className="bg-white border border-gray-400 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onClick={() => setSelectedProject(project)}
          >
            <div className="p-4 border-b border-gray-300">
              <h3 className="text-lg font-bold text-gray-900 font-serif mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 font-serif leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1">
                  {project.tag.slice(0, 2).map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 bg-gray-100 text-xs font-semibold text-gray-600 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  {project.gitUrl && (
                    <a 
                      href={project.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} />
                    </a>
                  )}
                  {project.previewUrl && (
                    <a 
                      href={project.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto border-4 border-gray-800 shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b-2 border-gray-400">
                <h3 className="text-2xl font-bold text-gray-900 font-serif mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-gray-600 font-serif">
                  {selectedProject.description}
                </p>
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.tag.map((tag: string, i: number) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-gray-200 text-sm font-semibold text-gray-700 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4">
                  {selectedProject.gitUrl && (
                    <a 
                      href={selectedProject.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                    >
                      <Github size={16} />
                      View Code
                    </a>
                  )}
                  {selectedProject.previewUrl && (
                    <a 
                      href={selectedProject.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border-2 border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
              
              <div className="p-4 bg-gray-100 border-t border-gray-300">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full py-2 text-gray-600 hover:text-gray-800 font-serif"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

const SkillsSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  const skillCategories = [
    {
      title: "Frontend & Mobile",
      skills: ["React.js", "Next.js", "React Native (Expo)", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript", "Figma"]
    },
    {
      title: "Backend & Database",
      skills: ["Node.js (Express)", "Firebase", "MySQL", "API Development", "JWT", "Stripe", "Database Design"]
    },
    {
      title: "AI Tools & Platforms",
      skills: ["ChatGPT", "Cursor", "Windsurf", "Bolt.new", "Git/GitHub", "Jira", "Confluence", "Vercel"]
    }
  ];

  return (
    <motion.section 
      ref={ref}
      className="mb-12 border-t-2 border-gray-800 pt-8"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-gray-900 mb-6 font-serif text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        TECHNICAL EXPERTISE: TOOLS OF THE TRADE
      </motion.h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <motion.div 
            key={category.title}
            className="bg-gray-50 border-2 border-gray-400 p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <h3 className="text-xl font-bold text-gray-900 font-serif mb-4 border-b border-gray-300 pb-2">
              {category.title}
            </h3>
            <div className="space-y-2">
              {category.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                  <span className="text-sm font-serif text-gray-700">{skill}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

const ContactSection = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.section 
      ref={ref}
      className="mb-12 border-t-2 border-gray-800 pt-8"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <motion.h2 
        className="text-3xl font-bold text-gray-900 mb-6 font-serif text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        EDITORIAL CONTACT: GET IN TOUCH
      </motion.h2>
      
      <div className="max-w-4xl mx-auto">
        <motion.div 
          className="bg-gray-100 border-4 border-gray-800 p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900 font-serif mb-2">
              NEWSROOM HEADQUARTERS
            </h3>
            <p className="text-gray-600 font-serif">
              For interviews, collaborations, or development inquiries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <MapPin className="text-gray-600" size={20} />
                <span className="font-serif text-gray-800">Malmö, Sweden</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="text-gray-600" size={20} />
                <a 
                  href="mailto:ahmadalghawi.86@gmail.com"
                  className="font-serif text-gray-800 hover:text-gray-600 transition-colors underline"
                >
                  ahmadalghawi.86@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Phone className="text-gray-600" size={20} />
                <span className="font-serif text-gray-800">073-742 14 90</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <ExternalLink className="text-gray-600" size={20} />
                <a 
                  href="https://ahmadalghawi.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-serif text-gray-800 hover:text-gray-600 transition-colors underline"
                >
                  ahmadalghawi.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Github className="text-gray-600" size={20} />
                <a 
                  href="https://github.com/ahmadalghawi" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-serif text-gray-800 hover:text-gray-600 transition-colors underline"
                >
                  github.com/ahmadalghawi
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="text-gray-600" size={20} />
                <span className="font-serif text-gray-800">Available for Projects</span>
              </div>
            </div>
          </div>
          
          <motion.div 
            className="mt-8 pt-6 border-t border-gray-400"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p className="text-sm text-gray-500 font-serif italic">
              "Ready to bring your digital vision to life with cutting-edge technology and creative solutions"
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const NewspaperFooter = () => (
  <motion.footer 
    className="border-t-4 border-double border-gray-800 pt-6 mt-12"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1 }}
  >
    <div className="text-center">
      <div className="flex justify-center items-center gap-4 mb-4">
        <Link 
          href="/"
          className="text-gray-600 hover:text-gray-900 transition-colors font-serif text-sm underline"
        >
          Return to Main Edition
        </Link>
        <span className="text-gray-400">|</span>
        <Link 
          href="/portfolio"
          className="text-gray-600 hover:text-gray-900 transition-colors font-serif text-sm underline"
        >
          Developer Playground
        </Link>
        <span className="text-gray-400">|</span>
        <Link 
          href="/art-deco"
          className="text-gray-600 hover:text-gray-900 transition-colors font-serif text-sm underline"
        >
          Art Deco Classic
        </Link>
        <span className="text-gray-400">|</span>
        <Link 
          href="/cyberpunk"
          className="text-gray-600 hover:text-gray-900 transition-colors font-serif text-sm underline"
        >
          Cyberpunk Edition
        </Link>
        <span className="text-gray-400">|</span>
        <Link 
          href="/watercolor"
          className="text-gray-600 hover:text-gray-900 transition-colors font-serif text-sm underline"
        >
          Watercolor Artist
        </Link>
        <span className="text-gray-400">|</span>
        <Link 
          href="/glassmorphism"
          className="text-gray-600 hover:text-gray-900 transition-colors font-serif text-sm underline"
        >
          Glassmorphism
        </Link>
        <span className="text-gray-400">|</span>
        <Link 
          href="/nature"
          className="text-amber-700 hover:text-amber-600 transition-colors text-sm font-serif underline hover:no-underline"
        >
          Nature/Organic
        </Link>
        <span className="text-amber-600/40">•</span>
        <Link 
          href="/ai-generator"
          className="text-amber-700 hover:text-amber-600 transition-colors text-sm font-serif underline hover:no-underline"
        >
          AI Code Generator
        </Link>
      </div>
      <div className="text-xs text-gray-500 font-serif">
        <p> 2025 The Developer Times. All rights reserved.</p>
        <p className="mt-1 italic">"Printing Tomorrow's Technology Today"</p>
      </div>
    </div>
  </motion.footer>
);

// Loading Component
const NewspaperLoading = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <motion.div
      className="text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="mb-6"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        <Newspaper size={64} className="text-gray-800 mx-auto" />
      </motion.div>
      <h2 className="text-2xl font-bold text-gray-900 font-serif mb-4">
        PRINTING LATEST EDITION...
      </h2>
      <div className="flex justify-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-gray-800 rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
          />
        ))}
      </div>
    </motion.div>
  </div>
);

// Main Component
const VintageNewspaperPortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <NewspaperLoading />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <NewspaperHeader />
        <HeadlineArticle />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
        <UniversalNavigation currentTheme="Vintage Newspaper" position="top-right" variant="light" />
        <NewspaperFooter />
      </div>
    </div>
  );
};

export default VintageNewspaperPortfolio;
