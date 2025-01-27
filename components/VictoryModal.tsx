'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import BossBattle from './BossBattle';

interface VictoryModalProps {
  isVisible: boolean;
  onReset: () => void;
  onClose: () => void;
  stats: {
    totalClicks: number;
    maxCombo: number;
    timePlayed: number;
  };
}

const VictoryModal = ({ isVisible, onReset, onClose, stats }: VictoryModalProps) => {
  const [showBossBattle, setShowBossBattle] = useState(false);

  // Format time into HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (showBossBattle) {
    return (
      <BossBattle
        onVictory={() => {
          setShowBossBattle(false);
          onClose();
        }}
        onClose={() => setShowBossBattle(false)}
      />
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/80"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="pixel-border p-8 bg-black relative overflow-hidden"
          >
            {/* Background effects */}
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-[#00ff00]"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10">
              <motion.h2
                className="text-[#00ff00] pixel-text text-4xl mb-6 text-center"
                animate={{
                  textShadow: [
                    "0 0 10px #00ff00",
                    "0 0 20px #00ff00",
                    "0 0 10px #00ff00"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                CONGRATULATIONS!
              </motion.h2>
              
              <motion.div
                className="text-[#00ff00] pixel-text text-xl text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <p className="mb-4">You have achieved mastery in all skills!</p>
                <p className="text-[#ffff00]">Now you have full experience.</p>
                <p className="text-[#00ffff] mt-4">Happy Coding! 🚀</p>
              </motion.div>

              {/* Stats Display */}
              <motion.div
                className="grid grid-cols-1 gap-4 mb-8 bg-black/50 p-4 pixel-border"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-[#ffff00] pixel-text text-xl mb-2 text-center">FINAL STATS</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-right text-[#00ff00] pixel-text">Total Clicks:</div>
                  <motion.div 
                    className="text-[#00ffff] pixel-text"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 1 }}
                  >
                    {stats.totalClicks}
                    {stats.totalClicks > 1000 && 
                      <motion.span 
                        className="ml-2 text-[#ffff00]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        🏆
                      </motion.span>
                    }
                  </motion.div>
                  
                  <div className="text-right text-[#00ff00] pixel-text">Max Combo:</div>
                  <motion.div 
                    className="text-[#00ffff] pixel-text"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 1.2 }}
                  >
                    x{stats.maxCombo}
                    {stats.maxCombo > 50 && 
                      <motion.span 
                        className="ml-2 text-[#ffff00]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        ⚡
                      </motion.span>
                    }
                  </motion.div>
                  
                  <div className="text-right text-[#00ff00] pixel-text">Time Played:</div>
                  <motion.div 
                    className="text-[#00ffff] pixel-text"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 1.4 }}
                  >
                    {formatTime(stats.timePlayed)}
                    {stats.timePlayed > 3600 && 
                      <motion.span 
                        className="ml-2 text-[#ffff00]"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        💻
                      </motion.span>
                    }
                  </motion.div>
                </div>

                <div className="text-center mt-4">
                  <motion.div
                    className="text-[#ffff00] pixel-text"
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    {getAchievementTitle(stats)}
                  </motion.div>
                </div>

                {/* Achievement Badges */}
                <motion.div 
                  className="grid grid-cols-3 gap-2 mt-4 justify-items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                >
                  {getAchievements(stats).map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      className="pixel-border p-2 bg-black/30"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 1.8 + index * 0.2 }}
                    >
                      <div className="text-center">
                        <motion.div
                          className="text-2xl"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {achievement.icon}
                        </motion.div>
                        <div className="text-[#00ff00] pixel-text text-xs mt-1">
                          {achievement.title}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Buttons */}
              <div className="flex justify-center gap-4">
                <motion.button
                  className="retro-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowBossBattle(true)}
                >
                  [CHALLENGE THE BOSS]
                </motion.button>

                <motion.button
                  className="retro-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onReset}
                >
                  [NEW GAME]
                </motion.button>

                <motion.button
                  className="retro-button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                >
                  [EXIT GAME]
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Helper functions for achievements
const getAchievementTitle = (stats: { totalClicks: number; maxCombo: number; timePlayed: number }) => {
  const titles = [];
  
  if (stats.totalClicks > 1000) titles.push("Master Clicker 🏆");
  if (stats.maxCombo > 50) titles.push("Combo Master ⚡");
  if (stats.timePlayed > 3600) titles.push("Dedicated Developer 💻");
  if (stats.totalClicks > 2000) titles.push("Click God 👑");
  if (stats.maxCombo > 100) titles.push("Combo Legend 🌟");
  
  if (titles.length >= 3) {
    return "Supreme Coding Master! 👑✨";
  } else if (titles.length >= 2) {
    return "Legendary Coder! 👑";
  } else if (titles.length === 1) {
    return titles[0];
  }
  return "Code Warrior! ⚔️";
};

const getAchievements = (stats: { totalClicks: number; maxCombo: number; timePlayed: number }) => {
  const achievements = [];

  // Click-based achievements
  if (stats.totalClicks > 2000) {
    achievements.push({
      title: "Click God",
      icon: "👑",
      description: "Over 2000 clicks"
    });
  }
  if (stats.totalClicks > 1000) {
    achievements.push({
      title: "Click Master",
      icon: "🎯",
      description: "Over 1000 clicks"
    });
  }
  if (stats.totalClicks > 500) {
    achievements.push({
      title: "Quick Fingers",
      icon: "👆",
      description: "500+ clicks"
    });
  }
  if (stats.totalClicks > 250) {
    achievements.push({
      title: "Click Apprentice",
      icon: "🎮",
      description: "250+ clicks"
    });
  }

  // Combo-based achievements
  if (stats.maxCombo > 100) {
    achievements.push({
      title: "Combo Legend",
      icon: "🌟",
      description: "100+ combo chain"
    });
  }
  if (stats.maxCombo > 50) {
    achievements.push({
      title: "Combo King",
      icon: "⚡",
      description: "50+ combo chain"
    });
  }
  if (stats.maxCombo > 25) {
    achievements.push({
      title: "Chain Master",
      icon: "🔗",
      description: "25+ combo chain"
    });
  }
  if (stats.maxCombo > 10) {
    achievements.push({
      title: "Combo Starter",
      icon: "✨",
      description: "10+ combo chain"
    });
  }

  // Time-based achievements
  if (stats.timePlayed > 7200) {
    achievements.push({
      title: "Code Veteran",
      icon: "🏆",
      description: "2+ hours played"
    });
  }
  if (stats.timePlayed > 3600) {
    achievements.push({
      title: "Time Lord",
      icon: "⌛",
      description: "1+ hour played"
    });
  }
  if (stats.timePlayed > 1800) {
    achievements.push({
      title: "Dedicated",
      icon: "🎮",
      description: "30+ mins played"
    });
  }
  if (stats.timePlayed > 600) {
    achievements.push({
      title: "Getting Started",
      icon: "🌱",
      description: "10+ mins played"
    });
  }

  // Special achievements
  if (stats.totalClicks > 1000 && stats.maxCombo > 50 && stats.timePlayed > 3600) {
    achievements.push({
      title: "Supreme Master",
      icon: "👨‍💻",
      description: "Achieved mastery in all areas"
    });
  }
  if (stats.maxCombo > stats.totalClicks * 0.1) {
    achievements.push({
      title: "Efficiency Expert",
      icon: "📊",
      description: "High combo to click ratio"
    });
  }
  if (stats.totalClicks / stats.timePlayed > 2) {
    achievements.push({
      title: "Speed Demon",
      icon: "⚡",
      description: "Super fast clicking"
    });
  }

  return achievements;
};

export default VictoryModal;
