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
  const achievements = getAchievements(stats);
  const title = getAchievementTitle(stats);

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
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-gray-900 p-8 rounded-lg pixel-border-lg max-w-2xl w-full mx-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{
              type: "spring",
              damping: 15,
              stiffness: 100,
              duration: 0.8
            }}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Stars */}
              {[...Array(20)].map((_, i) => (
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
                    repeat: -1,
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
                  repeat: -1,
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
                {title}
              </motion.div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {/* Time */}
                <motion.div
                  className="bg-black/50 p-4 rounded pixel-border"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 100,
                    delay: 0.2
                  }}
                >
                  <div className="text-[#00ff00] text-center">
                    <motion.div 
                      className="text-4xl mb-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 0.5,
                        repeat: -1,
                      }}
                    >
                      ⏱️
                    </motion.div>
                    <div className="text-sm">Time</div>
                    <div className="text-2xl">{Math.floor(stats.timePlayed / 60)}:{(stats.timePlayed % 60).toString().padStart(2, '0')}</div>
                  </div>
                </motion.div>

                {/* Clicks */}
                <motion.div
                  className="bg-black/50 p-4 rounded pixel-border"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 100,
                    delay: 0.3
                  }}
                >
                  <div className="text-[#00ff00] text-center">
                    <motion.div 
                      className="text-4xl mb-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 0.5,
                        repeat: -1,
                      }}
                    >
                      🖱️
                    </motion.div>
                    <div className="text-sm">Clicks</div>
                    <div className="text-2xl">{stats.totalClicks}</div>
                  </div>
                </motion.div>

                {/* Max Combo */}
                <motion.div
                  className="bg-black/50 p-4 rounded pixel-border"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 100,
                    delay: 0.4
                  }}
                >
                  <div className="text-[#00ff00] text-center">
                    <motion.div 
                      className="text-4xl mb-2"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 0.5,
                        repeat: -1,
                      }}
                    >
                      🔥
                    </motion.div>
                    <div className="text-sm">Max Combo</div>
                    <div className="text-2xl">{stats.maxCombo}x</div>
                  </div>
                </motion.div>
              </div>

              {/* Achievements */}
              <div className="space-y-4 mb-8">
                <h3 className="text-[#00ff00] text-xl mb-4 text-center">Achievements Unlocked</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      className="bg-black/50 p-4 rounded pixel-border flex items-center space-x-4"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        type: "spring",
                        damping: 15,
                        stiffness: 100,
                        delay: 0.5 + index * 0.1,
                        duration: 0.5
                      }}
                    >
                      <motion.div
                        className="text-4xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                          duration: 2,
                          repeat: -1,
                          delay: index * 0.2
                        }}
                      >
                        {achievement.icon}
                      </motion.div>
                      <div>
                        <div className="text-[#00ff00] font-bold">{achievement.title}</div>
                        <div className="text-[#00ff00]/80 text-sm">{achievement.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <motion.button
                  className="pixel-btn"
                  onClick={onReset}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Again
                </motion.button>
                <motion.button
                  className="pixel-btn pixel-btn-primary"
                  onClick={() => setShowBossBattle(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Challenge Boss
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
function getAchievementTitle(stats: { totalClicks: number; maxCombo: number; timePlayed: number }) {
  if (stats.maxCombo >= 50) return "Legendary Combo Master!";
  if (stats.maxCombo >= 30) return "Elite Combo Warrior!";
  if (stats.maxCombo >= 20) return "Skilled Combo Fighter!";
  if (stats.totalClicks >= 1000) return "Dedicated Clicker!";
  if (stats.totalClicks >= 500) return "Persistent Clicker!";
  return "Victory Achieved!";
}

function getAchievements(stats: { totalClicks: number; maxCombo: number; timePlayed: number }) {
  const achievements = [];

  // Click-based achievements
  if (stats.totalClicks >= 100) {
    achievements.push({
      icon: "🖱️",
      title: "Click Novice",
      description: "Reached 100 clicks"
    });
  }
  if (stats.totalClicks >= 500) {
    achievements.push({
      icon: "⚡",
      title: "Click Warrior",
      description: "Reached 500 clicks"
    });
  }
  if (stats.totalClicks >= 1000) {
    achievements.push({
      icon: "🎯",
      title: "Click Master",
      description: "Reached 1000 clicks"
    });
  }

  // Combo-based achievements
  if (stats.maxCombo >= 10) {
    achievements.push({
      icon: "🔥",
      title: "Combo Starter",
      description: "Reached 10x combo"
    });
  }
  if (stats.maxCombo >= 20) {
    achievements.push({
      icon: "⚔️",
      title: "Combo Fighter",
      description: "Reached 20x combo"
    });
  }
  if (stats.maxCombo >= 30) {
    achievements.push({
      icon: "🌟",
      title: "Combo Warrior",
      description: "Reached 30x combo"
    });
  }
  if (stats.maxCombo >= 50) {
    achievements.push({
      icon: "👑",
      title: "Combo Legend",
      description: "Reached 50x combo"
    });
  }

  // Time-based achievements
  if (stats.timePlayed >= 60) {
    achievements.push({
      icon: "⏱️",
      title: "Dedicated Player",
      description: "Played for 1 minute"
    });
  }
  if (stats.timePlayed >= 180) {
    achievements.push({
      icon: "🏆",
      title: "Endurance Master",
      description: "Played for 3 minutes"
    });
  }

  return achievements;
}

export default VictoryModal;
