'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface ChallengeModeProps {
  onClose: () => void;
}

const ChallengeMode = ({ onClose }: ChallengeModeProps) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/90 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0">
        <div className="grid-bg w-full h-full opacity-20" />
      </div>

      <div className="container mx-auto px-4 h-full flex items-center justify-center">
        <motion.div
          className="pixel-border p-8 bg-gray-900/80 max-w-2xl w-full relative overflow-hidden"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
        >
          {/* Decorative Elements */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#ff0000] via-[#ffff00] to-[#00ff00]"
            animate={{
              opacity: [1, 0.5, 1],
              scaleX: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
          
          {/* Title */}
          <motion.h1
            className="text-[#ff0000] pixel-text text-4xl text-center mb-8"
            animate={{
              textShadow: [
                "0 0 10px #ff0000",
                "0 0 20px #ff0000",
                "0 0 10px #ff0000"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            CHALLENGE MODE
          </motion.h1>

          {/* Coming Soon Message */}
          <motion.div
            className="text-center space-y-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-[#00ffff] pixel-text text-2xl">
              🚧 Coming Soon! 🚧
            </p>
            <p className="text-[#00ff00] pixel-text text-xl">
              Get ready for the ultimate coding challenge!
            </p>
            <div className="space-y-4 text-[#ffff00] pixel-text">
              <p>• Survive waves of bugs and errors</p>
              <p>• Manage your health and shields</p>
              <p>• Face challenging boss battles</p>
              <p>• Earn exclusive achievements</p>
            </div>
          </motion.div>

          {/* Return Button */}
          <motion.button
            className="retro-button mx-auto block"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            [RETURN TO MODE SELECT]
          </motion.button>

          {/* Animated Decorations */}
          <motion.div
            className="absolute -bottom-4 -right-4 w-24 h-24 border-4 border-[#ff0000]"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -top-4 -left-4 w-16 h-16 border-4 border-[#00ff00]"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChallengeMode;
