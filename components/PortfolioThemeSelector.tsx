'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Code2, 
  Newspaper, 
  Palette, 
  Zap, 
  Paintbrush, 
  Sparkles, 
  TreePine, 
  Brain,
  ChevronDown,
  ChevronUp,
  Monitor,
  Gamepad2
} from 'lucide-react';

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  route: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  preview: string;
}

const portfolioThemes: ThemeOption[] = [
  {
    id: 'developer-playground',
    name: 'Developer Playground',
    description: 'Interactive terminal-style developer experience',
    route: '/portfolio',
    icon: <Code2 size={24} />,
    color: '#00fd00',
    bgGradient: 'from-black via-gray-900 to-black',
    preview: 'Terminal UI • Interactive Commands • Code Aesthetics'
  },
  {
    id: 'vintage-newspaper',
    name: 'Vintage Newspaper',
    description: 'Classic newspaper layout with professional content',
    route: '/vintage-newspaper',
    icon: <Newspaper size={24} />,
    color: '#8B4513',
    bgGradient: 'from-amber-50 via-yellow-50 to-amber-100',
    preview: 'Classic Typography • News Format • Timeless Design'
  },
  {
    id: 'art-deco',
    name: 'Art Deco Classic',
    description: 'Elegant 1920s-inspired luxury design',
    route: '/art-deco',
    icon: <Palette size={24} />,
    color: '#DAA520',
    bgGradient: 'from-amber-900 via-yellow-800 to-amber-900',
    preview: 'Luxury Aesthetics • Golden Era • Sophisticated Layout'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk Edition',
    description: 'Futuristic neon-lit digital experience',
    route: '/cyberpunk',
    icon: <Zap size={24} />,
    color: '#00FFFF',
    bgGradient: 'from-purple-900 via-blue-900 to-cyan-900',
    preview: 'Neon Effects • Futuristic UI • Digital Aesthetics'
  },
  {
    id: 'watercolor',
    name: 'Watercolor Artist',
    description: 'Masculine artistic design with bold colors',
    route: '/watercolor',
    icon: <Paintbrush size={24} />,
    color: '#4169E1',
    bgGradient: 'from-slate-800 via-blue-800 to-teal-800',
    preview: 'Artistic Flair • Bold Colors • Creative Expression'
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Modern glass-effect translucent design',
    route: '/glassmorphism',
    icon: <Sparkles size={24} />,
    color: '#60A5FA',
    bgGradient: 'from-slate-800 via-blue-900 to-teal-800',
    preview: 'Glass Effects • Modern UI • Translucent Beauty'
  },
  {
    id: 'nature',
    name: 'Nature/Organic',
    description: 'Earth-inspired sustainable design',
    route: '/nature',
    icon: <TreePine size={24} />,
    color: '#22C55E',
    bgGradient: 'from-green-800 via-emerald-700 to-teal-800',
    preview: 'Organic Design • Natural Colors • Eco-Friendly'
  },
  {
    id: 'ai-generator',
    name: 'AI Code Generator',
    description: 'Cutting-edge AI-powered developer showcase',
    route: '/ai-generator',
    icon: <Brain size={24} />,
    color: '#A855F7',
    bgGradient: 'from-slate-900 via-purple-900 to-blue-900',
    preview: 'AI-Powered • Neural Networks • Future Tech'
  }
];

interface PortfolioThemeSelectorProps {
  isExpanded: boolean;
  onToggle: () => void;
}

const PortfolioThemeSelector: React.FC<PortfolioThemeSelectorProps> = ({ isExpanded, onToggle }) => {
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null);

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      {/* Theme Grid */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 bg-black/50 pixel-border-sm mt-2 max-h-[80vh] overflow-y-auto">
              {portfolioThemes.map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredTheme(theme.id)}
                  onHoverEnd={() => setHoveredTheme(null)}
                >
                  <Link href={theme.route}>
                    <motion.div
                      className={`relative p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer group overflow-hidden bg-gradient-to-br ${theme.bgGradient}`}
                      style={{ 
                        borderColor: hoveredTheme === theme.id ? theme.color : '#333',
                        boxShadow: hoveredTheme === theme.id ? `0 0 20px ${theme.color}40` : 'none'
                      }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="w-full h-full bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        {/* Icon */}
                        <motion.div
                          className="flex items-center justify-center w-12 h-12 rounded-lg mb-3 mx-auto"
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
                        <h3 
                          className="font-bold text-sm text-center mb-2 transition-colors"
                          style={{ 
                            color: hoveredTheme === theme.id ? theme.color : '#fff' 
                          }}
                        >
                          {theme.name}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-gray-300 text-center mb-3 leading-relaxed">
                          {theme.description}
                        </p>

                        {/* Preview Features */}
                        <div className="text-xs text-center opacity-70 mb-3">
                          <span style={{ color: theme.color }}>
                            {theme.preview}
                          </span>
                        </div>

                        {/* Action Button */}
                        <motion.div
                          className="text-center"
                          whileHover={{ scale: 1.1 }}
                        >
                          <span 
                            className="inline-block px-3 py-1 rounded text-xs font-bold border transition-all"
                            style={{ 
                              borderColor: theme.color,
                              color: hoveredTheme === theme.id ? '#000' : theme.color,
                              backgroundColor: hoveredTheme === theme.id ? theme.color : 'transparent'
                            }}
                          >
                            VIEW PROFILE
                          </span>
                        </motion.div>
                      </div>

                      {/* Hover Effect Overlay */}
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        style={{ backgroundColor: theme.color }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Close Button */}
            <div className="text-center mt-4">
              <motion.button
                onClick={onToggle}
                className="px-8 py-3 bg-red-600/80 hover:bg-red-600 text-white font-bold pixel-border-sm transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="flex items-center gap-2">
                  <span>✕</span>
                  <span className="tracking-wider">CLOSE THEMES</span>
                  <span>✕</span>
                </div>
              </motion.button>
            </div>

            {/* Footer Note */}
            <div className="text-center mt-4 p-4 bg-black/30 pixel-border-sm">
              <p className="text-xs text-gray-400">
                💡 <span className="text-[#00fd00]">Pro Tip:</span> Each theme contains the same professional content 
                but offers a completely unique visual and interactive experience. 
                Try them all to see which style resonates with you!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PortfolioThemeSelector;
