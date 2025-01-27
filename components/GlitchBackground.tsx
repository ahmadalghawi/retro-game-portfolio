'use client';
import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlitchElement {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  duration: number;
  delay: number;
  type: 'error' | 'glitch' | 'matrix' | 'warning';
}

const GlitchBackground = () => {
  const [isClient, setIsClient] = useState(false);

  // Memoize static data
  const errorMessages = useMemo(() => [
    'MEMORY_CORRUPTION_DETECTED',
    'SYSTEM_MALFUNCTION',
    'BUFFER_OVERFLOW',
    'CRITICAL_ERROR',
    'SEGMENTATION_FAULT',
    'DATA_CORRUPTION',
    'STACK_OVERFLOW',
    'FATAL_EXCEPTION',
    'NULL_POINTER',
    'SYNTAX_ERROR'
  ], []);

  // Generate deterministic matrix columns
  const matrixColumns = useMemo(() => 
    Array(20).fill(0).map((_, i) => ({
      left: `${i * 5}%`,
      delay: `${(i * 0.1) % 2}s`,
      duration: `${1.5 + (i * 0.05) % 1}s`
    })), 
  []);

  // Generate deterministic glitch elements
  const staticGlitches = useMemo(() => 
    Array(15).fill(0).map((_, i) => ({
      id: i,
      x: (i * 7.3) % 100,
      y: (i * 11.7) % 100,
      width: 5 + (i * 3.14) % 15,
      height: 1 + (i * 1.618) % 1,
      duration: 0.2 + (i * 0.05) % 0.3,
      delay: (i * 0.13) % 2,
      type: ['error', 'glitch', 'matrix', 'warning'][i % 4] as GlitchElement['type']
    })),
  []);

  const [errors, setErrors] = useState<string[]>([]);

  // Client-side only effect
  useEffect(() => {
    setIsClient(true);

    const errorInterval = setInterval(() => {
      const index = Math.floor((Date.now() / 3000) % errorMessages.length);
      setErrors(prev => {
        const newErrors = [...prev];
        if (newErrors.length >= 4) {
          newErrors.shift();
        }
        return [...newErrors, errorMessages[index]];
      });
    }, 3000);

    return () => clearInterval(errorInterval);
  }, [errorMessages]);

  // Don't render anything on server
  if (!isClient) {
    return null;
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Glitch elements */}
      <AnimatePresence>
        {staticGlitches.map(glitch => (
          <motion.div
            key={glitch.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: glitch.duration,
              delay: glitch.delay,
              repeat: -1,
              repeatDelay: 3,
              repeatType: "reverse" as const
            }}
            className={`absolute ${
              glitch.type === 'error' ? 'text-red-500' :
              glitch.type === 'warning' ? 'text-yellow-500' :
              glitch.type === 'matrix' ? 'text-green-500' :
              'text-blue-500'
            } font-mono text-sm opacity-30`}
            style={{
              left: `${glitch.x}%`,
              top: `${glitch.y}%`,
              width: `${glitch.width}%`,
              height: `${glitch.height}%`,
              transform: `skew(${(glitch.id * 7) % 20 - 10}deg)`,
              filter: 'blur(0.5px)',
              textShadow: '2px 2px 4px rgba(0, 255, 0, 0.5)'
            }}
          >
            {glitch.type === 'matrix' ? '01'.repeat(5) : 
             glitch.type === 'error' ? 'ERROR' :
             glitch.type === 'warning' ? 'WARNING' :
             '█'.repeat(5)}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Error messages */}
      <div className="absolute top-4 right-4 z-20">
        <AnimatePresence>
          {errors.map((error, index) => (
            <motion.div
              key={`${error}-${index}`}
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -100, opacity: 0 }}
              className="text-red-500 font-mono text-sm mb-2"
              style={{
                textShadow: '2px 2px 4px rgba(255, 0, 0, 0.5)'
              }}
            >
              {error}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Matrix rain effect */}
      <div className="absolute inset-0" style={{ opacity: 0.1 }}>
        {matrixColumns.map((column, i) => (
          <div
            key={i}
            className="absolute text-green-500 font-mono text-xs"
            style={{
              left: column.left,
              animation: `matrixRain ${column.duration} linear infinite`,
              animationDelay: column.delay
            }}
          >
            {Array(20).fill(0).map((_, j) => (
              <div key={j} style={{ opacity: 1 - j / 20 }}>
                {'01'[j % 2]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlitchBackground;
