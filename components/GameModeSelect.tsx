'use client';
import { motion, AnimatePresence } from 'framer-motion';

export type GameMode = 'normal' | 'challenge';

interface GameModeSelectProps {
  isVisible: boolean;
  onSelect: (mode: GameMode) => void;
}

const GameModeSelect = ({ isVisible, onSelect }: GameModeSelectProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 pixel-border p-8 max-w-2xl w-full mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            <h1 className="text-[#00ff00] pixel-text text-4xl text-center mb-8">
              SELECT YOUR MODE
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Normal Mode */}
              <motion.div
                className="pixel-border p-6 bg-black/50 cursor-pointer hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect('normal')}
              >
                <h2 className="text-[#00ffff] pixel-text text-2xl mb-4 text-center">
                  NORMAL MODE
                </h2>
                <div className="text-[#00ff00] pixel-text mb-4 text-center">
                  🎯 Classic Experience
                </div>
                <ul className="text-white pixel-text space-y-2">
                  <li>• Master your coding skills</li>
                  <li>• Build powerful combos</li>
                  <li>• Collect power-ups</li>
                  <li>• Perfect for beginners</li>
                </ul>
              </motion.div>

              {/* Challenge Mode */}
              <motion.div
                className="pixel-border p-6 bg-black/50 cursor-pointer hover:bg-black/70 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect('challenge')}
              >
                <h2 className="text-[#ff0000] pixel-text text-2xl mb-4 text-center">
                  CHALLENGE MODE
                </h2>
                <div className="text-[#ffff00] pixel-text mb-4 text-center">
                  ⚔️ Survival Challenge
                </div>
                <ul className="text-white pixel-text space-y-2">
                  <li>• Manage your HP</li>
                  <li>• Dodge enemy attacks</li>
                  <li>• Collect shields</li>
                  <li>• For experienced coders</li>
                </ul>
              </motion.div>
            </div>

            {/* Mode Description */}
            <div className="mt-8 text-center">
              <p className="text-[#00ffff] pixel-text">
                Choose wisely, brave coder!
              </p>
              <motion.p
                className="text-[#ffff00] pixel-text mt-2"
                animate={{
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: -1,
                  repeatType: "reverse" as const
                }}
              >
                Click a mode to begin your journey
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GameModeSelect;
