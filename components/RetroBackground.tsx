'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Sprite {
  id: number;
  x: number;
  y: number;
  type: 'spaceship' | 'star' | 'asteroid' | 'alien';
  direction: number;
}

const RetroBackground = () => {
  const [sprites, setSprites] = useState<Sprite[]>([]);

  useEffect(() => {
    // Initialize sprites
    const initialSprites: Sprite[] = [
      ...Array(15).fill(null).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: 'star',
        direction: Math.random() * 2 - 1
      })),
      ...Array(3).fill(null).map((_, i) => ({
        id: i + 15,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: 'spaceship',
        direction: Math.random() * 2 - 1
      })),
      ...Array(2).fill(null).map((_, i) => ({
        id: i + 18,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: 'alien',
        direction: Math.random() * 2 - 1
      })),
      ...Array(4).fill(null).map((_, i) => ({
        id: i + 20,
        x: Math.random() * 100,
        y: Math.random() * 100,
        type: 'asteroid',
        direction: Math.random() * 2 - 1
      }))
    ];

    setSprites(initialSprites);

    // Animation loop
    const interval = setInterval(() => {
      setSprites(prevSprites => 
        prevSprites.map(sprite => ({
          ...sprite,
          x: ((sprite.x + sprite.direction * 0.2) + 100) % 100,
          y: sprite.type === 'star' 
            ? sprite.y 
            : ((sprite.y + Math.sin(Date.now() / 1000 + sprite.id) * 0.1) + 100) % 100
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getSpriteContent = (type: Sprite['type']) => {
    switch (type) {
      case 'spaceship':
        return '🚀';
      case 'star':
        return '⭐';
      case 'asteroid':
        return '💫';
      case 'alien':
        return '👾';
      default:
        return '•';
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sprites.map(sprite => (
        <motion.div
          key={sprite.id}
          className="absolute text-2xl"
          style={{
            left: `${sprite.x}%`,
            top: `${sprite.y}%`,
            filter: 'brightness(0.8) contrast(1.2)',
            imageRendering: 'pixelated',
            transform: `scale(${sprite.type === 'star' ? 0.5 : 1})`
          }}
        >
          <span className="pixel-text">{getSpriteContent(sprite.type)}</span>
        </motion.div>
      ))}
    </div>
  );
};

export default RetroBackground;
