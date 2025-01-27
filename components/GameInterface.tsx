'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import SkillIcon from './SkillIcon';
import MonsterSprite from './MonsterSprite';
import AttackEffects from './AttackEffects';
import TitleEffect from './TitleEffect';
import VictoryModal from './VictoryModal';
import WelcomeMessage from './WelcomeMessage';
import PowerUpEffect, { PowerUpType } from './PowerUpEffect';
import GameModeSelect, { GameMode } from './GameModeSelect';
import ChallengeMode from './ChallengeMode';
import MonsterDefeatEffect from './MonsterDefeatEffect';

interface Skill {
  name: string;
  level: number;
  category: string;
  description: string;
  achievements: string[];
  combo: number;
}

const skillsData: Skill[] = [
  { 
    name: 'React', 
    level: 90, 
    category: 'Frontend', 
    description: 'Building modern web applications',
    achievements: ['Component Master', 'Hook Warrior', 'Redux Sage'],
    combo: 0
  },
  { 
    name: 'Next.js', 
    level: 85, 
    category: 'Frontend', 
    description: 'Server-side rendering and routing',
    achievements: ['SSR Champion', 'Route Ninja', 'API Master'],
    combo: 0
  },
  { 
    name: 'TypeScript', 
    level: 80, 
    category: 'Language', 
    description: 'Type-safe JavaScript development',
    achievements: ['Type Guardian', 'Interface Legend', 'Generic Master'],
    combo: 0
  },
  { 
    name: 'Node.js', 
    level: 85, 
    category: 'Backend', 
    description: 'Server-side JavaScript runtime',
    achievements: ['Backend Warrior', 'API Architect', 'Performance Guru'],
    combo: 0
  },
  { 
    name: 'React Native', 
    level: 75, 
    category: 'mobile', 
    description: 'Building cross-platform mobile apps',
    achievements: ['Native Master', 'Cross Platform Champion', 'Performance Guru'],
    combo: 0
  },
  { 
    name: 'MYSQL', 
    level: 80, 
    category: 'Database', 
    description: 'Relational database management',
    achievements: ['Join Master', 'Query Optimizer', 'Schema Architect'],
    combo: 0
  },
  { 
    name: 'Firebase', 
    level: 70, 
    category: 'DevOps', 
    description: 'Cloud infrastructure and deployment',
    achievements: ['Cloud Warrior', 'Lambda Master', 'S3 Specialist'],
    combo: 0
  },
  { 
    name: 'Figma', 
    level: 75, 
    category: 'Design', 
    description: 'Vector graphics and design tools',
    achievements: ['Vector Wizard', 'Layer Magician', 'Color Expert'],
    combo: 0
  },
];

interface GameStats {
  totalClicks: number;
  maxCombo: number;
  timePlayed: number;
  startTime: number;
}

interface GameState {
  level: number;
  experience: number;
  totalClicks: number;
  maxCombo: number;
  timePlayed: number;
  startTime: number;
  powerUps: {
    doubleExp: boolean;
    comboExtender: boolean;
    multiLevel: boolean;
    criticalHit: boolean;
  };
  activePowerUp: {
    type: PowerUpType;
    position: { x: number; y: number };
  } | null;
  gameMode: GameMode;
  defeatEffects: Array<{
    id: number;
    position: { x: number; y: number };
    skillType: string;
    size: 'small' | 'medium' | 'large';
  }>;
}

const MAX_LEVEL = 100;

const GameInterface = ({ onClose }: { onClose: () => void }) => {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [skills, setSkills] = useState(skillsData);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showAttackEffect, setShowAttackEffect] = useState(false);
  const [currentAttack, setCurrentAttack] = useState<{
    type: 'fire' | 'lightning' | 'blizzard' | 'rock';
    x: number;
    y: number;
  } | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [exp, setExp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(Date.now());
  const [showCombo, setShowCombo] = useState(false);
  const [comboPosition, setComboPosition] = useState({ x: 0, y: 0 });
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showAchievement, setShowAchievement] = useState(false);
  const [currentAchievement, setCurrentAchievement] = useState('');
  const [levelUpSkills, setLevelUpSkills] = useState<Set<string>>(new Set());
  const [showVictory, setShowVictory] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showModeSelect, setShowModeSelect] = useState(true);
  const [gameState, setGameState] = useState<GameState>({
    level: 1,
    experience: 0,
    totalClicks: 0,
    maxCombo: 0,
    timePlayed: 0,
    startTime: Date.now(),
    powerUps: {
      doubleExp: false,
      comboExtender: false,
      multiLevel: false,
      criticalHit: false
    },
    activePowerUp: null,
    gameMode: 'normal',
    defeatEffects: []
  });

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  useEffect(() => {
    if (levelUpSkills.size > 0) {
      const timer = setTimeout(() => {
        setLevelUpSkills(new Set());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [levelUpSkills]);

  useEffect(() => {
    const allMaxLevel = skills.every(skill => skill.level >= MAX_LEVEL);
    if (allMaxLevel) {
      setShowVictory(true);
    }
  }, [skills]);

  useEffect(() => {
    if (!showWelcome && !showVictory) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          timePlayed: Math.floor((Date.now() - prev.startTime) / 1000)
        }));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showWelcome, showVictory]);

  const getRandomAttackType = () => {
    const attacks = ['fire', 'lightning', 'blizzard', 'rock'];
    return attacks[Math.floor(Math.random() * attacks.length)] as 'fire' | 'lightning' | 'blizzard' | 'rock';
  };

  const handleSkillClick = (skill: Skill, event: React.MouseEvent) => {
    if (skill.level >= MAX_LEVEL) return;

    const newLevel = skill.level + 1;
    const updatedSkills = skills.map(s =>
      s.name === skill.name ? { ...s, level: newLevel } : s
    );

    setSkills(updatedSkills);
    setGameState(prev => ({
      ...prev,
      totalClicks: prev.totalClicks + 1,
      maxCombo: Math.max(prev.maxCombo, combo + 1)
    }));

    // Show defeat effect when skill reaches max level
    if (newLevel === MAX_LEVEL) {
      const effectId = Date.now();
      const effectSize = combo > 50 ? 'large' : combo > 25 ? 'medium' : 'small';
      
      setGameState(prev => ({
        ...prev,
        defeatEffects: [...prev.defeatEffects, {
          id: effectId,
          position: { x: event.clientX, y: event.clientY },
          skillType: skill.name,
          size: effectSize
        }]
      }));
    }

    // Rest of the existing handleSkillClick code...
    setGameState(prev => ({
      ...prev,
      totalClicks: prev.totalClicks + 1,
      maxCombo: Math.max(prev.maxCombo, combo + 1)
    }));

    const currentTime = Date.now();
    const timeDiff = currentTime - lastClickTime;
    
    // Update combo
    let newCombo = combo;
    if (timeDiff < 1000) { // If clicked within 1 second
      newCombo += 1;
      setShowCombo(true);
      setComboPosition({ x: event.clientX, y: event.clientY });
      setTimeout(() => setShowCombo(false), 1000);
    } else {
      newCombo = 0;
    }
    setCombo(newCombo);
    setLastClickTime(currentTime);

    // Update skill and exp
    setSelectedSkill(skill);
    const expGain = 10 + (newCombo * 2); // More exp for combos
    setExp(prev => {
      const newExp = prev + expGain;
      if (newExp >= 100) {
        setCurrentLevel(lvl => lvl + 1);
        // Check for achievement unlock on level up
        const achievement = `Level ${currentLevel + 1} Master`;
        if (!unlockedAchievements.includes(achievement)) {
          unlockAchievement(achievement);
        }
        return newExp - 100;
      }
      return newExp;
    });

    // Check for skill-specific achievements
    if (newCombo === 3) {
      unlockAchievement(`${skill.name} Combo Master`);
    }

    // Update skill level based on combo
    setSkills(prev => prev.map(s => 
      s.name === skill.name 
        ? { ...s, combo: s.combo + 1 }
        : s
    ));

    // Check for level up (every 5 combos)
    if (newCombo > 0 && newCombo % 5 === 0) {
      setLevelUpSkills(prev => new Set(prev).add(skill.name));
      
      // Update skill level
      setSkills(prev => prev.map(s => 
        s.name === skill.name 
          ? { ...s, level: Math.min(s.level + 5, MAX_LEVEL) }
          : s
      ));
    }

    setCurrentAttack({
      type: getRandomAttackType(),
      x: event.clientX,
      y: event.clientY
    });

    // Try to spawn power-up after normal click processing
    trySpawnPowerUp({ x: event.clientX, y: event.clientY });
  };

  const unlockAchievement = (achievement: string) => {
    if (!unlockedAchievements.includes(achievement)) {
      setUnlockedAchievements(prev => [...prev, achievement]);
      setCurrentAchievement(achievement);
      setShowAchievement(true);
      setTimeout(() => setShowAchievement(false), 3000);
    }
  };

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const trySpawnPowerUp = (clickPosition: { x: number; y: number }) => {
    if (gameState.activePowerUp) return;

    const spawnChance = Math.random();
    if (spawnChance > 0.85) { // 15% chance to spawn power-up
      const powerUpTypes: PowerUpType[] = ['doubleExp', 'comboExtender', 'multiLevel', 'criticalHit'];
      const randomType = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];
      
      setGameState(prev => ({
        ...prev,
        activePowerUp: {
          type: randomType,
          position: clickPosition
        }
      }));

      // Auto-despawn power-up after 5 seconds
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          activePowerUp: null
        }));
      }, 5000);
    }
  };

  const handlePowerUpCollect = () => {
    if (!gameState.activePowerUp) return;

    const { type } = gameState.activePowerUp;
    
    switch (type) {
      case 'doubleExp':
        setGameState(prev => ({
          ...prev,
          powerUps: { ...prev.powerUps, doubleExp: true },
          activePowerUp: null
        }));
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            powerUps: { ...prev.powerUps, doubleExp: false }
          }));
        }, 10000);
        break;
      
      case 'comboExtender':
        setGameState(prev => ({
          ...prev,
          powerUps: { ...prev.powerUps, comboExtender: true },
          activePowerUp: null
        }));
        break;
      
      case 'multiLevel':
        setGameState(prev => ({
          ...prev,
          level: prev.level + 1,
          experience: 0,
          powerUps: { ...prev.powerUps, multiLevel: true },
          activePowerUp: null
        }));
        break;
      
      case 'criticalHit':
        setGameState(prev => ({
          ...prev,
          powerUps: { ...prev.powerUps, criticalHit: true },
          activePowerUp: null
        }));
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            powerUps: { ...prev.powerUps, criticalHit: false }
          }));
        }, 5000);
        break;
    }
  };

  const handleReset = () => {
    setSkills(skillsData.map(skill => ({ ...skill, level: 0 })));
    setShowVictory(false);
    setCombo(0);
    setExp(0);
    setCurrentLevel(1);
    setUnlockedAchievements([]);
    setSelectedSkill(null);
    setHoveredSkill(null);
    setCurrentAttack(null);
    setLevelUpSkills(new Set());
    setGameState({
      level: 1,
      experience: 0,
      totalClicks: 0,
      maxCombo: 0,
      timePlayed: 0,
      startTime: Date.now(),
      powerUps: {
        doubleExp: false,
        comboExtender: false,
        multiLevel: false,
        criticalHit: false
      },
      activePowerUp: null,
      gameMode: 'normal',
      defeatEffects: []
    });
  };

  const handleModeSelect = (mode: GameMode) => {
    if (mode === 'challenge') {
      setGameState(prev => ({
        ...prev,
        gameMode: mode
      }));
      setShowModeSelect(false);
    } else {
      setGameState(prev => ({
        ...prev,
        gameMode: mode
      }));
      setShowModeSelect(false);
      setShowWelcome(true);
    }
  };

  const getWelcomeContent = () => {
    if (gameState.gameMode === 'normal') {
      return {
        title: "Welcome to Code Master!",
        message: "Your mission is to master all coding skills. Click to gain experience and level up your abilities. Build combos for extra points!",
        buttonText: "Start Coding!"
      };
    } else {
      return {
        title: "Welcome to Challenge Mode!",
        message: "Survive the coding challenges! Watch your HP, dodge enemy attacks, and collect shields while mastering your skills. Are you ready?",
        buttonText: "Begin Challenge!"
      };
    }
  };

  const removeDefeatEffect = (effectId: number) => {
    setGameState(prev => ({
      ...prev,
      defeatEffects: prev.defeatEffects.filter(effect => effect.id !== effectId)
    }));
  };

  if (gameState.gameMode === 'challenge') {
    return (
      <ChallengeMode 
        onClose={() => {
          setGameState(prev => ({ ...prev, gameMode: 'normal' }));
          setShowModeSelect(true);
        }} 
      />
    );
  }

  return (
    <div 
      className="fixed inset-0 bg-black/90 z-40"
      style={{ cursor: 'none' }}
    >
      {/* Game Mode Selection */}
      <GameModeSelect
        isVisible={showModeSelect}
        onSelect={handleModeSelect}
      />

      {/* Welcome Message with Dynamic Content */}
      <WelcomeMessage 
        isVisible={showWelcome} 
        onStart={() => {
          setShowWelcome(false);
          setGameState(prev => ({ ...prev, startTime: Date.now() }));
        }}
        content={getWelcomeContent()}
      />

      {/* Victory Modal */}
      <VictoryModal 
        isVisible={showVictory} 
        onReset={handleReset}
        onClose={onClose}
        stats={gameState}
      />

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: hoveredSkill ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
        }}
      >
        <svg viewBox="0 0 32 32" className="w-full h-full drop-shadow-[0_0_2px_rgba(0,0,0,1)]">
          {hoveredSkill ? (
            // Attack cursor
            <g stroke="#ff0000" fill="none" strokeWidth="2">
              <path d="M16,0 L16,32 M0,16 L32,16" strokeWidth="1.5" />
              <path d="M8,8 L24,24 M8,24 L24,8" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="12" className="animate-pulse" />
              <circle cx="16" cy="16" r="4" fill="#ff0000" />
            </g>
          ) : (
            // Default cursor
            <g stroke="#00ff00" fill="none" strokeWidth="2">
              <path d="M16,0 L16,32 M0,16 L32,16" strokeWidth="1.5" />
              <circle cx="16" cy="16" r="8" />
              <circle cx="16" cy="16" r="12" className="animate-pulse" />
            </g>
          )}
        </svg>
      </motion.div>

      {/* Attack Effects */}
      <AnimatePresence>
        {currentAttack && (
          <AttackEffects
            type={currentAttack.type}
            x={currentAttack.x}
            y={currentAttack.y}
            onComplete={() => setCurrentAttack(null)}
          />
        )}
      </AnimatePresence>

      {/* Power-up Effects */}
      <AnimatePresence>
        {gameState.activePowerUp && (
          <PowerUpEffect
            type={gameState.activePowerUp.type}
            position={gameState.activePowerUp.position}
            onCollect={handlePowerUpCollect}
          />
        )}
      </AnimatePresence>

      {/* Monster Defeat Effects */}
      <AnimatePresence>
        {gameState.defeatEffects.map(effect => (
          <MonsterDefeatEffect
            key={effect.id}
            position={effect.position}
            skillType={effect.skillType}
            size={effect.size}
            onComplete={() => removeDefeatEffect(effect.id)}
          />
        ))}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8 h-full relative z-30">
        {/* Stats Bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="pixel-border p-4 min-w-[200px]">
            <p className="text-[#00ff00] pixel-text">LEVEL {currentLevel}</p>
            <div className="w-full h-2 bg-gray-700 mt-2 relative overflow-hidden">
              <motion.div 
                className="h-full bg-[#00ff00] absolute left-0 top-0"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${Math.min(exp, 100)}%`,
                }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
              />
            </div>
            <p className="text-[#00ff00] pixel-text text-sm mt-1 whitespace-nowrap">
              EXP: {exp}/100
            </p>
          </div>
          <div className="pixel-border p-4 min-w-[180px] text-center">
            <p className="text-[#00ff00] pixel-text whitespace-nowrap">COMBO: {combo}x</p>
            <p className="text-[#00ff00] pixel-text text-sm whitespace-nowrap">
              Achievements: {unlockedAchievements.length}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="retro-button whitespace-nowrap"
          >
            [EXIT GAME]
          </button>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: index * 0.1 }}
              className="relative pixel-border p-4 bg-black group z-20"
              onClick={(e) => handleSkillClick(skill, e)}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="relative h-48">
                <SkillIcon name={skill.name} />
                <MonsterSprite 
                  skillName={skill.name} 
                  level={skill.level}
                  isHovered={hoveredSkill === skill.name}
                  isSelected={selectedSkill?.name === skill.name}
                  isDefeated={skill.level >= MAX_LEVEL}
                />
              </div>
              <div className="relative z-10">
                <TitleEffect
                  text={skill.name}
                  isLevelUp={levelUpSkills.has(skill.name)}
                  color={skill.level >= 90 ? '#00ff00' : skill.level >= 70 ? '#ffff00' : '#ff9900'}
                />
              </div>
              <div className="w-full h-2 bg-gray-700 relative z-10">
                <motion.div
                  className="h-full bg-[#00ff00]"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${skill.level}%`,
                    backgroundColor: hoveredSkill === skill.name ? '#00ff00' : '#00cc00'
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
              <motion.p 
                className="text-sm text-gray-400 mt-2 pixel-text"
                animate={{
                  opacity: hoveredSkill === skill.name ? 1 : 0.7
                }}
              >
                {skill.category}
              </motion.p>
              {skill.combo > 0 && (
                <motion.div 
                  className="absolute top-2 right-2 bg-[#00ff00] text-black px-2 py-1 text-sm pixel-text"
                  animate={{
                    scale: hoveredSkill === skill.name ? [1, 1.2, 1] : 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  x{skill.combo}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Selected Skill Details */}
        {selectedSkill && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="pixel-border p-4 mt-8"
          >
            <h3 className="text-[#00ff00] pixel-text mb-2">
              {selectedSkill.name} - Skill Details
            </h3>
            <p className="text-[#00ff00] mb-4">{selectedSkill.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-[#00ff00] pixel-text mb-2">Stats</h4>
                <p className="text-[#00ff00]">Power Level: {selectedSkill.level}/100</p>
                <p className="text-[#00ff00]">Class: {selectedSkill.category}</p>
                <p className="text-[#00ff00]">Combo Hits: {selectedSkill.combo}</p>
              </div>
              <div>
                <h4 className="text-[#00ff00] pixel-text mb-2">Achievements</h4>
                <ul className="text-[#00ff00] text-sm">
                  {selectedSkill.achievements.map((achievement, index) => (
                    <li 
                      key={achievement}
                      className={`${unlockedAchievements.includes(achievement) ? 'text-[#00ff00]' : 'text-gray-600'}`}
                    >
                      [{unlockedAchievements.includes(achievement) ? 'X' : ' '}] {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Combo Popup */}
        {showCombo && (
          <motion.div
            initial={{ scale: 0, x: comboPosition.x, y: comboPosition.y }}
            animate={{ scale: 1, y: comboPosition.y - 50 }}
            exit={{ scale: 0 }}
            className="fixed text-[#ff00ff] pixel-text text-2xl pointer-events-none"
          >
            {combo}x COMBO!
          </motion.div>
        )}

        {/* Achievement Popup */}
        {showAchievement && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            className="fixed bottom-4 right-4 pixel-border p-4 bg-black/90"
          >
            <h4 className="text-[#ff00ff] pixel-text">Achievement Unlocked!</h4>
            <p className="text-[#00ff00] pixel-text">{currentAchievement}</p>
          </motion.div>
        )}
      </div>

      {/* Power-up Status Indicators */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {gameState.powerUps.doubleExp && (
          <motion.div
            className="pixel-border p-2 bg-black/50 text-[#ffff00] pixel-text"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
          >
            2X EXP ACTIVE!
          </motion.div>
        )}
        {gameState.powerUps.criticalHit && (
          <motion.div
            className="pixel-border p-2 bg-black/50 text-[#ff0000] pixel-text"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            exit={{ x: 100 }}
          >
            CRITICAL HITS ACTIVE!
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameInterface;
