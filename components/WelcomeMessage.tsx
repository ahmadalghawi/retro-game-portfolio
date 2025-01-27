'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface WelcomeMessageProps {
  isVisible: boolean;
  onStart: () => void;
  content: {
    title: string;
    message: string;
    buttonText: string;
  };
}

const WelcomeMessage = ({ isVisible, onStart, content }: WelcomeMessageProps) => {
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
            <motion.h1
              className="text-[#00ff00] pixel-text text-4xl text-center mb-8"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
            >
              {content.title}
            </motion.h1>

            <motion.p
              className="text-[#00ffff] pixel-text text-xl text-center mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {content.message}
            </motion.p>

            <motion.button
              className="retro-button mx-auto block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.6 }}
            >
              [{content.buttonText}]
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeMessage;
