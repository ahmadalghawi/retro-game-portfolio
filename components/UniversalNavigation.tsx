'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Palette, 
  X,
  Code2, 
  Newspaper, 
  Zap, 
  Paintbrush, 
  Sparkles, 
  TreePine, 
  Brain,
  Monitor
} from 'lucide-react';

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  route: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

const portfolioThemes: ThemeOption[] = [
  {
    id: 'developer-playground',
    name: 'Developer Playground',
    description: 'Interactive terminal-style developer experience',
    route: '/portfolio',
    icon: <Code2 size={20} />,
    color: '#00fd00',
    bgGradient: 'from-black via-gray-900 to-black'
  },
  {
    id: 'vintage-newspaper',
    name: 'Vintage Newspaper',
    description: 'Classic newspaper layout with professional content',
    route: '/vintage-newspaper',
    icon: <Newspaper size={20} />,
    color: '#8B4513',
    bgGradient: 'from-amber-50 via-yellow-50 to-amber-100'
  },
  {
    id: 'art-deco',
    name: 'Art Deco Classic',
    description: 'Elegant 1920s-inspired luxury design',
    route: '/art-deco',
    icon: <Palette size={20} />,
    color: '#DAA520',
    bgGradient: 'from-amber-900 via-yellow-800 to-amber-900'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Edition',
    description: 'Futuristic neon-lit digital experience',
    route: '/cyberpunk',
    icon: <Zap size={20} />,
    color: '#00FFFF',
    bgGradient: 'from-purple-900 via-blue-900 to-cyan-900'
  },
  {
    id: 'watercolor',
    name: 'Watercolor Artist',
    description: 'Masculine artistic design with bold colors',
    route: '/watercolor',
    icon: <Paintbrush size={20} />,
    color: '#4169E1',
    bgGradient: 'from-slate-800 via-blue-800 to-teal-800'
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Modern glass-effect translucent design',
    route: '/glassmorphism',
    icon: <Sparkles size={20} />,
    color: '#60A5FA',
    bgGradient: 'from-slate-800 via-blue-900 to-teal-800'
  },
  {
    id: 'nature',
    name: 'Nature/Organic',
    description: 'Earth-inspired sustainable design',
    route: '/nature',
    icon: <TreePine size={20} />,
    color: '#22C55E',
    bgGradient: 'from-green-800 via-emerald-700 to-teal-800'
  },
  {
    id: 'ai-generator',
    name: 'AI Code Generator',
    description: 'Cutting-edge AI-powered developer showcase',
    route: '/ai-generator',
    icon: <Brain size={20} />,
    color: '#A855F7',
    bgGradient: 'from-slate-900 via-purple-900 to-blue-900'
  }
];

interface UniversalNavigationProps {
  currentTheme?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  variant?: 'dark' | 'light' | 'theme-adaptive';
}

const UniversalNavigation: React.FC<UniversalNavigationProps> = ({ 
  currentTheme,
  position = 'top-right',
  variant = 'dark'
}) => {
  const [showThemeSelector, setShowThemeSelector] = useState(false);

  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4'
  };

  const variantClasses = {
    'dark': 'bg-black/80 text-white border-gray-600',
    'light': 'bg-white/90 text-black border-gray-300',
    'theme-adaptive': 'bg-black/80 text-white border-gray-600'
  };

  return (
    <>
      {/* Navigation Buttons */}
      <motion.div
        className={`fixed ${positionClasses[position]} z-40 flex flex-col gap-2`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        {/* Back to Main Button */}
        <Link href="/">
          <motion.button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 backdrop-blur-sm transition-all hover:scale-105 ${variantClasses[variant]}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home size={18} />
            <span className="text-sm font-semibold">Home</span>
          </motion.button>
        </Link>

        {/* Choose Theme Button */}
        <motion.button
          onClick={() => setShowThemeSelector(!showThemeSelector)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 backdrop-blur-sm transition-all hover:scale-105 ${variantClasses[variant]}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Palette size={18} />
          <span className="text-sm font-semibold">
            {showThemeSelector ? 'Hide' : 'Themes'}
          </span>
        </motion.button>
      </motion.div>

      {/* Theme Selector Overlay */}
      <AnimatePresence>
        {showThemeSelector && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowThemeSelector(false);
              }
            }}
          >
            <motion.div
              className="bg-black/90 p-6 rounded-xl border border-gray-600 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Monitor className="text-blue-400" size={24} />
                  <h2 className="text-xl font-bold text-white">Choose Portfolio Theme</h2>
                </div>
                <button
                  onClick={() => setShowThemeSelector(false)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="text-gray-400" size={20} />
                </button>
              </div>

              {/* Current Theme Indicator */}
              {currentTheme && (
                <div className="mb-4 p-3 bg-blue-600/20 border border-blue-600/30 rounded-lg">
                  <p className="text-sm text-blue-300">
                    <span className="font-semibold">Current Theme:</span> {currentTheme}
                  </p>
                </div>
              )}

              {/* Theme Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {portfolioThemes.map((theme, index) => (
                  <motion.div
                    key={theme.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link href={theme.route}>
                      <motion.div
                        className={`relative p-4 rounded-lg border-2 border-gray-600 transition-all duration-300 cursor-pointer group overflow-hidden bg-gradient-to-br ${theme.bgGradient} ${currentTheme === theme.name ? 'ring-2 ring-blue-400' : ''}`}
                        whileHover={{ 
                          scale: 1.05, 
                          y: -5,
                          borderColor: theme.color,
                          boxShadow: `0 0 20px ${theme.color}40`
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Current Theme Badge */}
                        {currentTheme === theme.name && (
                          <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                            Current
                          </div>
                        )}

                        {/* Icon */}
                        <motion.div
                          className="flex items-center justify-center w-10 h-10 rounded-lg mb-3 mx-auto"
                          style={{ 
                            backgroundColor: `${theme.color}20`,
                            color: theme.color 
                          }}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {theme.icon}
                        </motion.div>

                        {/* Title */}
                        <h3 className="font-bold text-sm text-center mb-2 text-white group-hover:text-opacity-90">
                          {theme.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-gray-300 text-center leading-relaxed">
                          {theme.description}
                        </p>

                        {/* Hover Effect */}
                        <motion.div
                          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"
                          style={{ backgroundColor: theme.color }}
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Close Button */}
              <div className="text-center mt-6">
                <motion.button
                  onClick={() => setShowThemeSelector(false)}
                  className="px-6 py-2 bg-red-600/80 hover:bg-red-600 text-white font-semibold rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UniversalNavigation;
