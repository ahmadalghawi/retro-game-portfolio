'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xp: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  category: 'games' | 'skills' | 'projects' | 'general';
  progress?: number;
  date?: string;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'memory_master',
    title: 'Memory Master',
    description: 'Complete the Memory Game with a perfect streak',
    icon: '🧠',
    xp: 500,
    rarity: 'rare',
    category: 'games',
    progress: 80
  },
  {
    id: 'speed_demon',
    title: 'Speed Demon',
    description: 'Achieve 100+ WPM in the Typing Game',
    icon: '⚡',
    xp: 1000,
    rarity: 'epic',
    category: 'games',
    progress: 60
  },
  {
    id: 'snake_charmer',
    title: 'Snake Charmer',
    description: 'Score 50+ points in Snake Game',
    icon: '🐍',
    xp: 750,
    rarity: 'rare',
    category: 'games',
    progress: 40
  },
  {
    id: 'arcade_champion',
    title: 'Arcade Champion',
    description: 'Earn achievements in all games',
    icon: '👑',
    xp: 2000,
    rarity: 'legendary',
    category: 'games',
    progress: 20
  },
  {
    id: 'code_master',
    title: 'Code Master',
    description: 'Complete all coding challenges',
    icon: '💻',
    xp: 1500,
    rarity: 'epic',
    category: 'skills',
    progress: 90
  },
  {
    id: 'project_wizard',
    title: 'Project Wizard',
    description: 'Complete 5 major projects',
    icon: '🔮',
    xp: 2000,
    rarity: 'legendary',
    category: 'projects',
    progress: 70
  }
];

const AchievementGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState<Achievement['category'] | 'all'>('all');
  const [selectedRarity, setSelectedRarity] = useState<Achievement['rarity'] | 'all'>('all');

  const categories = [
    { id: 'all', name: 'All', icon: '🏆' },
    { id: 'games', name: 'Games', icon: '🎮' },
    { id: 'skills', name: 'Skills', icon: '📚' },
    { id: 'projects', name: 'Projects', icon: '🚀' },
    { id: 'general', name: 'General', icon: '⭐' }
  ];

  const rarityColors = {
    common: 'text-gray-400',
    rare: 'text-[#4CAF50]',
    epic: 'text-[#9C27B0]',
    legendary: 'text-[#FFD700]'
  };

  const filteredAchievements = ACHIEVEMENTS.filter(achievement => {
    if (selectedCategory !== 'all' && achievement.category !== selectedCategory) return false;
    if (selectedRarity !== 'all' && achievement.rarity !== selectedRarity) return false;
    return true;
  });

  return (
    <section id="AchievementGallery" className="py-32 bg-black relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(0, 255, 0, 0.2) 2%, transparent 0%),
            radial-gradient(circle at 75px 75px, rgba(255, 0, 255, 0.2) 2%, transparent 0%)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.3
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="pixel-border bg-black p-4 mb-12 inline-block">
          <h2 className="text-[#00ff00] text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-[#ff00ff]">&lt;</span> ACHIEVEMENTS <span className="text-[#ff00ff]">&gt;</span>
          </h2>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          {categories.map(category => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id as Achievement['category'] | 'all')}
              className={`pixel-border-sm px-4 py-2 ${
                selectedCategory === category.id
                  ? 'bg-[#00ff00]/20 text-[#00ff00]'
                  : 'bg-black/50 text-gray-400 hover:text-[#00ff00] hover:bg-[#00ff00]/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </div>

        {/* Rarity Filter */}
        <div className="mb-12 flex flex-wrap gap-4">
          {['all', 'common', 'rare', 'epic', 'legendary'].map(rarity => (
            <motion.button
              key={rarity}
              onClick={() => setSelectedRarity(rarity as Achievement['rarity'] | 'all')}
              className={`pixel-border-sm px-4 py-2 ${
                selectedRarity === rarity
                  ? 'bg-[#00ff00]/20 text-[#00ff00]'
                  : 'bg-black/50 text-gray-400 hover:text-[#00ff00] hover:bg-[#00ff00]/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredAchievements.map(achievement => (
            <motion.div
              key={achievement.id}
              className="pixel-border p-6 bg-black relative group"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{achievement.icon}</span>
                <div className="flex-1">
                  <h3 className="text-[#00ff00] text-xl mb-1">{achievement.title}</h3>
                  <span className={`text-sm ${rarityColors[achievement.rarity]}`}>
                    {achievement.rarity.toUpperCase()}
                  </span>
                  <p className="text-[#00ff00]/80 mt-2 text-sm">{achievement.description}</p>
                  
                  {/* Progress Bar */}
                  {achievement.progress !== undefined && (
                    <div className="mt-4">
                      <div className="h-2 bg-black/50 rounded-full overflow-hidden pixel-border-sm">
                        <motion.div
                          className="h-full bg-[#00ff00]"
                          initial={{ width: 0 }}
                          animate={{ width: `${achievement.progress}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-[#00ff00]/60">{achievement.progress}%</span>
                        <span className="text-xs text-[#00ff00]/60">+{achievement.xp} XP</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border border-[#00ff00]/0 group-hover:border-[#00ff00]/50 transition-colors duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementGallery;
