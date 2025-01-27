'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface TitleEffectProps {
  text: string;
  isLevelUp: boolean;
  color?: string;
}

const TitleEffect = ({ text, isLevelUp, color = '#00ff00' }: TitleEffectProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; angle: number }>>([]);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    if (isLevelUp) {
      // Create explosion particles
      const newParticles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20,
        angle: (Math.PI * 2 * i) / 20,
      }));
      setParticles(newParticles);
      setGlowIntensity(1);

      // Clear particles after animation
      const timer = setTimeout(() => {
        setParticles([]);
        setGlowIntensity(0);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLevelUp]);

  const letterVariants = {
    levelUp: {
      scale: [1, 1.2, 0.9, 1.1, 1],
      rotate: [0, -5, 5, -2, 0],
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="relative">
      {/* Glow effect */}
      <div
        className="absolute inset-0 blur-lg transition-opacity duration-300"
        style={{
          background: color,
          opacity: glowIntensity * 0.3,
        }}
      />

      {/* Particles */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: color,
              left: '50%',
              top: '50%',
            }}
            initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
            animate={{
              scale: [1, 0],
              x: Math.cos(particle.angle) * 50,
              y: Math.sin(particle.angle) * 50,
              opacity: [1, 0],
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>

      {/* Text with pixel effect */}
      <div className="relative">
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            className="inline-block pixel-text relative"
            animate={isLevelUp ? "levelUp" : undefined}
            variants={letterVariants}
            transition={{ delay: i * 0.05 }}
            style={{
              textShadow: `0 0 ${glowIntensity * 10}px ${color}`,
            }}
          >
            {char}
          </motion.span>
        ))}

        {/* Pixel scatter effect */}
        {isLevelUp && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={`pixel-${i}`}
                className="absolute w-1 h-1"
                style={{
                  background: color,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: [1, 0],
                  scale: [1, 0],
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100,
                  rotate: Math.random() * 360,
                }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </div>
        )}

        {/* Power-up rings */}
        {isLevelUp && (
          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={`ring-${ring}`}
                className="absolute rounded-full border-2"
                style={{ borderColor: color }}
                initial={{ width: 20, height: 20, opacity: 1 }}
                animate={{
                  width: [20, 100],
                  height: [20, 100],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: ring * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleEffect;
