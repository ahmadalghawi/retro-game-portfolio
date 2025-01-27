'use client';
import { motion, AnimatePresence } from 'framer-motion';

export interface AchievementData {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface AchievementProps {
  achievement: AchievementData;
  onComplete: () => void;
}

const Achievement = ({ achievement, onComplete }: AchievementProps) => {
  return (
    <motion.div
      className="fixed top-4 right-4 z-[100] pixel-border bg-black/90 p-4 flex items-center gap-4"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 3000);
      }}
    >
      <motion.div
        className="text-4xl"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          duration: 0.5,
          repeat: 2,
        }}
      >
        {achievement.icon}
      </motion.div>
      <div>
        <motion.div
          className="text-[#ffff00] pixel-text text-xl"
          animate={{
            textShadow: [
              '0 0 5px #ffff00',
              '0 0 10px #ffff00',
              '0 0 5px #ffff00',
            ],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        >
          Achievement Unlocked!
        </motion.div>
        <div className="text-white pixel-text">{achievement.title}</div>
        <div className="text-gray-400 text-sm">{achievement.description}</div>
      </div>
    </motion.div>
  );
};

export default Achievement;
