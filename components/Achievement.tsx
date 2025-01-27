'use client';
import { motion} from 'framer-motion';

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
  const variants = {
    initial: { x: 300, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 },
  };

  const iconVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 15, -15, 0],
      transition: {
        duration: 0.5,
        repeat: 2,
      },
    },
  };

  const textVariants = {
    initial: { textShadow: '0 0 5px #ffff00' },
    animate: {
      textShadow: [
        '0 0 5px #ffff00',
        '0 0 10px #ffff00',
        '0 0 5px #ffff00',
      ],
      transition: {
        duration: 1,
        repeat: -1,
        repeatType: "loop" as const
      },
    },
  };

  return (
    <motion.div
      className="fixed top-4 right-4 z-[100] pixel-border bg-black/90 p-4 flex items-center gap-4"
      variants={variants}
      initial="initial"
      animate="visible"
      exit="exit"
      onAnimationComplete={() => {
        setTimeout(onComplete, 3000);
      }}
    >
      <motion.div
        className="text-4xl"
        variants={iconVariants}
        initial="initial"
        animate="animate"
      >
        {achievement.icon}
      </motion.div>
      <div>
        <motion.div
          className="text-[#ffff00] pixel-text text-xl"
          variants={textVariants}
          initial="initial"
          animate="animate"
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
