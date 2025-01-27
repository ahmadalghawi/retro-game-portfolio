'use client';
import { motion } from 'framer-motion';

interface GameOverModalProps {
  stats: {
    timeSurvived: number;
    maxCombo: number;
    totalClicks: number;
    damageDealt: number;
  };
  onClose: () => void;
}

const GameOverModal = ({ stats, onClose }: GameOverModalProps) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative bg-gray-900 p-8 rounded-lg pixel-border"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          damping: 15,
        }}
      >
        {/* Game Over Text */}
        <motion.h2
          className="text-6xl text-center mb-8 pixel-text text-[#ff0000]"
          animate={{
            textShadow: [
              '0 0 10px #ff0000',
              '0 0 20px #ff0000',
              '0 0 10px #ff0000'
            ],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 2,
            repeat: -1,
            repeatType: "reverse" as const
          }}
        >
          GAME OVER
        </motion.h2>

        {/* Stats */}
        <div className="space-y-4 mb-8">
          <motion.div
            className="flex items-center justify-between text-[#ff8800] pixel-text"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span>⏱️ Time Survived:</span>
            <span>{Math.floor(stats.timeSurvived / 1000)}s</span>
          </motion.div>

          <motion.div
            className="flex items-center justify-between text-[#ffff00] pixel-text"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span>🔥 Max Combo:</span>
            <span>x{stats.maxCombo}</span>
          </motion.div>

          <motion.div
            className="flex items-center justify-between text-[#00ffff] pixel-text"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span>🎯 Total Hits:</span>
            <span>{stats.totalClicks}</span>
          </motion.div>

          <motion.div
            className="flex items-center justify-between text-[#ff00ff] pixel-text"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span>⚔️ Damage Dealt:</span>
            <span>{stats.damageDealt}</span>
          </motion.div>
        </div>

        {/* Message */}
        <motion.p
          className="text-center mb-8 text-gray-400 pixel-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          The JavaScript Boss was too powerful...
          <br />
          Keep practicing and try again!
        </motion.p>

        {/* Close Button */}
        <motion.button
          className="retro-button w-full text-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
        >
          [RETREAT]
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default GameOverModal;
