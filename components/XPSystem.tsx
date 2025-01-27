'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useXP } from '../context/XPContext';

export default function XPSystem() {
  const { xp, level, combo, powerUp, powerUps } = useXP();

  return (
    <div className="fixed top-4 right-4 space-y-2 z-50">
      {/* Level & XP */}
      <div className="pixel-text bg-black/80 p-2 pixel-border-sm">
        <div className="text-[#00ff00] text-xl">Level {level}</div>
        <div className="text-[#00ff00]/80 text-sm">XP: {xp}</div>
        <div className="h-2 w-32 bg-gray-800 pixel-border-sm mt-1">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(xp % 1000) / 10}%` }}
            className="h-full bg-[#00ff00]"
          />
        </div>
      </div>

      {/* Combo Counter */}
      <AnimatePresence>
        {combo > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="pixel-text text-[#ff00ff] text-xl bg-black/80 p-2 pixel-border-sm"
          >
            {combo}x Combo!
            {combo >= 3 && (
              <div className="text-sm">+{Math.floor(combo / 3) * 50}% Bonus!</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Power-up */}
      <AnimatePresence>
        {powerUp && (
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
            className="pixel-text bg-black/80 p-2 pixel-border-sm relative overflow-hidden"
          >
            {/* Rainbow effect for rainbow power-up */}
            {powerUp === 'rainbow' && (
              <div className="absolute inset-0 animate-rainbow-shift opacity-50" />
            )}
            
            <div
              className="relative z-10"
              style={{ 
                color: powerUps[powerUp].color === 'rainbow' 
                  ? '#ffffff' 
                  : powerUps[powerUp].color 
              }}
            >
              {powerUps[powerUp].name}
              <div className="text-sm">{powerUps[powerUp].description}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Level Up Notification */}
      <AnimatePresence>
        {level > 1 && xp % 1000 < 100 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="pixel-text text-[#ffff00] text-xl bg-black/80 p-2 pixel-border-sm animate-pulse"
          >
            Level Up! 🎮
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
