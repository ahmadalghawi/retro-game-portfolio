'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import UniversalNavigation from '../../components/UniversalNavigation';
import { useInView } from 'react-intersection-observer';
import {
  Star,
  Award,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Github,
  Calendar,
  User,
  Target,
  Zap,
  Heart,
  Coffee,
  Rocket
} from 'lucide-react';
import { experiences } from '../../data/experienceData';
import projectsData from '../../data/projectsData';

// Art Deco Classic Theme
const ArtDecoPortfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const [heroRef, heroInView] = useInView({ threshold: 0.3 });
  const [aboutRef, aboutInView] = useInView({ threshold: 0.3 });
  const [skillsRef, skillsInView] = useInView({ threshold: 0.3 });
  const [experienceRef, experienceInView] = useInView({ threshold: 0.3 });
  const [projectsRef, projectsInView] = useInView({ threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ threshold: 0.3 });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
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

  // Art Deco Loading Animation
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Star className="text-amber-600 animate-pulse" size={48} />
            </div>
          </div>
          <TypeAnimation
            sequence={[
              'Welcome to the Golden Age...',
              1000,
              'Crafting Elegant Experiences...',
              1000,
              'Art Deco Portfolio Loading...',
              1000,
              'Sophistication Awaits...',
              500
            ]}
            wrapper="div"
            className="text-amber-800 text-2xl font-serif"
            cursor={true}
            repeat={0}
          />
        </motion.div>
      </div>
    );
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Art Deco Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-amber-900 to-orange-900 shadow-2xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <Star className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-amber-100">Ahmad Al-Ghawi</h1>
                <p className="text-amber-300 text-sm">Art Deco Portfolio</p>
              </div>
            </motion.div>
            
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'skills', label: 'Skills' },
                { id: 'experience', label: 'Experience' },
                { id: 'projects', label: 'Projects' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-300 font-serif ${
                    activeSection === item.id
                      ? 'bg-amber-600 text-white shadow-lg'
                      : 'text-amber-200 hover:text-white hover:bg-amber-700'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Link
              href="/"
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors font-serif"
            >
              Main Site
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" ref={heroRef} className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            {/* Art Deco Decorative Header */}
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
                <div className="mx-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Star className="text-white" size={32} />
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
              </div>
            </div>

            <h1 className="text-6xl md:text-8xl font-serif font-bold text-amber-900 mb-6">
              <TypeAnimation
                sequence={['Ahmad Al-Ghawi', 2000]}
                wrapper="span"
                cursor={false}
                repeat={0}
              />
            </h1>
            
            <div className="text-2xl md:text-3xl text-amber-700 mb-8 font-serif italic">
              Full Stack Developer & Digital Craftsman
            </div>

            <div className="max-w-2xl mx-auto text-lg text-amber-800 mb-12 leading-relaxed">
              Crafting elegant digital experiences with the precision of a master artisan. 
              Specializing in modern web technologies while maintaining timeless design principles.
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-lg shadow-xl transition-all duration-300 font-serif text-lg"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white px-8 py-4 rounded-lg transition-all duration-300 font-serif text-lg"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-12">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
                <h2 className="text-4xl font-serif font-bold text-amber-900 mx-8">About Me</h2>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left">
                <p className="text-lg text-amber-800 mb-6 leading-relaxed font-serif">
                  Welcome to my digital atelier. I am Ahmad Al-Ghawi, a full-stack developer who believes 
                  in the marriage of functionality and beauty. Currently crafting innovative solutions at 
                  Cognes, where I specialize in React Native, Expo, and AI-powered applications.
                </p>
                <p className="text-lg text-amber-800 mb-6 leading-relaxed font-serif">
                  With over 5 years of experience in the digital realm, I approach each project with 
                  the meticulous attention to detail reminiscent of the Art Deco masters, ensuring 
                  every line of code serves both purpose and aesthetic.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-amber-200 px-4 py-2 rounded-lg">
                    <span className="text-amber-800 font-serif">React & Next.js</span>
                  </div>
                  <div className="bg-amber-200 px-4 py-2 rounded-lg">
                    <span className="text-amber-800 font-serif">Node.js & Express</span>
                  </div>
                  <div className="bg-amber-200 px-4 py-2 rounded-lg">
                    <span className="text-amber-800 font-serif">React Native</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                  <User className="text-white" size={120} />
                </div>
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
                  <Star className="text-white" size={24} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" ref={skillsRef} className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={skillsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
                <h2 className="text-4xl font-serif font-bold text-amber-900 mx-8">Expertise</h2>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Frontend Mastery',
                  icon: <Zap className="text-amber-600" size={32} />,
                  skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
                },
                {
                  title: 'Backend Excellence',
                  icon: <Target className="text-amber-600" size={32} />,
                  skills: ['Node.js', 'Express.js', 'MySQL', 'MongoDB', 'RESTful APIs']
                },
                {
                  title: 'Mobile Innovation',
                  icon: <Rocket className="text-amber-600" size={32} />,
                  skills: ['React Native', 'Expo', 'Cross-platform', 'Mobile UI/UX']
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={skillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-lg p-8 shadow-xl border border-amber-200"
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-serif font-bold text-amber-900">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.skills.map((skill) => (
                      <div key={skill} className="bg-amber-50 px-4 py-2 rounded-lg text-center">
                        <span className="text-amber-800 font-serif">{skill}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" ref={experienceRef} className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
                <h2 className="text-4xl font-serif font-bold text-amber-900 mx-8">Experience</h2>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
              </div>
            </div>

            <div className="space-y-8">
              {experiences.slice(0, 3).map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={experienceInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="bg-white rounded-lg p-8 shadow-xl border border-amber-200"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Briefcase className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">{exp.title}</h3>
                      <h4 className="text-lg text-amber-700 mb-2">{exp.company}</h4>
                      <p className="text-amber-600 mb-4 font-serif italic">{exp.period}</p>
                      <div className="space-y-2">
                        {exp.description.slice(0, 2).map((desc, i) => (
                          <p key={i} className="text-amber-800 leading-relaxed">• {desc}</p>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.skills.slice(0, 4).map((skill) => (
                          <span key={skill} className="bg-amber-200 text-amber-800 px-3 py-1 rounded-full text-sm font-serif">
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
      <section id="projects" ref={projectsRef} className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
                <h2 className="text-4xl font-serif font-bold text-amber-900 mx-8">Portfolio</h2>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
              </div>
              
              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {['All', 'Web', 'Mobile'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-6 py-3 rounded-lg font-serif transition-all duration-300 ${
                      selectedFilter === filter
                        ? 'bg-amber-600 text-white shadow-lg transform scale-105'
                        : 'bg-white text-amber-700 border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50'
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
                  className="bg-white rounded-lg overflow-hidden shadow-xl border border-amber-200 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="h-48 bg-gradient-to-br from-amber-400 to-orange-500 relative overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                          // Fallback to gradient with star if image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            parent.innerHTML = '<div class="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"><svg class="text-white" width="48" height="48" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>';
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <Star className="text-white" size={48} />
                      </div>
                    )}
                    {/* Art Deco overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-amber-900 mb-3">{project.title}</h3>
                    <p className="text-amber-800 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tag.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="bg-amber-100 text-amber-700 px-2 py-1 rounded text-sm font-serif">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <a
                        href={project.gitUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-600 hover:text-amber-800 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </a>
                      {project.previewUrl && (
                        <a
                          href={project.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-800 transition-colors"
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
      <section id="contact" ref={contactRef} className="py-20 bg-gradient-to-r from-amber-100 to-orange-100">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
                <h2 className="text-4xl font-serif font-bold text-amber-900 mx-8">Get In Touch</h2>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent flex-1"></div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-12 shadow-2xl border border-amber-200">
              <p className="text-xl text-amber-800 mb-8 font-serif leading-relaxed">
                Ready to create something extraordinary together? Let's discuss your next project 
                and bring your digital vision to life with elegance and precision.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-white" size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-amber-900 mb-2">Email</h3>
                  <p className="text-amber-700">ahmadalghawi.86@gmail.com</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Github className="text-white" size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-amber-900 mb-2">GitHub</h3>
                  <p className="text-amber-700">@ahmadalghawi</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <h3 className="font-serif font-bold text-amber-900 mb-2">Location</h3>
                  <p className="text-amber-700">Sweden</p>
                </div>
              </div>

              <a
                href="/data/Rsume.pdf"
                download
                className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-8 py-4 rounded-lg shadow-xl transition-all duration-300 font-serif text-lg"
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
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-lg p-8 max-w-2xl w-full border-2 border-amber-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-serif font-bold text-amber-900 mb-4">{selectedProject.title}</h3>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-white" size={24} />
                </div>
              </div>
              <p className="text-amber-800 mb-6 leading-relaxed">{selectedProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {selectedProject.tag.map((tag: string) => (
                  <span key={tag} className="bg-amber-100 text-amber-700 px-3 py-2 rounded-lg font-serif">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 justify-center">
                <a
                  href={selectedProject.gitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-serif"
                >
                  <Github size={20} />
                  View Code
                </a>
                {selectedProject.previewUrl && selectedProject.previewUrl !== selectedProject.gitUrl && (
                  <a
                    href={selectedProject.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors font-serif"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="border-2 border-amber-600 text-amber-700 hover:bg-amber-600 hover:text-white px-6 py-3 rounded-lg transition-colors font-serif"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Universal Navigation */}
      <UniversalNavigation currentTheme="Art Deco Classic" position="bottom-right" variant="light" />
      
      {/* Navigation Footer */}
      <ThemeNavigationFooter />
    </div>
  );
};

// Navigation Footer Component
const ThemeNavigationFooter = () => (
  <motion.footer 
    className="border-t-2 border-amber-600 bg-gradient-to-r from-amber-50 to-yellow-50 pt-8 mt-16"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 1 }}
  >
    <div className="max-w-6xl mx-auto px-6 text-center">
      <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
        <Link 
          href="/"
          className="text-amber-700 hover:text-amber-900 transition-colors text-sm font-serif underline hover:no-underline"
        >
          ← Return Home
        </Link>
        <span className="text-amber-400">•</span>
        <Link 
          href="/ai-generator"
          className="text-amber-300/80 hover:text-white transition-colors text-sm font-medium underline hover:no-underline"
        >
          AI Code Generator
        </Link>
        <span className="text-amber-400">•</span>
        <Link 
          href="/portfolio"
          className="text-amber-700 hover:text-amber-900 transition-colors text-sm font-serif underline hover:no-underline"
        >
          Developer Playground
        </Link>
        <span className="text-amber-400">•</span>
        <Link 
          href="/vintage-newspaper"
          className="text-amber-700 hover:text-amber-900 transition-colors text-sm font-serif underline hover:no-underline"
        >
          Vintage Newspaper
        </Link>
        <span className="text-amber-400">•</span>
        <Link 
          href="/cyberpunk"
          className="text-amber-700 hover:text-amber-900 transition-colors text-sm font-serif underline hover:no-underline"
        >
          Cyberpunk Edition
        </Link>
        <span className="text-amber-400">•</span>
        <Link 
          href="/watercolor"
          className="text-amber-700 hover:text-amber-900 transition-colors text-sm font-serif underline hover:no-underline"
        >
          Watercolor Artist
        </Link>
        <span className="text-amber-400">•</span>
        <Link 
          href="/glassmorphism"
          className="text-amber-700 hover:text-amber-900 transition-colors text-sm font-serif underline hover:no-underline"
        >
          Glassmorphism
        </Link>
        <span className="text-amber-400">•</span>
        <Link 
          href="/nature"
          className="text-amber-700 hover:text-amber-900 transition-colors text-sm font-serif underline hover:no-underline"
        >
          Nature/Organic
        </Link>
      </div>
      <div className="text-xs text-amber-600 font-serif">
        <p>© 2025 Ahmad Alghawi - Full Stack Developer</p>
        <p className="mt-1 italic">"Crafting Digital Elegance with Timeless Style"</p>
      </div>
    </div>
  </motion.footer>
);

export default ArtDecoPortfolio;
