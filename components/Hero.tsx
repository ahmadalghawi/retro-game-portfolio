'use client';

import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { useState, useEffect } from 'react';
import GameInterface from './GameInterface';
import ContactInterface from './ContactInterface';
import RetroBackground from './RetroBackground';
import { useXP } from '../context/XPContext';

const programmingJokes = [
  { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs!" },
  { setup: "Why do Java developers wear glasses?", punchline: "Because they don't C#!" },
  { setup: "What's a programmer's favorite place?", punchline: "Foo Bar!" },
  { setup: "Why was the JavaScript developer sad?", punchline: "Because he didn't Node how to Express himself!" },
  { setup: "Why do programmers always mix up Halloween and Christmas?", punchline: "Because Oct 31 == Dec 25!" },
  { setup: "Why did the developer go broke?", punchline: "Because he used up all his cache!" },
  { setup: "What's a programmer's favorite hangout spot?", punchline: "The Foo Bar!" },
  { setup: "Why do programmers hate nature?", punchline: "It has too many bugs!" },
  { setup: "What's a Git expert's favorite beverage?", punchline: "Branch water!" },
  { setup: "Why did the React component feel lost?", punchline: "Because it didn't know its state!" },
  { setup: "Why do programmers prefer using Windows?", punchline: "Because they know how to crash!" },
  { setup: "Why do programmers have a favorite coffee mug?", punchline: "Because it's a constant!" },
  { setup: "Why did the programmer quit his job?", punchline: "Because he didn't get arrays!" },
  { setup: "Why is the programmer's keyboard always broke?", punchline: "Because it's always getting pressed!" },
  { setup: "Why did the programmer go to the gym?", punchline: "To pump up his code!" },
  { setup: "Why did the programmer get kicked out of the bar?", punchline: "Because he was making too many null references!" },
  { setup: "Why did the programmer go to the doctor?", punchline: "Because he had a virus!" },
  { setup: "Why do programmers prefer dark mode?", punchline: "Because light attracts bugs!" },
  { setup: "Why do programmers prefer using Windows?", punchline: "Because they know how to crash!" },
  { setup: "Why did the programmer quit his job?", punchline: "Because he didn't get arrays!" },
  { setup: "Why is the programmer's keyboard always broke?", punchline: "Because it's always getting pressed!" },
  { setup: "Why did the programmer go to the gym?", punchline: "To pump up his code!" },
  { setup: "Why did the programmer get kicked out of the bar?", punchline: "Because he was making too many null references!" },
  { setup: "Why did the programmer go to the doctor?", punchline: "Because he had a virus!" },
]

const Hero = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string | null>(null);
  const [showGame, setShowGame] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(programmingJokes[0]);
  const [showJoke, setShowJoke] = useState(false);
  const [showPunchline, setShowPunchline] = useState(false);
  const [isPlanePaused, setIsPlanePaused] = useState(false);
  const planeX = useMotionValue("100%");
  const [currentX, setCurrentX] = useState("100%");

  // Show/hide scroll to top button based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'about', label: 'ABOUT', icon: '👨‍🚀', color: '#00fd00', xp: 100, section: 'AboutMe' },
    { id: 'skills', label: 'SKILLS', icon: '🛠️', color: '#00fd00', xp: 150, section: 'Skills' },
    { id: 'experience', label: 'QUESTS', icon: '⚔️', color: '#00fd00', xp: 200, section: 'Experience' },
    { id: 'projects', label: 'MISSIONS', icon: '🚀', color: '#00fd00', xp: 250, section: 'Projects' },
    { id: 'games', label: 'ARCADE', icon: '🎮', color: '#00fd00', xp: 300, section: 'MiniGames' },
    { id: 'achievements', label: 'TROPHIES', icon: '🏆', color: '#00fd00', xp: 350, section: 'AchievementGallery' },
  ];

  const handleNavClick = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLinkClick = (id: string) => {
    setSelectedLink(id);
    const link = navLinks.find(l => l.id === id);
    if (link) {
      const element = document.getElementById(link.section);
      if (element) {
        const headerOffset = 80; // Adjust this value based on your header height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Add XP and increment combo
        addXP(link.xp);
        incrementCombo();
      }
    }
    
    setTimeout(() => {
      setSelectedLink(null);
      setIsNavOpen(false);
    }, 1000);
  };

  const startGame = () => {
    setShowGame(true);
  };

  const startContact = () => {
    setShowContact(true);
  };

  const downloadCV = () => {
    // Using the public URL of the PDF
    const link = document.createElement('a');
    link.href = '/data/Rsume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const { addXP, incrementCombo } = useXP();

  const startPlaneAnimation = () => {
    setCurrentX("-100%");
  };

  useEffect(() => {
    startPlaneAnimation();
  }, []);

  return (
    <div className="h-screen w-full relative bg-black overflow-hidden">
      {/* Animated background */}
      <RetroBackground />
      
      {/* Scanlines effect */}
      <div className="scanlines"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-4 pixel-border p-8 bg-black/80 backdrop-blur-sm">
          <motion.h1 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold mb-4 glitch-text pixel-text"
            data-text="Ahmad Alghawi"
          >
            Ahmad Alghawi
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl md:text-2xl text-[#00ff00] mb-8 pixel-text"
          >
            Fullstack Developer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex flex-col md:flex-row justify-center gap-4"
          >
            <button 
              className="retro-button"
              onClick={startGame}
            >
              START GAME
            </button>
            <button 
              className="retro-button"
              onClick={startContact}
            >
              CONTACT
            </button>
            <button 
              className="retro-button"
              onClick={downloadCV}
            >
              DOWNLOAD CV
            </button>
          </motion.div>
        </div>
      </div>

      {/* Decorative corner elements */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#00ff00]"></div>
      <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#00ff00]"></div>
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#00ff00]"></div>
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#00ff00]"></div>

      {/* 16-bit Moon/Sun Navigation */}
      <div className="relative flex flex-col items-center mt-32">
        <motion.div
          className="cursor-pointer"
          onClick={handleNavClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            rotate: isNavOpen ? 360 : 0,
            scale: isNavOpen ? 1.1 : 1
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.5 }
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {/* Main Orb */}
            <div className="relative w-32 h-32">
              {/* Base Circle */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#1a472a] to-[#2d6a4f]" />
              
              {/* Pixel Art Face */}
              <div className="absolute inset-2 rounded-full bg-[#00fd00]">
                {/* Pixel Details - 16-bit style face */}
                <div className="absolute inset-0">
                  {/* Left Eye */}
                  <motion.div 
                    className="absolute top-[35%] left-[30%] w-3 h-3 bg-[#1a472a]"
                    animate={isNavOpen ? {
                      clipPath: ['polygon(0 50%, 100% 50%, 100% 50%, 0 50%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)']
                    } : {}}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Right Eye */}
                  <motion.div 
                    className="absolute top-[35%] right-[30%] w-3 h-3 bg-[#1a472a]"
                    animate={isNavOpen ? {
                      clipPath: ['polygon(0 50%, 100% 50%, 100% 50%, 0 50%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)']
                    } : {}}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Smile */}
                  <motion.div 
                    className="absolute top-[55%] left-[35%] right-[35%] h-1 bg-[#1a472a]"
                    animate={isNavOpen ? {
                      height: 3,
                      borderRadius: '0 0 4px 4px'
                    } : {}}
                  />
                </div>
              </div>

              {/* Pixel Art Rays - Shows when active */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-8 h-2 bg-[#50fa7b] origin-left"
                  style={{
                    rotate: `${i * 45}deg`,
                    translateY: '-50%',
                  }}
                  animate={isNavOpen ? {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  } : { scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}

              {/* Pixel Craters/Details */}
              <div className="absolute inset-4">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#2d6a4f]"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${20 + Math.random() * 60}%`,
                    }}
                    animate={isNavOpen ? {
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0.8, 0.5]
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                ))}
              </div>

              {/* Glowing Effect */}
              <motion.div
                className="absolute -inset-4 rounded-full"
                animate={{
                  boxShadow: isNavOpen 
                    ? ['0 0 20px #50fa7b', '0 0 40px #50fa7b', '0 0 20px #50fa7b']
                    : ['0 0 10px #50fa7b', '0 0 20px #50fa7b', '0 0 10px #50fa7b']
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </div>

          {/* Status Text */}
          <motion.div
            className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold tracking-widest"
            animate={{ 
              color: isNavOpen ? '#50fa7b' : '#2d6a4f',
              textShadow: isNavOpen ? '0 0 8px #50fa7b' : '0 0 8px #2d6a4f'
            }}
          >
           
          </motion.div>
        </motion.div>

        {/* Navigation Menu */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                transition: {
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }
              }}
              exit={{ 
                opacity: 0,
                scale: 0.8,
                y: -20,
                transition: { duration: 0.3 }
              }}
            >
              <div className="bg-[#1a472a]/90 backdrop-blur-sm pixel-border p-4 relative overflow-hidden">
                {/* Menu Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-[#50fa7b]/10 to-transparent"
                  animate={{
                    x: ['100%', '-100%']
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                <div className="flex gap-4 justify-center relative">
                  {navLinks.map((link, index) => (
                    <motion.button
                      key={link.id}
                      className={`group relative px-6 py-3 text-sm pixel-border-sm
                        ${selectedLink === link.id ? 'bg-[#50fa7b]/20' : 'hover:bg-[#50fa7b]/10'}`}
                      onClick={() => handleLinkClick(link.id)}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: {
                          duration: 0.3,
                          delay: index * 0.1,
                          type: "spring",
                          stiffness: 100
                        }
                      }}
                      whileHover={{ 
                        scale: 1.1,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-2xl transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                          {link.icon}
                        </span>
                        <span className="text-xs font-bold tracking-wider">{link.label}</span>
                      </div>
                      
                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100"
                        initial={false}
                        animate={{
                          background: [
                            'radial-gradient(circle at center, rgba(80,250,123,0.1) 0%, transparent 70%)',
                            'radial-gradient(circle at center, rgba(80,250,123,0.2) 0%, transparent 70%)'
                          ]
                        }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      
                      {/* Selection Indicator */}
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#50fa7b]"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: selectedLink === link.id ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-8 right-8 w-12 h-12 bg-black border-2 border-[#00fd00] text-[#00fd00] z-50 pixel-border-sm cursor-pointer hover:bg-[#00fd00]/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-full h-full">
                {/* Pixel Art Arrow */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-b-[12px] border-b-[#00fd00] border-r-[8px] border-r-transparent transform -translate-y-1" />
                </div>
                {/* Pixel Details */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-[#00fd00] transform translate-y-2" />
              </div>
            </motion.button>
          )}
        </AnimatePresence>

        {/* Animated Plane with Banner */}
        <div className="absolute top-32 left-0 right-0 h-20 overflow-visible pointer-events-none z-[25]">
          <motion.div
            className="relative w-full"
            initial={{ x: "100%" }}
            animate={{ x: currentX }}
            style={{ x: planeX }}
            transition={{
              duration: isPlanePaused ? 0 : 10,
              ease: "linear",
              repeat: isPlanePaused ? 0 : Infinity,
              repeatDelay: 0
            }}
            onUpdate={(latest) => {
              planeX.set(String(latest.x));
            }}
          >
            <div 
              className="absolute right-0 flex items-center cursor-pointer pointer-events-auto group"
              onClick={() => {
                if (!isPlanePaused) {
                  // Stop the plane at current position
                  setIsPlanePaused(true);
                  const currentPosition = planeX.get();
                  setCurrentX(currentPosition);
                  
                  // Show joke
                  const randomJoke = programmingJokes[Math.floor(Math.random() * programmingJokes.length)];
                  setCurrentJoke(randomJoke);
                  setShowJoke(true);
                  setShowPunchline(false);
                  
                  // Show punchline after 2 seconds
                  setTimeout(() => setShowPunchline(true), 2000);
                  
                  // Resume after 5 seconds
                  setTimeout(() => {
                    setShowJoke(false);
                    setIsPlanePaused(false);
                    setCurrentX("-100%");
                  }, 5000);
                }
              }}
            >
              {/* Retro Pixel Plane */}
              <div className={`relative w-20 h-20 text-[#00fd00] transform transition-transform ${isPlanePaused ? 'scale-110' : 'group-hover:scale-110'}`}>
                {/* Plane Shadow */}
                <div className="absolute top-1/2 left-1/2 w-12 h-4 bg-current/20 transform -translate-x-1/2 translate-y-4 blur-sm" />
                {/* Plane Body */}
                <div className="absolute top-1/2 left-1/2 w-16 h-6 bg-current transform -translate-x-1/2 -translate-y-1/2" />
                {/* Wings */}
                <div className="absolute top-1/2 left-1/2 w-6 h-12 bg-current transform -translate-x-1/2 -translate-y-1/2" />
                {/* Tail */}
                <div className="absolute top-1/4 right-0 w-4 h-8 bg-current" />
                {/* Propeller */}
                <motion.div
                  className="absolute -left-1 top-1/2 w-6 h-2 bg-current transform -translate-y-1/2 origin-right"
                  animate={{ rotate: isPlanePaused ? 0 : [0, 360] }}
                  transition={{ duration: 0.1, repeat: Infinity, ease: "linear" }}
                />
                {/* Window */}
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-black transform -translate-x-0 -translate-y-1/2 rounded-full" />
              </div>
              
              {/* Banner */}
              <div className="relative">
                {/* Banner Rope */}
                <div className="absolute -left-2 top-1/2 w-4 h-0.5 bg-[#00fd00] transform -translate-y-1/2" />
                {/* Banner Content */}
                <div className="ml-2 px-6 py-3 bg-black/90 text-[#00fd00] pixel-border-sm whitespace-nowrap transform group-hover:scale-105 transition-transform">
                  <span className="text-sm font-bold tracking-wider">Click for a programmer joke! 🎯</span>
                </div>
              </div>

              {/* Joke Speech Bubble */}
              <AnimatePresence>
                {showJoke && (
                  <motion.div
                    className="absolute -top-40 -left-20 bg-black/95 p-4 pixel-border-sm text-[#00fd00] min-w-[250px] max-w-[300px]"
                    initial={{ scale: 0, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0, opacity: 0, y: 20 }}
                  >
                    {/* Speech Bubble Triangle */}
                    <div className="absolute bottom-0 left-24 transform translate-y-[8px]">
                      <div className="w-0 h-0 border-l-[8px] border-l-transparent border-t-[8px] border-t-[#00fd00] border-r-[8px] border-r-transparent" />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <p className="text-sm">{currentJoke.setup}</p>
                      <AnimatePresence>
                        {showPunchline && (
                          <motion.p
                            className="text-base font-bold mt-2 text-[#00fd00]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                          >
                            {currentJoke.punchline}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>

        {/* XP System */}
        <AnimatePresence>
          {showGame && <GameInterface onClose={() => setShowGame(false)} />}
          {showContact && <ContactInterface onClose={() => setShowContact(false)} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Hero;
