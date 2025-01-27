'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import projectsData from '../data/projectsData';
import { useState } from 'react';
import { useXP } from '../context/XPContext';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    image: string;
    tag: string[];
    gitUrl: string;
    previewUrl: string;
  };
  index: number;
  isSelected: boolean;
}

const ProjectCard = ({ project, index, isSelected }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const { addXP } = useXP();

  // Easter egg: Double click animation
  const handleDoubleClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        addXP(500); // Bonus XP for finding easter egg
        return 0;
      }
      return newCount;
    });
  };

  return (
    <div 
      className="h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDoubleClick={handleDoubleClick}
    >
      <motion.div 
        className={`pixel-border bg-black p-4 relative overflow-hidden h-full flex flex-col transition-all duration-300 ${
          isSelected ? 'scale-105' : ''
        }`}
        whileHover={{ scale: 1.02 }}
        animate={isSelected ? {
          y: [0, -5, 0],
          transition: { duration: 2, repeat: Infinity }
        } : {}}
      >
        {/* Achievement Badge */}
        {clickCount > 0 && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-[#ff00ff] pixel-border-sm flex items-center justify-center z-10"
          >
            <span className="pixel-text text-xs text-white">{5 - clickCount}</span>
          </motion.div>
        )}

        {/* Project Image with Enhanced Effects */}
        <motion.div 
          className="relative h-48 mb-4 pixel-border-sm overflow-hidden"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className={`object-cover transition-transform duration-700 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Static Overlay */}
          <div className={`absolute inset-0 bg-noise-pattern opacity-[0.15] transition-opacity duration-300 ${
            isHovered ? 'opacity-[0.05]' : 'opacity-[0.15]'
          }`} />
          {/* New Hover Effect */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-[#ff00ff]/20 via-transparent to-[#00ff00]/20"
              style={{
                mixBlendMode: 'overlay',
                animation: 'gradient-shift 3s linear infinite'
              }}
            />
          )}
        </motion.div>

        {/* Project Info */}
        <div className="space-y-3 flex-grow">
          <h3 className={`text-xl pixel-text text-[#00ff00] line-clamp-1 transition-all duration-300 ${
            isHovered ? 'animate-glitch' : ''
          }`}>
            {project.title}
            {/* Blinking Cursor */}
            <span className={`inline-block w-2 h-5 ml-1 border-r-2 align-middle ${
              isHovered ? 'animate-blink' : 'opacity-0'
            }`} />
          </h3>
          <p className="text-sm text-gray-400 pixel-text leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tag.map((tag, i) => (
              <span
                key={tag}
                className={`px-2 py-1 text-xs pixel-text text-[#00ffff] pixel-border-sm bg-black/50 transition-all duration-300`}
                style={{
                  animation: isHovered ? `float 4s ease-in-out ${i * 0.2}s infinite` : 'none'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Project Links with Enhanced Glow */}
          <div className="flex gap-4 pt-4 mt-auto">
            <motion.a
              href={project.gitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative pixel-border-sm px-4 py-2 bg-[#ff00ff] text-white pixel-text text-sm hover:bg-[#ff00ff]/80 transition-all duration-300 flex-1 text-center group/btn overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 animate-pulse-fast bg-gradient-to-r from-[#ff00ff]/0 via-[#ff00ff]/50 to-[#ff00ff]/0" />
              </div>
              <span className="relative z-10 drop-shadow-glow-purple font-bold tracking-wider animate-glow-purple">
                View Code
              </span>
            </motion.a>
            <motion.a
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative pixel-border-sm px-4 py-2 bg-[#00ff00] text-black pixel-text text-sm hover:bg-[#00ff00]/80 transition-all duration-300 flex-1 text-center group/btn overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Inner Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 animate-pulse-fast bg-gradient-to-r from-[#00ff00]/0 via-[#00ff00]/50 to-[#00ff00]/0" />
              </div>
              <span className="relative z-10 drop-shadow-glow-green font-bold tracking-wider animate-glow-green">
                Live Demo
              </span>
            </motion.a>
          </div>
        </div>

        {/* Interactive Corner Decorations */}
        <motion.div
          className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#00ff00]"
          animate={isHovered ? { scale: [1, 1.5, 1], rotate: [0, 90, 0] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#00ff00]"
          animate={isHovered ? { scale: [1, 1.5, 1], rotate: [0, -90, 0] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#00ff00]"
          animate={isHovered ? { scale: [1, 1.5, 1], rotate: [0, 90, 0] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#00ff00]"
          animate={isHovered ? { scale: [1, 1.5, 1], rotate: [0, -90, 0] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />

        {/* Power-up Spawn Points */}
        {isSelected && (
          <>
            <motion.div
              className="absolute top-1/2 left-0 w-2 h-2 bg-[#ff00ff]"
              animate={{ x: ['0%', '2000%'], opacity: [1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/2 right-0 w-2 h-2 bg-[#00ff00]"
              animate={{ x: ['0%', '-2000%'], opacity: [1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All');
  const [isChanging, setIsChanging] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [comboMultiplier, setComboMultiplier] = useState(1);
  const [lastClickTime, setLastClickTime] = useState(0);
  const { addXP, incrementCombo, setPowerUp, powerUps } = useXP();

  const tabs = ['All', 'Web', 'Mobile'];

  const filteredProjects = projectsData.filter(project => 
    activeTab === 'All' ? true : project.tag.includes(activeTab)
  );

  // Enhanced XP system
  const handleTabClick = (tab: string) => {
    if (tab === activeTab) return;
    
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 400);
    
    // Update XP and combo with time-based multiplier
    const now = Date.now();
    if (now - lastClickTime < 2000) { // If clicked within 2 seconds
      setComboMultiplier(prev => Math.min(prev + 0.5, 3)); // Max 3x multiplier
    } else {
      setComboMultiplier(1);
    }
    setLastClickTime(now);

    incrementCombo();
    addXP(Math.floor(75 * comboMultiplier)); // Base 75 XP for tab changes

    setIsChanging(true);
    setActiveTab(tab);
    setTimeout(() => setIsChanging(false), 300);
  };

  const handleProjectClick = (projectId: string) => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 400);
    
    const now = Date.now();
    if (now - lastClickTime < 2000) {
      setComboMultiplier(prev => Math.min(prev + 0.5, 3));
    } else {
      setComboMultiplier(1);
    }
    setLastClickTime(now);

    setSelectedProject(prev => prev === projectId ? null : projectId);
    
    // Enhanced XP rewards
    incrementCombo();
    const baseXP = 200; // Increased base XP
    const comboBonus = Math.floor(baseXP * (comboMultiplier - 1));
    addXP(baseXP + comboBonus);

    // Increased power-up chance (30%)
    if (Math.random() < 0.3) {
      const powerUpTypes = Object.keys(powerUps);
      const randomPowerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
      setPowerUp(randomPowerUp);
    }
  };

  return (
    <section id="Projects" className={`py-20 bg-black relative overflow-hidden ${
      isClicking ? 'animate-screen-shake' : ''
    }`}>
      {/* CRT Screen Effect */}
      <div className="absolute inset-0 bg-noise-pattern opacity-[0.03] animate-noise pointer-events-none" />
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff00]/5 to-transparent pointer-events-none ${
        isClicking ? 'animate-distort' : 'animate-crt-flicker'
      }`} />

      <div className="container mx-auto px-4">
        {/* Title with player profile style */}
        <div className="pixel-border bg-black p-4 mb-12 inline-block">
          <h2 className="text-[#00ff00] text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-[#ff00ff]">[</span> PROJECTS <span className="text-[#ff00ff]">]</span>
          </h2>
          <div className="text-[#00ff00] text-sm mt-1 opacity-80">
            PROJECTS COMPLETED: 12 • BOSS FIGHTS WON: 8
          </div>
        </div>

        {/* Scan Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff00]/10 to-transparent ${
            isClicking ? 'animate-glitch-click' : 'animate-scan-line'
          }`} />
        </div>

        {/* Static Effect */}
        <div className={`absolute inset-0 opacity-[0.02] pointer-events-none ${
          isClicking ? 'animate-glitch-click' : 'animate-static'
        }`} />

        {/* Background Grid */}
        <div 
          className={`absolute inset-0 opacity-10 transition-transform duration-200 ${
            isClicking ? 'scale-[1.02]' : 'scale-100'
          }`}
          style={{
            backgroundImage: 'linear-gradient(#00ff00 1px, transparent 1px), linear-gradient(90deg, #00ff00 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        <div className="max-w-6xl mx-auto px-4 relative">
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`text-4xl font-bold mb-12 text-center pixel-text glitch-text relative ${
              isClicking ? 'animate-glitch-click' : 'animate-float'
            }`}
            data-text="Featured Projects"
          >
            Featured Projects
            <span className="inline-block w-4 h-8 ml-2 border-r-4 align-middle animate-blink" />
          </motion.h2>

          {/* Combo Multiplier Display */}
          {comboMultiplier > 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="fixed top-20 right-4 pixel-text text-[#ff00ff] bg-black/80 p-2 pixel-border-sm z-50"
            >
              {comboMultiplier.toFixed(1)}x Multiplier!
            </motion.div>
          )}

          {/* Filter Tabs with Enhanced Animation */}
          <div className="flex justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`pixel-border-sm px-6 py-2 pixel-text text-lg relative overflow-hidden transition-all duration-300 ${
                  activeTab === tab 
                    ? 'bg-[#00ff00] text-black animate-glow-green scale-110' 
                    : 'bg-black text-[#00ff00] hover:bg-[#00ff00]/10'
                }`}
                whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active Tab Indicator */}
                <div className={`absolute inset-0 ${
                  activeTab === tab 
                    ? 'animate-glitch opacity-50' 
                    : 'opacity-0'
                }`}>
                  <div className="absolute inset-0 bg-[#00ff00]/20" />
                </div>
                
                {/* Tab Text with Glow */}
                <span className={`relative z-10 ${
                  activeTab === tab 
                    ? 'drop-shadow-glow-green' 
                    : ''
                }`}>
                  {tab}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Project Grid with Enhanced Animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  onClick={() => handleProjectClick(project.id)}
                  className="cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, rotate: -5 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <ProjectCard 
                    project={project} 
                    index={index} 
                    isSelected={selectedProject === project.id} 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
