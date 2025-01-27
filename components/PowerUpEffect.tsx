'use client';
import { motion } from 'framer-motion';

export type PowerUpType = 'doubleExp' | 'comboExtender' | 'multiLevel' | 'criticalHit';

interface PowerUpEffectProps {
  type: PowerUpType;
  position: { x: number; y: number };
  onCollect: () => void;
}

const PowerUpEffect = ({ type, position, onCollect }: PowerUpEffectProps) => {
  const getPowerUpStyle = () => {
    switch (type) {
      case 'doubleExp':
        return {
          icon: '⭐',
          color: '#ffff00',
          text: '2X EXP!',
          scale: 1.2
        };
      case 'comboExtender':
        return {
          icon: '⚡',
          color: '#00ffff',
          text: 'COMBO TIME +5s',
          scale: 1.1
        };
      case 'multiLevel':
        return {
          icon: '🌟',
          color: '#ff00ff',
          text: 'MULTI LEVEL!',
          scale: 1.3
        };
      case 'criticalHit':
        return {
          icon: '🎯',
          color: '#ff0000',
          text: 'CRITICAL!',
          scale: 1.2
        };
    }
  };

  const style = getPowerUpStyle();

  return (
    <motion.div
      className="absolute pointer-events-auto cursor-pointer"
      style={{ 
        left: position.x - 20,
        top: position.y - 20,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: style.scale,
        opacity: 1,
        y: [0, -50],
      }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={(e) => {
        e.stopPropagation();
        onCollect();
      }}
    >
      <motion.div
        className="relative"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: "linear" },
          scale: { duration: 1, repeat: Infinity }
        }}
      >
        <div className="text-3xl">
          {style.icon}
        </div>
        <motion.div
          className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap pixel-text text-sm"
          style={{ color: style.color }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {style.text}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PowerUpEffect;
