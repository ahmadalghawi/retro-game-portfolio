'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MemoryGameProps {
  onScoreUpdate: (score: number) => void;
  onGameComplete: () => void;
}

interface MemoryCard {
  id: number;
  tech: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const MemoryGame = ({ onScoreUpdate, onGameComplete }: MemoryGameProps) => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [gameStats, setGameStats] = useState({
    moves: 0,
    matches: 0,
    timeElapsed: 0,
  });
  const [gameTimer, setGameTimer] = useState<NodeJS.Timeout | null>(null);

  const initializeGame = () => {
    const techStack = [
      { name: 'React', color: '#61DAFB' },
      { name: 'Next.js', color: '#000000' },
      { name: 'Node.js', color: '#339933' },
      { name: 'TypeScript', color: '#3178C6' },
      { name: 'Tailwind', color: '#06B6D4' },
      { name: 'MongoDB', color: '#47A248' },
    ];
    
    const cardPairs = [...techStack, ...techStack].map((tech, index) => ({
      id: index,
      tech: tech.name,
      isFlipped: false,
      isMatched: false
    }));
    
    // Shuffle cards
    for (let i = cardPairs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardPairs[i], cardPairs[j]] = [cardPairs[j], cardPairs[i]];
    }
    
    setCards(cardPairs);
    setMatchedPairs(0);
    setStreak(0);
    setGameStats({ moves: 0, matches: 0, timeElapsed: 0 });
    
    if (gameTimer) clearInterval(gameTimer);
    const timer = setInterval(() => {
      setGameStats(prev => ({ ...prev, timeElapsed: prev.timeElapsed + 1 }));
    }, 1000);
    setGameTimer(timer);
  };

  const handleCardFlip = (cardId: number) => {
    if (flippedCards.length === 2) return;
    
    setGameStats(prev => ({ ...prev, moves: prev.moves + 1 }));
    
    const newCards = cards.map(card => 
      card.id === cardId ? { ...card, isFlipped: true } : card
    );
    setCards(newCards);
    setFlippedCards([...flippedCards, cardId]);

    if (flippedCards.length === 1) {
      const firstCard = cards.find(card => card.id === flippedCards[0]);
      const secondCard = cards.find(card => card.id === cardId);

      if (firstCard?.tech === secondCard?.tech) {
        // Match found
        setTimeout(() => {
          setCards(cards.map(card => 
            card.tech === firstCard?.tech ? { ...card, isMatched: true } : card
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
          setStreak(prev => prev + 1);
          if (streak + 1 > bestStreak) setBestStreak(streak + 1);
          onScoreUpdate(50 * (streak + 1));
          setGameStats(prev => ({ ...prev, matches: prev.matches + 1 }));
          
          // Check if game is complete
          if (matchedPairs + 1 === cards.length / 2) {
            onGameComplete();
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(card => ({ ...card, isFlipped: false })));
          setFlippedCards([]);
          setStreak(0);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    initializeGame();
    return () => {
      if (gameTimer) clearInterval(gameTimer);
    };
  }, []);

  return (
    <div className="relative">
      {/* Game Stats */}
      <div className="flex justify-between mb-8 max-w-2xl mx-auto px-4">
        <div className="pixel-border-sm p-2 bg-black">
          <span className="text-[#00ff00]">Moves: {gameStats.moves}</span>
        </div>
        <div className="pixel-border-sm p-2 bg-black">
          <span className="text-[#00ff00]">Time: {gameStats.timeElapsed}s</span>
        </div>
        <div className="pixel-border-sm p-2 bg-black">
          <span className="text-[#00ff00]">Streak: {streak}</span>
        </div>
        <div className="pixel-border-sm p-2 bg-black">
          <span className="text-[#00ff00]">Best: {bestStreak}</span>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto">
        {cards.map(card => (
          <motion.div
            key={card.id}
            className={`aspect-square pixel-border cursor-pointer relative ${
              card.isMatched ? 'bg-[#00ff00]/20' : 'bg-black'
            }`}
            whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
            onClick={() => !card.isFlipped && !card.isMatched && handleCardFlip(card.id)}
          >
            {/* Card Content */}
            <div className="h-full w-full flex items-center justify-center">
              {!card.isFlipped && !card.isMatched && (
                <span className="text-[#00ff00] text-2xl">?</span>
              )}
              {(card.isFlipped || card.isMatched) && (
                <span className="text-[#00ff00] text-lg font-bold">{card.tech}</span>
              )}
            </div>

            {/* Match Animation */}
            <AnimatePresence>
              {card.isMatched && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute inset-0 bg-[#00ff00]/20 flex items-center justify-center"
                >
                  <span className="text-[#00ff00] text-2xl">✓</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MemoryGame;
