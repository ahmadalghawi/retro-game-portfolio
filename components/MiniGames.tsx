'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useXP } from '../context/XPContext';
import MemoryGame from './games/MemoryGame';
import SnakeGame from './games/SnakeGame';
import CodeTypingGame from './games/CodeTypingGame';
import styles from './MiniGames.module.css';

// Achievement definitions
const ACHIEVEMENTS = [
  {
    id: 'memory_master',
    title: 'Memory Master',
    description: 'Complete the Memory Game with a perfect streak',
    icon: '🧠',
    xp: 500,
    rarity: 'rare'
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Achieve 100+ WPM in the Typing Game',
    icon: '⚡',
    xp: 1000,
    rarity: 'epic'
  },
  {
    id: 'snake_charmer',
    title: 'Snake Charmer',
    description: 'Score 50+ points in Snake Game',
    icon: '🐍',
    xp: 750,
    rarity: 'rare'
  },
  {
    id: 'arcade_champion',
    title: 'Arcade Champion',
    description: 'Earn achievements in all games',
    icon: '👑',
    xp: 2000,
    rarity: 'legendary'
  }
];

const MiniGames = () => {
  const { addXP } = useXP();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [achievements, setAchievements] = useState<Set<string>>(new Set());
  const [showAchievement, setShowAchievement] = useState<typeof ACHIEVEMENTS[0] | null>(null);

  const games = [
    {
      id: 'memory',
      title: 'Tech Stack Memory',
      description: 'Match pairs of tech stack cards to earn XP!',
      icon: '🎴',
      difficulty: 'Easy'
    },
    {
      id: 'snake',
      title: 'Code Snake',
      description: 'Guide the snake to collect code snippets!',
      icon: '🐍',
      difficulty: 'Medium'
    },
    {
      id: 'typing',
      title: 'Speed Typing',
      description: 'Test your coding speed with real snippets!',
      icon: '⌨️',
      difficulty: 'Hard'
    }
  ];

  const checkAchievements = (gameId: string, score: number) => {
    const newAchievements: typeof ACHIEVEMENTS[0][] = [];

    if (gameId === 'memory' && score >= 1000) {
      newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'memory_master')!);
    }
    if (gameId === 'typing' && score >= 1000) {
      newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'speed_demon')!);
    }
    if (gameId === 'snake' && score >= 500) {
      newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'snake_charmer')!);
    }

    // Check for Arcade Champion
    if (achievements.size >= ACHIEVEMENTS.length - 1) {
      newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'arcade_champion')!);
    }

    newAchievements.forEach(achievement => {
      if (!achievements.has(achievement.id)) {
        setAchievements(prev => new Set([...prev, achievement.id]));
        setShowAchievement(achievement);
        addXP(achievement.xp);
        setTimeout(() => setShowAchievement(null), 3000);
      }
    });
  };

  const handleScoreUpdate = (points: number) => {
    addXP(points);
    setScore(prev => prev + points);
    if (activeGame) {
      checkAchievements(activeGame, points);
    }
  };

  const handleGameComplete = () => {
    setGameCompleted(true);
  };

  

  return (
    <section id="MiniGames" className="py-32 bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Simple Gradient Background */}
        <div 
          className={`absolute inset-0 ${styles.gradientBackground}`}
        />

        {/* Subtle Grid Pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            opacity: 0.3
          }}
        />

        {/* Simple Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-[#00ff00]"
              style={{
                left: `${Math.random() * 100}%`,
                opacity: 0.3
              }}
              animate={{
                y: ['-20vh', '120vh']
              }}
              transition={{
                duration: 10,
                delay: i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        {/* Scanlines Effect (simplified) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.1) 0px, rgba(0,0,0,0.1) 1px, transparent 2px, transparent 4px)',
            backgroundSize: '100% 4px',
            opacity: 0.2
          }}
        />

        
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="pixel-border bg-black p-4 mb-12 inline-block">
          <h2 className="text-[#00ff00] text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-[#ff00ff]">[</span> ARCADE ZONE <span className="text-[#ff00ff]">]</span>
          </h2>
          <div className="text-[#00ff00] text-sm mt-1 opacity-80">
            GAMES AVAILABLE: {games.length} • HIGH SCORE: {score}
          </div>
        </div>

        {/* Game Selection */}
        {!activeGame && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {games.map(game => (
              <motion.div
                key={game.id}
                className="pixel-border p-6 cursor-pointer bg-black hover:bg-[#00ff00]/10"
                whileHover={{ scale: 1.02 }}
                onClick={() => setActiveGame(game.id)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{game.icon}</span>
                  <div>
                    <h3 className="text-[#00ff00] text-xl">{game.title}</h3>
                    <span className={`text-sm ${
                      game.difficulty === 'Easy' ? 'text-[#00ff00]' :
                      game.difficulty === 'Medium' ? 'text-[#ffff00]' :
                      'text-[#ff0000]'
                    }`}>
                      {game.difficulty}
                    </span>
                  </div>
                </div>
                <p className="text-[#00ff00]/80">{game.description}</p>
              </motion.div>
            ))}
          </div>
        )}
        {/* Retro Game Elements */}
        {/* {retroElements.map(element => (
          <motion.div
            key={element.id}
            className="absolute text-2xl"
            initial={{ 
              x: element.direction === 'left' ? "100vw" : "-100px",
              y: `${element.y}%`,
              opacity: 0
            }}
            animate={{
              x: element.direction === 'left' ? "-100px" : "100vw",
              y: [
                `${element.y}%`,
                `${element.y + Math.random() * 10 - 5}%`,
                `${element.y}%`
              ],
              opacity: [0, 1, 1, 0]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {getRetroContent(element.type)}
          </motion.div>
        ))} */}
        {/* Achievement Gallery */}
        {!activeGame && (
          <div className="mb-20">
            <div className="pixel-border bg-black p-4 mb-8 inline-block">
              <h3 className="text-[#00ff00] text-xl">
                <span className="text-[#ff00ff]">&lt;</span> ACHIEVEMENTS <span className="text-[#ff00ff]">&gt;</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ACHIEVEMENTS.map(achievement => (
                <motion.div
                  key={achievement.id}
                  className={`pixel-border p-4 bg-black ${
                    achievements.has(achievement.id) ? 'opacity-100' : 'opacity-40'
                  }`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{achievement.icon}</span>
                    <div>
                      <h4 className="text-[#00ff00] text-lg">{achievement.title}</h4>
                      <span className={`text-sm ${
                        achievement.rarity === 'legendary' ? 'text-[#ff00ff]' :
                        achievement.rarity === 'epic' ? 'text-[#ff8800]' :
                        'text-[#ffff00]'
                      }`}>
                        {achievement.rarity.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <p className="text-[#00ff00]/80 text-sm">{achievement.description}</p>
                  <div className="mt-2 text-[#00ff00]/60 text-sm">
                    +{achievement.xp} XP
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Active Game */}
        <AnimatePresence mode="wait">
          {activeGame && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {activeGame === 'memory' && (
                <MemoryGame 
                  onScoreUpdate={handleScoreUpdate}
                  onGameComplete={handleGameComplete}
                />
              )}
              {activeGame === 'snake' && (
                <SnakeGame 
                  onScoreUpdate={handleScoreUpdate}
                  onGameComplete={handleGameComplete}
                />
              )}
              {activeGame === 'typing' && (
                <CodeTypingGame 
                  onScoreUpdate={handleScoreUpdate}
                  onGameComplete={handleGameComplete}
                />
              )}

              {/* Back Button */}
              <motion.button
                className="mt-8 pixel-border-sm px-6 py-2 bg-[#00ff00]/20 text-[#00ff00] hover:bg-[#00ff00]/30"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setActiveGame(null);
                  setGameCompleted(false);
                }}
              >
                Return to Arcade
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Achievement Popup */}
        <AnimatePresence>
          {showAchievement && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="fixed bottom-8 right-8 z-50"
            >
              <div className="pixel-border bg-black p-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{showAchievement.icon}</span>
                  <div>
                    <h4 className="text-[#00ff00] text-lg">Achievement Unlocked!</h4>
                    <p className="text-[#00ff00]/80">{showAchievement.title}</p>
                    <span className="text-[#00ff00]/60">+{showAchievement.xp} XP</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Complete Popup */}
        <AnimatePresence>
          {gameCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
            >
              <div className="bg-black pixel-border p-8 text-center">
                <h3 className="text-[#00ff00] text-2xl mb-4">Game Complete!</h3>
                <p className="text-[#00ff00] mb-4">Score: {score}</p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => {
                      setGameCompleted(false);
                      setActiveGame(null);
                    }}
                    className="pixel-border-sm px-6 py-2 bg-[#00ff00]/20 text-[#00ff00] hover:bg-[#00ff00]/30"
                  >
                    Return to Arcade
                  </button>
                  <button
                    onClick={() => {
                      setGameCompleted(false);
                    }}
                    className="pixel-border-sm px-6 py-2 bg-[#00ff00]/20 text-[#00ff00] hover:bg-[#00ff00]/30"
                  >
                    Play Again
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MiniGames;
