'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface MonsterSpriteProps {
  skillName: string;
  level: number;
  isHovered?: boolean;
  isSelected?: boolean;
  isDefeated?: boolean;
}

const MonsterSprite = ({ skillName, level, isHovered, isSelected, isDefeated }: MonsterSpriteProps) => {
  const [isAttacking, setIsAttacking] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      if (!isHovered && Math.random() > 0.7) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, 2000);

    return () => clearInterval(blinkInterval);
  }, [isHovered]);

  // Particle effect on attack
  useEffect(() => {
    if (isAttacking) {
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20
      }));
      setParticles(newParticles);
      setTimeout(() => setParticles([]), 500);
    }
  }, [isAttacking]);

  const getMonsterColor = () => {
    if (level >= 90) return '#00ff00';
    if (level >= 70) return '#ffff00';
    return '#ff9900';
  };

  const getMonsterDesign = (name: string) => {
    const designs = {
      react: {
        body: "M12,8 h8 v2 h2 v2 h2 v8 h-2 v2 h-2 v2 h-8 v-2 h-2 v-2 h-2 v-8 h2 v-2 h2 z",
        eyes: "M14,12 h4 v2 h-4 z",
        mouth: "M14,18 h1 v2 h2 v-2 h1 v4 h-4 z",
        extras: "M10,14 h2 v4 h-2 z M20,14 h2 v4 h-2 z"
      },
      nextjs: {
        body: "12 h2 v2 h-2 z M18,12 h2 v2 h-2 z M14,16 h4 v2 h-4 z",
        eyes: "M12,12 h2 v2 h-2 z M18,12 h2 v2 h-2 z",
        mouth: "M14,16 h4 v2 h-4 z",
        extras: "M10,10 h2 v2 h-2 z M20,10 h2 v2 h-2 z M12,14 h2 v2 h-2 z"
      },
      typescript: {
        body: "M10,6 h12 v4 h4 v12 h-4 v4 h-12 v-4 h-4 v-12 h4 z",
        eyes: "M13,12 h2 v2 h-2 z M19,12 h2 v2 h-2 z",
        mouth: "M15,18 h4 v2 h-4 z",
        extras: "M12,8 h2 v2 h-2 z M20,8 h2 v2 h-2 z"
      },
      "node.js": {
        body: "M6,12 h4 v-4 h12 v4 h4 v8 h-4 v4 h-12 v-4 h-4 z",
        eyes: "M12,12 h3 v3 h-3 z M17,12 h3 v3 h-3 z",
        mouth: "M13,18 h6 v2 h-6 z",
        extras: "M8,14 h2 v4 h-2 z M22,14 h2 v4 h-2 z"
      },
      "react native": {
        body: "M8,8 h16 v12 h-4 v4 h-8 v-4 h-4 z",
        eyes: "M12,12 h3 v3 h-3 z M17,12 h3 v3 h-3 z",
        mouth: "M13,18 h6 v2 h-6 z",
        extras: "M6,12 h2 v6 h-2 z M24,12 h2 v6 h-2 z"
      },
      mysql: {
        body: "M6,10 h20 v12 h-4 v2 h-12 v-2 h-4 z",
        eyes: "M10,14 h4 v2 h-4 z M18,14 h4 v2 h-4 z",
        mouth: "M14,20 h4 v-2 h2 v4 h-8 v-4 h2 z",
        extras: "M8,12 h2 v8 h-2 z M22,12 h2 v8 h-2 z"
      },
      firebase: {
        body: "M10,6 l12,0 l4,8 l-4,8 l-12,0 l-4,-8 z",
        eyes: "M13,12 h2 v2 h-2 z M19,12 h2 v2 h-2 z",
        mouth: "M15,16 h4 v2 h-4 z",
        extras: "M9,14 h2 v4 h-2 z M23,14 h2 v4 h-2 z"
      },
      figma: {
        body: "M8,8 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0",
        eyes: "M12,12 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0 M18,12 a2,2 0 1,0 4,0 a2,2 0 1,0 -4,0",
        mouth: "M14,18 c4,4 8,0 8,0",
        extras: "M6,14 h4 v4 h-4 z M22,14 h4 v4 h-4 z"
      }
    };

    return designs[name.toLowerCase() as keyof typeof designs] || designs.react;
  };

  const monsterDesign = getMonsterDesign(skillName);
  const color = getMonsterColor();

  const variants = {
    idle: {
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        repeat: -1,
        repeatType: "reverse" as const
      }
    },
    attack: {
      rotate: 15,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    defeated: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    selected: {
      scale: 1.1,
      transition: {
        duration: 0.5,
        repeat: -1,
        repeatType: "reverse" as const
      }
    }
  };

  const glowVariants = {
    idle: {
      filter: `drop-shadow(0 0 10px ${color})`,
      transition: {
        duration: 0.4
      }
    },
    hover: {
      filter: `drop-shadow(0 0 20px ${color})`,
      transition: {
        duration: 0.4,
        repeat: -1,
        repeatType: "reverse" as const
      }
    },
    selected: {
      filter: `drop-shadow(0 0 20px ${color})`,
      transition: {
        duration: 0.4
      }
    }
  };

  const eyesAnimation = {
    scaleY: isBlinking ? 0.1 : 1,
    transition: { duration: 0.15 }
  };

  const defeatedAnimation = {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  };

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center"
      variants={variants}
      initial="idle"
      animate={
        isDefeated
          ? "defeated"
          : isAttacking
          ? "attack"
          : isHovered
          ? "hover"
          : "idle"
      }
      whileTap={{ scale: 0.9 }}
      onClick={() => {
        setIsAttacking(true);
        setTimeout(() => setIsAttacking(false), 500);
      }}
    >
      <motion.div 
        className="w-32 h-32 relative"
        variants={glowVariants}
        initial="idle"
        animate={isHovered ? "hover" : isSelected ? "selected" : "idle"}
      >
        {/* Particle effects */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-[#00ff00] rounded-full"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: 0,
              scale: [1, 0]
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        ))}

        {/* Power orbs */}
        {isHovered && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-4 bg-current"
                style={{
                  transform: `rotate(${(360 / 8) * i}deg)`,
                  transformOrigin: 'center bottom',
                }}
                animate={{
                  y: [-2, 2],
                }}
                transition={{
                  duration: 1,
                  repeat: -1,
                  repeatType: "reverse" as const
                }}
              />
            ))}
          </motion.div>
        )}

        <svg 
          viewBox="0 0 32 32" 
          className="w-full h-full"
          style={{ imageRendering: 'pixelated' }}
        >
          {/* Base monster */}
          <g>
            <motion.path
              d={monsterDesign.body}
              fill={color}
              animate={{
                fill: [color, isAttacking ? '#ffffff' : color],
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.g animate={eyesAnimation}>
              <path d={monsterDesign.eyes} fill="#000"/>
            </motion.g>
            <motion.path
              d={monsterDesign.mouth}
              fill="#000"
              animate={{
                d: isAttacking 
                  ? monsterDesign.mouth.replace('h4', 'h6') // Wider mouth when attacking
                  : monsterDesign.mouth
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.path
              d={monsterDesign.extras}
              fillOpacity="0.3"
              fill={color}
              animate={{
                fillOpacity: isHovered ? [0.3, 0.6] : 0.3
              }}
              transition={{ duration: 0.5, repeat: -1, repeatType: "reverse" as const }}
            />
          </g>

          {/* Power level indicators */}
          <g>
            {Array.from({ length: Math.min(5, Math.floor(level/20)) }).map((_, i) => (
              <motion.circle
                key={i}
                cx={10 + i * 3}
                cy={28}
                r={1}
                fill={color}
                animate={{
                  opacity: isHovered ? [0.5, 1] : 0.8,
                  scale: isHovered ? [1, 1.5, 1] : 1,
                  r: isHovered ? [1, 1.5, 1] : 1
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.15,
                  repeat: -1,
                  repeatType: "reverse" as const
                }}
              />
            ))}
          </g>

          {/* Attack effect */}
          {isAttacking && (
            <>
              <motion.circle
                cx="16"
                cy="16"
                r="12"
                fill={color}
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
              <motion.circle
                cx="16"
                cy="16"
                r="8"
                fill={color}
                initial={{ scale: 0, opacity: 0.8 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
            </>
          )}
        </svg>
      </motion.div>

      {/* Defeated Overlay */}
      {isDefeated && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="pixel-text text-gray-400 transform -rotate-12 text-xl border-2 border-gray-400 px-2">
            DEFEATED
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MonsterSprite;
