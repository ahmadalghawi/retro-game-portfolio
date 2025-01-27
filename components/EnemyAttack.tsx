'use client';
import { motion } from 'framer-motion';

interface EnemyAttackProps {
  type: 'bug' | 'error' | 'crash' | 'virus';
  position: { x: number; y: number };
  onHit: () => void;
}

const EnemyAttack = ({ type, position, onHit }: EnemyAttackProps) => {
  const getAttackStyle = () => {
    switch (type) {
      case 'bug':
        return {
          color: '#ff0000',
          symbol: '🐛',
          damage: 10,
          speed: 2
        };
      case 'error':
        return {
          color: '#ff00ff',
          symbol: '⚠️',
          damage: 15,
          speed: 1.5
        };
      case 'crash':
        return {
          color: '#ff3300',
          symbol: '💥',
          damage: 25,
          speed: 1
        };
      case 'virus':
        return {
          color: '#00ff00',
          symbol: '🦠',
          damage: 20,
          speed: 1.2
        };
    }
  };

  const style = getAttackStyle();

  return (
    <motion.div
      className="absolute pointer-events-auto cursor-pointer"
      style={{ 
        left: position.x,
        top: position.y,
        fontSize: '24px'
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: 1,
        y: [0, 100],
      }}
      transition={{
        duration: style.speed,
        ease: "linear"
      }}
      onAnimationComplete={onHit}
      whileHover={{ scale: 1.2 }}
      onClick={(e) => {
        e.stopPropagation();
        onHit();
      }}
    >
      <div className="relative">
        {/* Attack symbol */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {style.symbol}
        </motion.div>
        
        {/* Damage indicator */}
        <motion.div
          className="absolute -top-4 -right-4 pixel-text text-sm"
          style={{ color: style.color }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          -{style.damage}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnemyAttack;
