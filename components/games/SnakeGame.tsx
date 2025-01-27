'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SnakeGameProps {
  onScoreUpdate: (score: number) => void;
  onGameComplete: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 200;
const SPEED_INCREMENT = 10;

export const SnakeGame = ({ onScoreUpdate, onGameComplete }: SnakeGameProps) => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    // Make sure food doesn't spawn on snake
    if (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood();
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
  };

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = { ...head };

      // Move head based on direction
      switch (direction) {
        case 'UP':
          newHead.y = (newHead.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'DOWN':
          newHead.y = (newHead.y + 1) % GRID_SIZE;
          break;
        case 'LEFT':
          newHead.x = (newHead.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'RIGHT':
          newHead.x = (newHead.x + 1) % GRID_SIZE;
          break;
      }

      // Check for collisions with self
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameOver(true);
        if (score > highScore) {
          setHighScore(score);
        }
        onGameComplete();
        return prevSnake;
      }

      // Check for food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        setFood(generateFood());
        setScore(prev => {
          const newScore = prev + 10;
          onScoreUpdate(10);
          // Increase speed every 50 points
          if (newScore % 50 === 0) {
            setSpeed(prevSpeed => Math.max(prevSpeed - SPEED_INCREMENT, 50));
          }
          return newScore;
        });
        return [newHead, ...prevSnake];
      }

      return [newHead, ...prevSnake.slice(0, -1)];
    });
  }, [direction, food, gameOver, isPaused, generateFood, score, highScore, onScoreUpdate, onGameComplete]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction]);

  useEffect(() => {
    const gameLoop = setInterval(moveSnake, speed);
    return () => clearInterval(gameLoop);
  }, [moveSnake, speed]);

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Game Stats */}
      <div className="flex justify-between mb-8 px-4">
        <div className="pixel-border-sm p-2 bg-black">
          <span className="text-[#00ff00]">Score: {score}</span>
        </div>
        <div className="pixel-border-sm p-2 bg-black">
          <span className="text-[#00ff00]">High Score: {highScore}</span>
        </div>
        <div className="pixel-border-sm p-2 bg-black">
          <span className="text-[#00ff00]">Speed: {Math.floor((INITIAL_SPEED - speed) / SPEED_INCREMENT)}</span>
        </div>
      </div>

      {/* Game Grid */}
      <div 
        className="pixel-border bg-black relative"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
          margin: '0 auto'
        }}
      >
        {/* Snake */}
        {snake.map((segment, index) => (
          <motion.div
            key={index}
            className="absolute bg-[#00ff00]"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              width: CELL_SIZE - 2,
              height: CELL_SIZE - 2,
              left: segment.x * CELL_SIZE + 1,
              top: segment.y * CELL_SIZE + 1,
              borderRadius: index === 0 ? '4px' : '2px'
            }}
          />
        ))}

        {/* Food */}
        <motion.div
          className="absolute bg-[#ff00ff]"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{
            width: CELL_SIZE - 2,
            height: CELL_SIZE - 2,
            left: food.x * CELL_SIZE + 1,
            top: food.y * CELL_SIZE + 1,
            borderRadius: '50%'
          }}
        />
      </div>

      {/* Controls */}
      <div className="mt-8 text-center text-[#00ff00]">
        <p>Use arrow keys to move</p>
        <p>Press SPACE to pause</p>
      </div>

      {/* Game Over / Pause Overlay */}
      {(gameOver || isPaused) && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-[#00ff00] text-2xl mb-4">
              {gameOver ? 'Game Over!' : 'Paused'}
            </h3>
            {gameOver && (
              <p className="text-[#00ff00] mb-4">Final Score: {score}</p>
            )}
            <button
              onClick={gameOver ? resetGame : () => setIsPaused(false)}
              className="pixel-border-sm px-6 py-2 bg-[#00ff00]/20 text-[#00ff00] hover:bg-[#00ff00]/30"
            >
              {gameOver ? 'Play Again' : 'Resume'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
