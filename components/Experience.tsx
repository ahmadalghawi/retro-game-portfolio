'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { experiences } from '../data/experienceData';
import { useXP } from '../context/XPContext';

type CollectibleType = 'xp' | 'powerup' | 'star';

interface Collectible {
  id: number;
  x: number;
  y: number;
  type: CollectibleType;
}

const Experience = () => {
  const [selectedExp, setSelectedExp] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [collectibles, setCollectibles] = useState<Collectible[]>([]);
  const [portalActive, setPortalActive] = useState(false);
  const { addXP, incrementCombo, setPowerUp, powerUps, powerUp, combo } = useXP();

  useEffect(() => {
    if (showTutorial) {
      const timer = setTimeout(() => setShowTutorial(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showTutorial]);

  const handleExpClick = (id: string) => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 400);
    
    setSelectedExp(prev => prev === id ? null : id);
    
    // Update XP and combo
    incrementCombo();
    addXP(100);

    // Random chance to trigger power-up (20%)
    if (Math.random() < 0.2) {
      const powerUpTypes = Object.keys(powerUps) as Array<keyof typeof powerUps>;
      const randomPowerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
      setPowerUp(randomPowerUp);
    }
  };

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Spawn collectibles randomly
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance to spawn
        const newCollectible: { id: number; x: number; y: number; type: "xp" | "powerup" | "star" } = {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          type: (Math.random() < 0.6 ? 'xp' : Math.random() < 0.8 ? 'powerup' : 'star') as CollectibleType
        };
        setCollectibles(prev => [...prev.slice(-5), newCollectible]); // Keep max 6 collectibles
      }
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, []);

  // Handle collectible collection
  const handleCollectibleClick = (collectible: Collectible) => {
    setCollectibles(prev => prev.filter(c => c.id !== collectible.id));
    
    switch (collectible.type) {
      case 'xp':
        addXP(100);
        incrementCombo();
        break;
      case 'powerup':
        const powerUpTypes = Object.keys(powerUps) as Array<keyof typeof powerUps>;
        const randomPowerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
        setPowerUp(randomPowerUp);
        break;
      case 'star':
        addXP(250);
        incrementCombo();
        setPortalActive(true);
        setTimeout(() => setPortalActive(false), 3000);
        break;
    }
  };

  return (
    <section id="Experience" className={`py-20 bg-black relative overflow-hidden ${
      isClicking ? 'animate-screen-shake' : ''
    }`}>
      {/* Interactive Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Mouse Trail */}
        <div className="pointer-events-none">
          {collectibles.map((collectible) => (
            <motion.div
              key={collectible.id}
              className={`absolute cursor-pointer ${
                collectible.type === 'xp' 
                  ? 'w-4 h-4 bg-[#00ff00]' 
                  : collectible.type === 'powerup'
                  ? 'w-6 h-6 bg-[#ff00ff]'
                  : 'w-5 h-5 bg-[#ffff00]'
              } pixel-border-sm`}
              style={{ left: collectible.x, top: collectible.y }}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: 360,
                y: [0, -10, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              onClick={() => handleCollectibleClick(collectible)}
              whileHover={{ scale: 1.5 }}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 animate-pulse-fast ${
                collectible.type === 'xp' 
                  ? 'bg-[#00ff00]/30' 
                  : collectible.type === 'powerup'
                  ? 'bg-[#ff00ff]/30'
                  : 'bg-[#ffff00]/30'
              }`} />
            </motion.div>
          ))}
        </div>
          
        {/* Interactive Portal */}
        {portalActive && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 2, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <div className="relative">
              <motion.div
                className="absolute w-40 h-40 rounded-full border-4 border-[#00ff00]"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div
                className="absolute w-40 h-40 rounded-full border-4 border-[#ff00ff]"
                animate={{ rotate: -360, scale: [1.2, 1, 1.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Portal Rays */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-20 bg-gradient-to-t from-[#00ff00] to-transparent"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 45}deg)`,
                    transformOrigin: 'center bottom',
                  }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.7, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Mouse-reactive Energy Field */}
        <motion.div
          className="absolute w-[200vw] h-[200vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background: `radial-gradient(circle ${isClicking ? '100px' : '50px'} at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(0, 255, 0, 0.1), 
              transparent
            )`
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        {/* Title with player profile style */}
        <div className="pixel-border bg-black p-4 mb-16 inline-block">
          <h2 className="text-[#00ff00] text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-[#ff00ff]">[</span> QUEST LOG <span className="text-[#ff00ff]">]</span>
          </h2>
          <div className="text-[#00ff00] text-sm mt-1 opacity-80">
            COMPLETED QUESTS: 15 • REPUTATION: LEGENDARY
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className={`text-4xl font-bold mb-20 text-center pixel-text glitch-text relative ${
            isClicking ? 'animate-glitch-click' : 'animate-float'
          }`}
          data-text="Quest Log: Career Journey"
        >
          Quest Log: Career Journey
          <span className="inline-block w-4 h-8 ml-2 border-r-4 align-middle animate-blink" />
        </motion.h2>
      </div>
        <div className="max-w-6xl mx-auto relative">
          {/* Quest Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Floating Quest Markers */}
            <motion.div
              className="absolute w-6 h-6 border-2 border-[#00ff00] rotate-45"
              animate={{
                y: [0, -700],
                x: [0, 100],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ left: '10%', top: '100%' }}
            />
            <motion.div
              className="absolute w-6 h-6 border-2 border-[#ff00ff] rotate-45"
              animate={{
                y: [0, -700],
                x: [0, -150],
                opacity: [0, 1, 0],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
                delay: 2
              }}
              style={{ left: '90%', top: '100%' }}
            />

            {/* Quest Path Lines */}
            <motion.div
              className="absolute w-[200%] h-0.5 bg-gradient-to-r from-transparent via-[#00ff00]/20 to-transparent"
              animate={{
                y: [0, -700],
                rotate: 25,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ left: '-50%', top: '100%' }}
            />
            <motion.div
              className="absolute w-[200%] h-0.5 bg-gradient-to-r from-transparent via-[#ff00ff]/20 to-transparent"
              animate={{
                y: [0, -700],
                rotate: -25,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
                delay: 5
              }}
              style={{ left: '-50%', top: '100%' }}
            />

            {/* Quest Stars */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-[#ffff00]"
                animate={{
                  y: [0, -700],
                  x: [0, Math.random() * 200 - 100],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 10 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                  delay: Math.random() * 10
                }}
                style={{ 
                  left: Math.random() * 100 + '%', 
                  top: '100%',
                  filter: 'blur(1px)'
                }}
              />
            ))}

            {/* Quest Portals */}
            <motion.div
              className="absolute w-20 h-20 rounded-full border-4 border-[#00ff00]"
              animate={{
                scale: [0, 2],
                opacity: [0.5, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ left: '10%', top: '20%' }}
            />
            <motion.div
              className="absolute w-20 h-20 rounded-full border-4 border-[#ff00ff]"
              animate={{
                scale: [0, 2],
                opacity: [0.5, 0],
                rotate: [0, -360],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear",
                delay: 2.5
              }}
              style={{ right: '10%', top: '60%' }}
            />

            {/* Level Up Effects */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-40 bg-gradient-to-t from-transparent via-[#00ff00] to-transparent"
                animate={{
                  y: [0, -200],
                  opacity: [0, 1, 0],
                  scaleY: [1, 2, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 1.5
                }}
                style={{ 
                  left: 20 + i * 30 + '%', 
                  top: '100%',
                  filter: 'blur(2px)'
                }}
              />
            ))}

            {/* Quest Compass Points */}
            {[0, 90, 180, 270].map((rotation, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-8 bg-gradient-to-t from-[#00ff00] to-transparent"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: i * 0.5
                }}
                style={{ 
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${rotation}deg)`,
                  transformOrigin: 'center bottom',
                }}
              />
            ))}

            {/* Quest Energy Field */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff00]/5 to-transparent"
              animate={{
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 h-full w-1 bg-[#00ff00]/30 transform -translate-x-1/2" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:ml-auto'} md:w-1/2`}
            >
              {/* Timeline Node */}
              <div 
                className={`absolute left-0 md:left-auto ${
                  index % 2 === 0 ? 'md:right-0' : 'md:left-0'
                } w-4 h-4 transform -translate-x-1/2 md:translate-x-1/2 bg-[#00ff00] pixel-border-sm ${
                  selectedExp === exp.id ? 'animate-pulse-fast' : ''
                }`}
                style={{ top: '2rem' }}
              />

              {/* Experience Card */}
              <motion.div
                onClick={() => handleExpClick(exp.id)}
                className={`pixel-border bg-black p-6 cursor-pointer relative overflow-hidden transition-all duration-300 group ${
                  selectedExp === exp.id ? 'scale-105' : 'hover:scale-[1.02]'
                } ${selectedExp === exp.id ? 'animate-glitch-click' : ''}`}
              >
                {/* Clickable Indicator */}
                <div className="absolute -top-1 -right-1 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute inset-0 animate-pulse-fast">
                    <div className="w-2 h-2 bg-[#00ff00] absolute top-0 right-0" />
                    <div className="w-2 h-2 bg-[#00ff00] absolute top-0 left-0" />
                    <div className="w-2 h-2 bg-[#00ff00] absolute bottom-0 right-0" />
                    <div className="w-2 h-2 bg-[#00ff00] absolute bottom-0 left-0" />
                  </div>
                </div>

                {/* Click Prompt */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pixel-text text-[#00ff00] text-sm whitespace-nowrap">
                  Click to Expand!
                </div>

                {/* Level Indicator */}
                <div className="absolute top-2 right-2 pixel-text text-sm text-[#00ff00]">
                  LVL {exp.level}
                </div>

                {/* Company Logo/Icon */}
                <div className={`w-12 h-12 mb-4 pixel-border-sm bg-[#00ff00]/10 ${
                  index % 2 === 0 ? 'ml-auto' : ''
                }`}>
                  <div className="w-full h-full bg-noise-pattern animate-noise opacity-50" />
                </div>

                {/* Title & Company */}
                <h3 className={`text-xl pixel-text mb-2 ${
                  selectedExp === exp.id ? 'text-[#ff00ff] animate-glitch' : 'text-[#00ff00]'
                }`}>
                  {exp.title}
                </h3>
                <div className="text-[#00ff00] pixel-text mb-2">{exp.company}</div>
                <div className="text-[#00ff00]/70 pixel-text text-sm mb-4">{exp.period}</div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {exp.skills.map(skill => (
                    <span
                      key={skill}
                      className={`px-2 py-1 text-xs pixel-border-sm ${
                        selectedExp === exp.id 
                          ? 'bg-[#ff00ff]/20 text-[#ff00ff]' 
                          : 'bg-[#00ff00]/10 text-[#00ff00]'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Achievements Counter */}
                <div className="text-sm pixel-text text-[#00ff00]/70">
                  Achievements: {exp.achievements}
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {selectedExp === exp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-2"
                    >
                      {exp.description.map((desc, i) => (
                        <motion.p
                          key={i}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-[#00ff00]/90 pixel-text text-sm"
                        >
                          → {desc}
                        </motion.p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Click Effect Overlay */}
                {selectedExp === exp.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff00ff]/0 via-[#ff00ff]/20 to-[#ff00ff]/0 animate-pulse-fast pointer-events-none" />
                )}

                {/* Power-up Spawn Point */}
                {Math.random() < 0.1 && !selectedExp && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <motion.div
                      animate={{ y: [-10, 10], scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-8 h-8 bg-[#ffff00]/20 pixel-border-sm animate-pulse-fast"
                    />
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tutorial Popup */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-black pixel-border p-6 max-w-sm"
          >
            <h3 className="text-[#00ff00] pixel-text text-xl mb-4">How to Play</h3>
            <ul className="space-y-2 text-[#00ff00] pixel-text">
              <li>→ Click cards to reveal details</li>
              <li>→ Chain clicks for combos</li>
              <li>→ Collect power-ups</li>
              <li>→ Earn XP and level up!</li>
            </ul>
            <button
              onClick={() => setShowTutorial(false)}
              className="mt-4 px-4 py-2 bg-[#00ff00]/20 text-[#00ff00] pixel-border-sm hover:bg-[#00ff00]/30 pixel-text"
            >
              Got it!
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Combo Counter */}
      {combo > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="pixel-text text-[#ff00ff] text-xl bg-black/80 p-2 pixel-border-sm fixed top-4 right-4 z-40"
        >
          {combo}x Combo!
          {combo >= 3 && (
            <div className="text-sm">+{Math.floor(combo / 3) * 50} Bonus XP!</div>
          )}
        </motion.div>
      )}

      {/* Active Power-up */}
      {powerUp && (
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          exit={{ x: 100 }}
          className="pixel-text bg-black/80 p-2 pixel-border-sm fixed top-4 right-4 z-40"
          style={{ color: powerUps[powerUp as keyof typeof powerUps].color }}
        >
          {powerUps[powerUp as keyof typeof powerUps].name} Active!
        </motion.div>
      )}

      {/* Retro Effects */}
      <div className="absolute inset-0 bg-noise-pattern opacity-[0.03] animate-noise pointer-events-none" />
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff00]/5 to-transparent pointer-events-none ${
        isClicking ? 'animate-distort' : 'animate-crt-flicker'
      }`} />
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-[#00ff00]/10 to-transparent ${
          isClicking ? 'animate-glitch-click' : 'animate-scan-line'
        }`} />
      </div>
    </section>
  );
};

export default Experience;
