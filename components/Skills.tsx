'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useXP } from '../context/XPContext';
import GlitchBackground from './GlitchBackground';

interface Skill {
  name: string;
  level: number;
  color: string;
  xp: number;
}

const skills: Skill[] = [
  { name: 'React', level: 90, color: '#61DAFB', xp: 2500 },
  { name: 'Next.js', level: 75, color: '#000000', xp: 2000 },
  { name: 'TypeScript', level: 65, color: '#007ACC', xp: 1800 },
  { name: 'Node.js', level: 85, color: '#339933', xp: 2200 },
  { name: 'MYSQL', level: 85, color: '#47A248', xp: 1500 },
  { name: 'React Native', level: 65, color: '#4479A1', xp: 1900 },
  { name: 'Firebase', level: 70, color: '#FF9900', xp: 1200 },
  { name: 'Figma', level: 75, color: '#2496ED', xp: 1600 },
];

export default function Skills() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isClicking, setIsClicking] = useState(false);
  const { addXP, incrementCombo, setPowerUp, powerUps, combo } = useXP();

  const calculateLevel = (xp: number) => {
    return Math.floor(xp / 500) + 1;
  };

  const handleSkillClick = (skill: Skill) => {
    setIsClicking(true);
    setTimeout(() => setIsClicking(false), 400);
    
    setSelectedSkill(skill);
    
    // Update XP and combo
    incrementCombo();
    addXP(75); // Less XP than experience section

    // Random chance to trigger power-up (25%)
    if (Math.random() < 0.25) {
      const powerUpTypes = Object.keys(powerUps) as Array<keyof typeof powerUps>;
      const randomPowerUp = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
      setPowerUp(randomPowerUp);
    }
  };

  return (
    <section id="Skills" className="py-20 bg-black relative overflow-hidden">
      {/* Title with player profile style */}
      <div className="container mx-auto px-4">
        <div className="pixel-border bg-black p-4 mb-12 inline-block">
          <h2 className="text-[#00ff00] text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-[#ff00ff]">[</span> SKILL TREE <span className="text-[#ff00ff]">]</span>
          </h2>
          <div className="text-[#00ff00] text-sm mt-1 opacity-80">
            MASTERY LEVEL: 99 • SKILL POINTS: MAX
          </div>
        </div>
        {/* Glitch Background */}
        <GlitchBackground />
        
        <div className="relative z-10">
          <motion.h2
            initial={{ y: -50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className={`text-4xl font-bold mb-12 text-center pixel-text glitch-text relative ${
              isClicking ? 'animate-glitch-click' : 'animate-float'
            }`}
            data-text="Skills & Technologies"
          >
            Skills & Technologies
          </motion.h2>

          {/* Combo Counter */}
          {combo > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute top-4 right-4 pixel-text text-[#00ff00] text-2xl animate-glitch"
            >
              Combo x{combo}!
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative max-w-6xl mx-auto">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative group cursor-pointer ${
                  selectedSkill?.name === skill.name ? 'animate-glitch-click' : ''
                }`}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onClick={() => handleSkillClick(skill)}
              >
                <div className={`pixel-border p-6 bg-black hover:bg-gray-900 transition-colors ${
                  selectedSkill?.name === skill.name ? 'scale-105' : 'hover:scale-[1.02]'
                }`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[#00ff00] pixel-text text-lg">{skill.name}</span>
                    <span className="text-[#00ff00] pixel-text">LVL {calculateLevel(skill.xp)}</span>
                  </div>
                  
                  {/* Main skill bar */}
                  <div className="h-6 bg-gray-900 relative pixel-border-sm overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      className="h-full relative"
                      style={{ 
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                      }}
                    />
                    {/* Power level indicator */}
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-white pixel-text text-sm">
                      {skill.level}%
                    </div>
                  </div>

                  {/* XP Bar */}
                  <div className="flex items-center justify-between text-xs pixel-text">
                    <div className="text-[#ff00ff]">
                      XP: {skill.xp % 500}/500
                    </div>
                    <div className="w-32 h-2 bg-gray-900 relative pixel-border-sm">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(skill.xp % 500) / 500 * 100}%` }}
                        viewport={{ once: true }}
                        className="h-full bg-[#ff00ff]"
                      />
                    </div>
                  </div>
                </div>

                {/* Hover effect - skill info */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: hoveredSkill === skill.name ? 1 : 0,
                    scale: hoveredSkill === skill.name ? 1 : 0.8
                  }}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 transform translate-x-full w-48 pixel-border p-3 bg-black hidden md:block"
                >
                  <p className="text-[#00ff00] pixel-text text-sm mb-2">Total XP: {skill.xp}</p>
                  <p className="text-[#00ff00] pixel-text text-sm">Next Level: {500 - (skill.xp % 500)} XP</p>
                </motion.div>

                {/* Click Effect Overlay */}
                {selectedSkill?.name === skill.name && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#ff00ff]/0 via-[#ff00ff]/20 to-[#ff00ff]/0 animate-pulse-fast" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Skill Details Modal */}
          {selectedSkill && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
              onClick={() => setSelectedSkill(null)}
            >
              <GlitchBackground />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="pixel-border p-8 bg-black/90 max-w-md w-full m-4 relative z-10"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-2xl text-[#00ff00] pixel-text mb-6 glitch-text-sm" data-text={selectedSkill.name}>
                  {selectedSkill.name}
                </h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[#00ff00] pixel-text mb-2">Power Level</p>
                    <div className="h-8 bg-gray-900 relative pixel-border-sm">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedSkill.level}%` }}
                        className="h-full"
                        style={{ 
                          background: `linear-gradient(90deg, ${selectedSkill.color}, ${selectedSkill.color}dd)`
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-end px-2">
                        <span className="text-white pixel-text">{selectedSkill.level}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#00ff00] pixel-text mb-2">Experience</p>
                    <div className="bg-gray-900 pixel-border-sm p-4">
                      <p className="text-[#ff00ff] pixel-text mb-2">Level {calculateLevel(selectedSkill.xp)}</p>
                      <p className="text-[#ff00ff] pixel-text mb-2">Total XP: {selectedSkill.xp}</p>
                      <p className="text-[#ff00ff] pixel-text">Next Level: {500 - (selectedSkill.xp % 500)} XP</p>
                    </div>
                  </div>
                  <button
                    className="retro-button w-full mt-4"
                    onClick={() => setSelectedSkill(null)}
                  >
                    [CLOSE]
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Decorative corner elements */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#00ff00]"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#00ff00]"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#00ff00]"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#00ff00]"></div>
        </div>
      </div>
    </section>
  );
};
