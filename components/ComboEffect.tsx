'use client';
import { motion} from 'framer-motion';

interface ComboEffectProps {
  combo: number;
  position: { x: number; y: number };
}

const ComboEffect = ({ combo, position }: ComboEffectProps) => {
  const getComboColor = () => {
    if (combo >= 100) return '#00ffff';
    if (combo >= 75) return '#ff00ff';
    if (combo >= 50) return '#ff0000';
    if (combo >= 30) return '#ff8800';
    if (combo >= 20) return '#ffff00';
    if (combo >= 10) return '#00ff00';
    return '#ffffff';
  };

  const getComboText = () => {
    if (combo >= 100) return 'LEGENDARY!';
    if (combo >= 75) return 'ULTRA MASTER!';
    if (combo >= 50) return 'MASTERLIKE!';
    if (combo >= 30) return 'DOMINATING!';
    if (combo >= 20) return 'RAMPAGE!';
    if (combo >= 10) return 'UNSTOPPABLE!';
    if (combo >= 5) return 'IMPRESSIVE!';
    return 'COMBO!';
  };

  const getComboEmoji = () => {
    if (combo >= 100) return '⚜️';
    if (combo >= 75) return '🌟';
    if (combo >= 50) return '👑';
    if (combo >= 30) return '💀';
    if (combo >= 20) return '🔥';
    if (combo >= 10) return '⚡';
    if (combo >= 5) return '✨';
    return '🎯';
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: position.x, top: position.y }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: [0, 1.5, 1],
        opacity: [0, 1, 1, 0],
        y: -100
      }}
      transition={{ duration: 1 }}
    >
      <div className="flex flex-col items-center">
        {/* Combo Counter */}
        <motion.div
          className="pixel-text text-4xl font-bold"
          style={{ color: getComboColor() }}
          animate={{
            textShadow: [
              `0 0 10px ${getComboColor()}`,
              `0 0 20px ${getComboColor()}`,
              `0 0 10px ${getComboColor()}`
            ],
          }}
          transition={{
            duration: 0.5,
            repeat: 2,
          }}
        >
          {getComboEmoji()} x{combo} {getComboEmoji()}
        </motion.div>

        {/* Combo Text */}
        <motion.div
          className="pixel-text text-2xl"
          style={{ color: getComboColor() }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [-5, 5, -5, 5, 0],
          }}
          transition={{
            duration: 0.5,
          }}
        >
          {getComboText()}
        </motion.div>

        {/* Particle Effects */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              backgroundColor: getComboColor(),
              width: '4px',
              height: '4px',
              borderRadius: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * Math.PI / 4) * 50],
              y: [0, Math.sin(i * Math.PI / 4) * 50],
              opacity: [1, 0],
              scale: [1, 0],
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ComboEffect;
