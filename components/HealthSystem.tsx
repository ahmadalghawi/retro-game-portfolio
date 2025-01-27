'use client';
import { motion } from 'framer-motion';

interface HealthSystemProps {
  currentHP: number;
  maxHP: number;
  shield: number;
  isBoss?: boolean;
}

const HealthSystem = ({ currentHP, maxHP, shield, isBoss = false }: HealthSystemProps) => {
  const percentage = (currentHP / maxHP) * 100;
  const shieldPercentage = (shield / maxHP) * 100;

  return (
    <div className="w-96">
      {/* Health Bar Container */}
      <motion.div
        className="h-6 pixel-border relative overflow-hidden"
        style={{
          backgroundColor: '#000000',
        }}
      >
        {/* Health Bar */}
        <motion.div
          className="h-full absolute left-0 top-0"
          style={{
            width: `${percentage}%`,
            backgroundColor: isBoss ? '#ff0000' : '#00ff00',
            boxShadow: isBoss 
              ? '0 0 10px #ff0000, 0 0 20px #ff0000'
              : '0 0 10px #00ff00',
          }}
          animate={{
            opacity: currentHP < maxHP * 0.3 ? [0.6, 1] : 1,
          }}
          transition={{
            opacity: {
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        />

        {/* Shield Bar */}
        {shield > 0 && (
          <motion.div
            className="h-full absolute left-0 top-0"
            style={{
              width: `${shieldPercentage}%`,
              backgroundColor: '#00ffff',
              mixBlendMode: 'overlay',
              boxShadow: '0 0 10px #00ffff',
            }}
            animate={{
              opacity: [0.5, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        )}
      </motion.div>

      {/* HP Text */}
      <div className="text-center pixel-text text-white">
        {currentHP} / {maxHP} HP
      </div>
    </div>
  );
};

export default HealthSystem;
