'use client';
import { motion } from 'framer-motion';

interface BossVictoryModalProps {
  stats: {
    timePassed: number;
    maxCombo: number;
    totalClicks: number;
    damageDealt: number;
  };
  onClose: () => void;
}

const BossVictoryModal = ({ stats, onClose }: BossVictoryModalProps) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative bg-gray-900 p-8 rounded-lg pixel-border"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          damping: 15,
          duration: 0.8
        }}
      >
        {/* Victory Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Fireworks */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2"
              initial={{
                top: "50%",
                left: "50%",
              }}
              animate={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: [1, 0],
              }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                repeat: Infinity,
                repeatDelay: 2
              }}
              style={{
                backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][i % 5],
                boxShadow: `0 0 10px ${['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][i % 5]}`
              }}
            />
          ))}
        </div>

        {/* Trophy Animation */}
        <motion.div
          className="text-8xl text-center mb-4"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          👑
        </motion.div>

        <motion.h2
          className="text-4xl text-center mb-8 pixel-text bg-clip-text text-transparent"
          animate={{
            backgroundImage: [
              "linear-gradient(45deg, #ff0000, #ffff00)",
              "linear-gradient(45deg, #ffff00, #00ff00)",
              "linear-gradient(45deg, #00ff00, #0000ff)",
              "linear-gradient(45deg, #0000ff, #ff0000)",
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          style={{
            WebkitBackgroundClip: "text",
          }}
        >
          JAVASCRIPT BOSS DEFEATED!
        </motion.h2>

        {/* Stats with Icons */}
        <div className="space-y-6 mb-8">
          <motion.div
            className="flex items-center justify-between pixel-text text-xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-[#00ffff]">⚡ Time:</span>
            <span className="text-[#00ffff]">{Math.floor(stats.timePassed / 1000)}s</span>
          </motion.div>

          <motion.div
            className="flex items-center justify-between pixel-text text-xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-[#ffff00]">🔥 Max Combo:</span>
            <span className="text-[#ffff00]">x{stats.maxCombo}</span>
          </motion.div>

          <motion.div
            className="flex items-center justify-between pixel-text text-xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-[#ff00ff]">🎯 Total Hits:</span>
            <span className="text-[#ff00ff]">{stats.totalClicks}</span>
          </motion.div>

          <motion.div
            className="flex items-center justify-between pixel-text text-xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-[#ff0000]">💥 Damage Dealt:</span>
            <span className="text-[#ff0000]">{stats.damageDealt}</span>
          </motion.div>
        </div>

        {/* Achievement Banner */}
        <motion.div
          className="text-center mb-8 pixel-text text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-[#00ff00]">🏆 MASTER DEVELOPER 🏆</span>
        </motion.div>

        {/* Close Button */}
        <motion.button
          className="retro-button w-full text-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          [CONTINUE]
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default BossVictoryModal;
