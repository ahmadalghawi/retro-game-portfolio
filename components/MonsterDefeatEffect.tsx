'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface MonsterDefeatEffectProps {
  position: { x: number; y: number };
  onComplete: () => void;
  skillType: string;
  size?: 'small' | 'medium' | 'large';
}

const MonsterDefeatEffect = ({ 
  position, 
  onComplete, 
  skillType,
  size = 'medium' 
}: MonsterDefeatEffectProps) => {
  // Size multiplier based on size prop
  const sizeMultiplier = {
    small: 0.7,
    medium: 1,
    large: 1.5
  }[size];

  // Get effect style based on skill type
  const getEffectStyle = () => {
    switch (skillType) {
      case 'JavaScript':
        return {
          colors: ['#f7df1e', '#ffed4a', '#fff263'],
          icon: '⚡',
          text: 'JS MASTERED!'
        };
      case 'React':
        return {
          colors: ['#61dafb', '#00b4d8', '#90e0ef'],
          icon: '⚛️',
          text: 'REACT MASTER!'
        };
      case 'TypeScript':
        return {
          colors: ['#3178c6', '#5390d9', '#7400b8'],
          icon: '🔷',
          text: 'TS CONQUERED!'
        };
      case 'Node.js':
        return {
          colors: ['#43853d', '#70e000', '#38b000'],
          icon: '🟢',
          text: 'NODE MASTERY!'
        };
      default:
        return {
          colors: ['#ff0000', '#ffff00', '#00ff00'],
          icon: '🎯',
          text: 'SKILL MASTERED!'
        };
    }
  };

  const style = getEffectStyle();

  // Create particles with skill-specific colors
  const particles = Array.from({ length: 20 }, (_, i) => {
    const angle = (i * 18 * Math.PI) / 180;
    return {
      x: Math.cos(angle) * 100 * sizeMultiplier,
      y: Math.sin(angle) * 100 * sizeMultiplier,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      color: style.colors[Math.floor(Math.random() * style.colors.length)]
    };
  });

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)'
      }}
    >
      {/* Main explosion ring */}
      <motion.div
        className="absolute rounded-full"
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: [0, 3 * sizeMultiplier],
          opacity: [1, 0],
        }}
        transition={{ duration: 0.8 }}
        style={{
          width: 100 * sizeMultiplier,
          height: 100 * sizeMultiplier,
          border: `4px solid ${style.colors[0]}`,
          boxShadow: `0 0 20px ${style.colors[0]}`
        }}
      />

      {/* Skill icon */}
      <motion.div
        className="absolute text-4xl"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: [0, 2 * sizeMultiplier],
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 0.5 }}
        style={{
          fontSize: 40 * sizeMultiplier
        }}
      >
        {style.icon}
      </motion.div>

      {/* Pixel fragments */}
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute"
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{
            x: particle.x,
            y: particle.y,
            opacity: 0,
            scale: particle.scale,
            rotate: particle.rotation,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          <div
            className="w-3 h-3 pixel-border"
            style={{ 
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
              width: 8 * sizeMultiplier,
              height: 8 * sizeMultiplier
            }}
          />
        </motion.div>
      ))}

      {/* Text effect */}
      <motion.div
        className="absolute whitespace-nowrap pixel-text font-bold"
        initial={{ y: 0, opacity: 0, scale: 0.5 }}
        animate={{
          y: -80 * sizeMultiplier,
          opacity: [0, 1, 1, 0],
          scale: 1.5 * sizeMultiplier,
        }}
        transition={{ duration: 1.2 }}
        onAnimationComplete={onComplete}
        style={{
          color: style.colors[0],
          textShadow: `0 0 10px ${style.colors[0]}`,
          fontSize: 24 * sizeMultiplier
        }}
      >
        {style.text}
      </motion.div>

      {/* Radial burst */}
      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: [0, 1],
          opacity: [1, 0],
        }}
        transition={{ duration: 0.5 }}
        style={{
          width: 200 * sizeMultiplier,
          height: 200 * sizeMultiplier,
          background: `radial-gradient(circle, ${style.colors[0]} 0%, rgba(0,0,0,0) 70%)`,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
};

export default MonsterDefeatEffect;
