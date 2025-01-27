'use client';
import { motion } from 'framer-motion';

type EffectType = 'fire' | 'lightning' | 'blizzard' | 'rock';

interface AttackEffectsProps {
  type: EffectType;
  x: number;
  y: number;
  onComplete: () => void;
}

const AttackEffects = ({ type, x, y, onComplete }: AttackEffectsProps) => {
  const effects = {
    fire: {
      particles: 12,
      color: '#ff4400',
      secondaryColor: '#ffcc00',
      render: (i: number) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background: `radial-gradient(circle, #ff4400 0%, #ffcc00 100%)`,
            left: x,
            top: y,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{
            scale: [1, 0],
            opacity: [1, 0],
            x: Math.sin(i) * 50,
            y: Math.cos(i) * 50 - 50,
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: i * 0.02,
          }}
        />
      )
    },
    lightning: {
      particles: 8,
      color: '#00ffff',
      secondaryColor: '#ffffff',
      render: (i: number) => (
        <motion.div
          key={i}
          className="absolute h-20 w-1 origin-bottom"
          style={{
            background: 'linear-gradient(to bottom, #00ffff, #ffffff)',
            left: x,
            top: y,
          }}
          initial={{ scaleY: 0, opacity: 1, rotate: (i * 360) / 8 }}
          animate={{
            scaleY: [0, 1, 0],
            opacity: [1, 1, 0],
            rotate: [(i * 360) / 8, (i * 360) / 8 + 20],
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )
    },
    blizzard: {
      particles: 20,
      color: '#ffffff',
      secondaryColor: '#00ffff',
      render: (i: number) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2"
          style={{
            background: '#ffffff',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            left: x,
            top: y,
          }}
          initial={{ scale: 0, opacity: 1, rotate: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [1, 1, 0],
            rotate: [0, 360],
            x: (Math.random() - 0.5) * 100,
            y: (Math.random() - 0.5) * 100,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: i * 0.02,
          }}
        />
      )
    },
    rock: {
      particles: 8,
      color: '#8b4513',
      secondaryColor: '#654321',
      render: (i: number) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4"
          style={{
            background: '#8b4513',
            clipPath: 'polygon(50% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
            left: x,
            top: y,
          }}
          initial={{ scale: 0, opacity: 1, y: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [1, 1, 0],
            rotate: [-30, 30],
            x: (Math.random() - 0.5) * 80,
            y: [0, 100],
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
            delay: i * 0.05,
          }}
        />
      )
    },
  };

  const effect = effects[type];

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      onAnimationComplete={onComplete}
    >
      {Array.from({ length: effect.particles }).map((_, i) => effect.render(i))}
    </motion.div>
  );
};

export default AttackEffects;
