'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import HealthSystem from './HealthSystem';
import BossVictoryModal from './BossVictoryModal';
import GameOverModal from './GameOverModal';
import Achievement, { AchievementData } from './Achievement';
import ComboEffect from './ComboEffect';

interface BossBattleProps {
  onVictory: () => void;
  onClose: () => void;
}

interface CodeFragment {
  id: number;
  type: string;
  position: { x: number; y: number };
  speed: number;
  size: number;
  rotation: number;
}

// Game Balance Constants
const BOSS_MAX_HP = 1000;          // Boss total health points
const PLAYER_MAX_HP = 200;         // Player total health points
const INITIAL_SPAWN_RATE = 1500   // Time between fragments spawning (milliseconds) - Higher = slower spawning
const MIN_SPAWN_RATE = 400;        // Minimum time between spawns - Higher = slower maximum speed
const SPEED_INCREASE_INTERVAL = 12000;  // How often the game speeds up (milliseconds) - Higher = slower progression
const FRAGMENT_BASE_SPEED = 4;     // Base falling speed of fragments - Lower = slower falling
const FRAGMENT_SPEED_VARIANCE = 0.5; // Random speed variation - Lower = more consistent speeds
const MISSED_FRAGMENT_DAMAGE = 5;  // Damage taken when missing a fragment
const COMBO_THRESHOLD = 5;         // Combo needed for special effects

const ACHIEVEMENTS: AchievementData[] = [
  {
    id: 'first_blood',
    title: 'First Blood',
    description: 'Land your first hit on the JavaScript Boss',
    icon: '🩸'
  },
  {
    id: 'combo_master',
    title: 'Combo Master',
    description: 'Reach a 10x combo',
    icon: '🔥'
  },
  {
    id: 'combo_legend',
    title: 'Combo Legend',
    description: 'Reach a 50x combo',
    icon: '👑'
  },
  {
    id: 'combo_god',
    title: 'Combo God',
    description: 'Reach a 100x combo',
    icon: '⚜️'
  },
  {
    id: 'survivor',
    title: 'Survivor',
    description: 'Survive for 1 minute',
    icon: '⏱️'
  },
  {
    id: 'dragon_slayer',
    title: 'Dragon Slayer',
    description: 'Defeat the JavaScript Boss',
    icon: '🐉'
  },
  {
    id: 'critical_hit',
    title: 'Critical Hit',
    description: 'Land a critical hit',
    icon: '⚡'
  }
];

const PLAY_AREA_PADDING = 100; // Pixels from screen edge
const BACKGROUND_PARTICLES = 50;

const BossBattle = ({ onVictory, onClose }: BossBattleProps) => {
  const [bossHP, setBossHP] = useState(BOSS_MAX_HP);
  const [playerHP, setPlayerHP] = useState(PLAYER_MAX_HP);
  const [playerShield, setPlayerShield] = useState(0);
  const [bossPosition, setBossPosition] = useState({ x: 0, y: 0 });
  const [bossSize, setBossSize] = useState(1);
  const [bossRotation, setBossRotation] = useState(0);
  const [codeFragments, setCodeFragments] = useState<CodeFragment[]>([]);
  const [spawnRate, setSpawnRate] = useState(INITIAL_SPAWN_RATE);
  const [timePassed, setTimePassed] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [showVictory, setShowVictory] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [totalDamageDealt, setTotalDamageDealt] = useState(0);
  const [hitEffects, setHitEffects] = useState<Array<{ id: number; x: number; y: number; color: string }>>([]);
  const [damageEffects, setDamageEffects] = useState<Array<{ id: number; x: number; y: number; damage: number }>>([]);
  const [isEnraged, setIsEnraged] = useState(false);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [currentAchievement, setCurrentAchievement] = useState<AchievementData | null>(null);
  const [comboEffects, setComboEffects] = useState<Array<{ id: number; x: number; y: number; combo: number }>>([]);
  const [backgroundParticles] = useState(() => 
    Array.from({ length: BACKGROUND_PARTICLES }, () => ({
      id: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 1 + 0.5,
    }))
  );
  const [screenShake, setScreenShake] = useState({ x: 0, y: 0 });

  const codeTypes = [
    {
      type: 'JavaScript',
      color: '#f7df1e',
      icon: '⚡',
      damage: 20,
      critChance: 0.2,
      critMultiplier: 2,
    },
    {
      type: 'React',
      color: '#61dafb',
      icon: '⚛️',
      damage: 15,
      critChance: 0.3,
      critMultiplier: 1.8,
    },
    {
      type: 'TypeScript',
      color: '#3178c6',
      icon: '📘',
      damage: 25,
      critChance: 0.15,
      critMultiplier: 2.2,
    },
    {
      type: 'HTML',
      color: '#e34c26',
      icon: '🌐',
      damage: 10,
      critChance: 0.4,
      critMultiplier: 1.5,
    },
    {
      type: 'CSS',
      color: '#264de4',
      icon: '🎨',
      damage: 12,
      critChance: 0.35,
      critMultiplier: 1.6,
    }
  ];

  const unlockAchievement = useCallback((id: string) => {
    if (!unlockedAchievements.includes(id)) {
      const achievement = ACHIEVEMENTS.find(a => a.id === id);
      if (achievement) {
        setUnlockedAchievements(prev => [...prev, id]);
        setCurrentAchievement(achievement);
      }
    }
  }, [unlockedAchievements]);

  const triggerScreenShake = useCallback((intensity: number = 1) => {
    const shake = () => {
      setScreenShake({
        x: (Math.random() - 0.5) * 10 * intensity,
        y: (Math.random() - 0.5) * 10 * intensity,
      });
    };

    // Rapid shakes
    let shakeCount = 0;
    const shakeInterval = setInterval(() => {
      shake();
      shakeCount++;
      if (shakeCount >= 5) {
        clearInterval(shakeInterval);
        setScreenShake({ x: 0, y: 0 }); // Reset position
      }
    }, 50);
  }, []);

  const handleFragmentClick = useCallback((fragment: CodeFragment) => {
    if (showVictory) return;
    
    const hitPosition = { x: fragment.position.x, y: fragment.position.y };
    
    // Add hit effect
    setHitEffects(prev => [...prev, {
      id: Date.now(),
      x: hitPosition.x,
      y: hitPosition.y,
      color: codeTypes.find(t => t.type === fragment.type)?.color || '#ffffff'
    }]);

    // Screen shake based on combo
    triggerScreenShake(Math.min(combo / 10, 2));

    // Update combo and score
    setCombo(prev => {
      const newCombo = prev + 1;
      if (newCombo > maxCombo) {
        setMaxCombo(newCombo);
      }
      return newCombo;
    });

    // Remove the clicked fragment immediately
    setCodeFragments(prev => prev.filter(f => f.id !== fragment.id));
    setTotalClicks(prev => prev + 1);

    // Calculate damage
    const typeInfo = codeTypes.find(t => t.type === fragment.type)!;
    const isCritical = Math.random() < typeInfo.critChance;
    const baseDamage = typeInfo.damage * (1 + combo * 0.1);
    const finalDamage = Math.round(isCritical ? baseDamage * typeInfo.critMultiplier : baseDamage);

    // Update boss HP
    setBossHP(prev => {
      const newHP = Math.max(0, prev - finalDamage);
      
      // Check for achievements
      if (!unlockedAchievements.includes('first_blood')) {
        unlockAchievement('first_blood');
      }
      if (isCritical && !unlockedAchievements.includes('critical_hit')) {
        unlockAchievement('critical_hit');
      }
      if (newHP === 0 && !showGameOver) {
        unlockAchievement('dragon_slayer');
        setShowVictory(true);
      }
      
      return newHP;
    });

    // Update total damage
    setTotalDamageDealt(prev => prev + finalDamage);
  }, [combo, showVictory, maxCombo, bossHP]);

  // Boss movement
  useEffect(() => {
    const interval = setInterval(() => {
      const angle = (timePassed / 1000) * (isEnraged ? 2 : 1);
      const radius = isEnraged ? 100 + Math.sin(timePassed / 500) * 50 : 50;
      setBossPosition({
        x: Math.sin(angle) * radius,
        y: Math.cos(angle) * radius,
      });
      setBossRotation(Math.sin(timePassed / 1000) * 15);
      setBossSize(1 + Math.sin(timePassed / 800) * 0.2);
    }, 16);

    return () => clearInterval(interval);
  }, [timePassed, isEnraged]);

  // Spawn new code fragments
  const spawnFragment = useCallback(() => {
    const type = codeTypes[Math.floor(Math.random() * codeTypes.length)];
    const playAreaWidth = window.innerWidth - (PLAY_AREA_PADDING * 2);
    const x = PLAY_AREA_PADDING + (Math.random() * playAreaWidth);
    
    const newFragment: CodeFragment = {
      id: Date.now(),
      type: type.type,
      position: {
        x,
        y: -50
      },
      speed: FRAGMENT_BASE_SPEED + (Math.random() * FRAGMENT_SPEED_VARIANCE),
      rotation: Math.random() * 360,
      size: 0.8 + Math.random() * 0.4
    };
    setCodeFragments(prev => [...prev, newFragment]);
  }, []);

  // Update fragment positions
  useEffect(() => {
    const interval = setInterval(() => {
      setCodeFragments(prev => {
        const updatedFragments = prev.map(fragment => {
          let newX = fragment.position.x;
          
          // Bounce off screen edges
          if (newX < PLAY_AREA_PADDING) {
            newX = PLAY_AREA_PADDING;
          } else if (newX > window.innerWidth - PLAY_AREA_PADDING) {
            newX = window.innerWidth - PLAY_AREA_PADDING;
          }

          return {
            ...fragment,
            position: {
              x: newX,
              y: fragment.position.y + fragment.speed,
            },
            rotation: fragment.rotation + 2,
          };
        });

        // Check for fragments that hit the bottom
        const missedFragments = updatedFragments.filter(
          fragment => fragment.position.y >= window.innerHeight - PLAY_AREA_PADDING
        );

        // Apply damage for missed fragments
        if (missedFragments.length > 0 && !showVictory) {
          const totalDamage = missedFragments.length * MISSED_FRAGMENT_DAMAGE;
          setPlayerHP(prev => {
            const newHP = Math.max(0, prev - totalDamage);
            if (newHP === 0 && !showVictory) {
              setShowGameOver(true);
            }
            return newHP;
          });

          // Add damage effects
          missedFragments.forEach(fragment => {
            setDamageEffects(prev => [...prev, {
              id: Date.now() + Math.random(),
              x: fragment.position.x,
              y: window.innerHeight - 100,
              damage: MISSED_FRAGMENT_DAMAGE
            }]);
          });

          // Reset combo when hit
          setCombo(0);
        }

        return updatedFragments.filter(
          fragment => fragment.position.y < window.innerHeight - PLAY_AREA_PADDING
        );
      });
    }, 16);

    return () => clearInterval(interval);
  }, [showVictory]);

  // Remove damage effects after animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDamageEffects([]);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [damageEffects]);

  // Spawn fragments at current rate
  useEffect(() => {
    const interval = setInterval(spawnFragment, spawnRate);
    return () => clearInterval(interval);
  }, [spawnFragment, spawnRate]);

  // Increase difficulty over time
  useEffect(() => {
    const interval = setInterval(() => {
      setTimePassed(prev => prev + 1000);
      setSpawnRate(prev => {
        const decrease = Math.max(50, prev * 0.05); // Slower speed increase (was 0.1)
        return Math.max(MIN_SPAWN_RATE, prev - decrease);
      });
    }, SPEED_INCREASE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  // Check for enraged state
  useEffect(() => {
    if (bossHP <= BOSS_MAX_HP * 0.3 && !isEnraged) {
      setIsEnraged(true);
      setSpawnRate(prev => prev * 0.7); // Increase spawn rate when enraged
    }
  }, [bossHP, isEnraged]);

  // Check for time-based achievements
  useEffect(() => {
    if (timePassed >= 60000 && !unlockedAchievements.includes('survivor')) {
      unlockAchievement('survivor');
    }
  }, [timePassed, unlockedAchievements, unlockAchievement]);

  // Remove combo effects after animation
  useEffect(() => {
    const timeout = setTimeout(() => {
      setComboEffects([]);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [comboEffects]);

  if (showGameOver) {
    return (
      <GameOverModal
        stats={{
          timeSurvived: timePassed,
          maxCombo,
          totalClicks,
          damageDealt: totalDamageDealt,
        }}
        onClose={onClose}
      />
    );
  }

  if (showVictory) {
    return (
      <BossVictoryModal
        stats={{
          timePassed,
          maxCombo,
          totalClicks,
          damageDealt: totalDamageDealt,
        }}
        onClose={onVictory}
      />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/90 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        transform: `translate(${screenShake.x}px, ${screenShake.y}px)`,
      }}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background Grid */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Enhanced Moving Particles */}
        {backgroundParticles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-br from-white/30 to-transparent"
            style={{
              width: particle.size,
              height: particle.size,
              filter: 'blur(1px)',
            }}
            animate={{
              y: ['0%', '100%'],
              x: [
                `${particle.x}%`,
                `${particle.x + (Math.random() * 20 - 10)}%`,
                `${particle.x}%`
              ],
              scale: [1, 1.5, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 20 / particle.speed,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Dynamic Glowing Orbs */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: isEnraged
              ? [
                  'radial-gradient(circle at 30% 30%, #ff000040 0%, transparent 50%), radial-gradient(circle at 70% 70%, #ff000030 0%, transparent 40%)',
                  'radial-gradient(circle at 70% 30%, #ff000040 0%, transparent 50%), radial-gradient(circle at 30% 70%, #ff000030 0%, transparent 40%)',
                ]
              : [
                  'radial-gradient(circle at 30% 30%, #ffff0020 0%, transparent 50%), radial-gradient(circle at 70% 70%, #00ffff20 0%, transparent 40%)',
                  'radial-gradient(circle at 70% 30%, #ffff0020 0%, transparent 50%), radial-gradient(circle at 30% 70%, #00ffff20 0%, transparent 40%)',
                ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        {/* Combat Area Boundaries with Enhanced Effects */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Left Boundary */}
          <motion.div
            className="absolute left-[100px] top-0 bottom-0 w-1"
            style={{
              background: 'linear-gradient(to bottom, transparent, #ffffff40, transparent)',
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              boxShadow: [
                '0 0 10px #ffffff33, 0 0 20px #ffffff22',
                '0 0 20px #ffffff44, 0 0 40px #ffffff33',
                '0 0 10px #ffffff33, 0 0 20px #ffffff22',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Right Boundary */}
          <motion.div
            className="absolute right-[100px] top-0 bottom-0 w-1"
            style={{
              background: 'linear-gradient(to bottom, transparent, #ffffff40, transparent)',
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              boxShadow: [
                '0 0 10px #ffffff33, 0 0 20px #ffffff22',
                '0 0 20px #ffffff44, 0 0 40px #ffffff33',
                '0 0 10px #ffffff33, 0 0 20px #ffffff22',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          {/* Bottom Boundary */}
          <motion.div
            className="absolute left-[100px] right-[100px] bottom-[100px] h-1"
            style={{
              background: 'linear-gradient(to right, transparent, #ffffff40, transparent)',
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
              boxShadow: [
                '0 0 10px #ffffff33, 0 0 20px #ffffff22',
                '0 0 20px #ffffff44, 0 0 40px #ffffff33',
                '0 0 10px #ffffff33, 0 0 20px #ffffff22',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Enhanced Enraged Effect */}
        {isEnraged && (
          <>
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundColor: ['#ff000015', '#ff000030', '#ff000015'],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23FF0000" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E")',
                backgroundSize: '100px 100px',
              }}
              animate={{
                backgroundPosition: ['0px 0px', '100px 100px'],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </>
        )}
      </div>

      {/* Safe Area Container */}
      <div className="relative w-full h-full max-w-7xl mx-auto px-6">
        {/* Achievement Display */}
        <AnimatePresence>
          {currentAchievement && (
            <Achievement
              achievement={currentAchievement}
              onComplete={() => setCurrentAchievement(null)}
            />
          )}
        </AnimatePresence>

        {/* Boss HP Bar */}
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
          <HealthSystem
            currentHP={bossHP}
            maxHP={BOSS_MAX_HP}
            shield={0}
            isBoss={true}
          />
        </div>

        {/* Player HP Bar */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
          <HealthSystem
            currentHP={playerHP}
            maxHP={PLAYER_MAX_HP}
            shield={playerShield}
          />
        </div>

        {/* Stats Display */}
        <div className="fixed top-8 right-8 pixel-border p-6 bg-black/70 backdrop-blur-sm rounded-lg">
          <div className="space-y-2">
            <div className="text-[#00ff00] pixel-text text-lg">
              ⏱️ Time: {Math.floor(timePassed / 1000)}s
            </div>
            <motion.div
              className="text-[#ffff00] pixel-text text-lg"
              animate={combo >= COMBO_THRESHOLD ? {
                scale: [1, 1.1, 1],
                color: [
                  '#ffff00',
                  '#ff8800',
                  '#ff0000',
                  '#ff00ff',
                  '#ffff00'
                ]
              } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              🔥 Combo: x{combo}
            </motion.div>
            <div className="text-[#00ffff] pixel-text text-lg">
              🏆 Max Combo: x{maxCombo}
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-4 overflow-hidden rounded-lg">
          {isEnraged && (
            <motion.div
              className="absolute inset-0"
              animate={{
                backgroundColor: ['#ff000015', '#ff000030', '#ff000015'],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          )}
        </div>

        {/* Hit Effects */}
        <AnimatePresence>
          {hitEffects.map(effect => (
            <motion.div
              key={effect.id}
              className="absolute pointer-events-none"
              style={{ left: effect.x, top: effect.y }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="w-16 h-16 rounded-full"
                style={{
                  backgroundColor: effect.color,
                  boxShadow: `0 0 20px ${effect.color}`,
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Damage Effects */}
        <AnimatePresence>
          {damageEffects.map(effect => (
            <motion.div
              key={effect.id}
              className="absolute pointer-events-none"
              style={{ left: effect.x, top: effect.y }}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -50, scale: 1.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="pixel-text text-[#ff0000] text-2xl font-bold whitespace-nowrap drop-shadow-glow-red">
                -{effect.damage} HP
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Boss Character Container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="absolute"
            animate={{
              x: [bossPosition.x - 200, bossPosition.x + 200],
              y: [bossPosition.y - 100, bossPosition.y + 100],
              scale: bossSize * (isEnraged ? 1.5 : 1),
              rotate: bossRotation,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <div className="relative">
              {/* Boss Aura */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: isEnraged
                    ? [
                        '0 0 50px #ff000066',
                        '0 0 100px #ff000066',
                        '0 0 50px #ff000066'
                      ]
                    : [
                        '0 0 50px #ffff0066',
                        '0 0 100px #ffff0066',
                        '0 0 50px #ffff0066'
                      ],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />

              {/* Boss Icon */}
              <motion.div
                className="text-[12rem] relative"
                animate={{
                  filter: isEnraged
                    ? [
                        'drop-shadow(0 0 20px #ff0000) brightness(1.2)',
                        'drop-shadow(0 0 40px #ff0000) brightness(1.5)',
                        'drop-shadow(0 0 20px #ff0000) brightness(1.2)'
                      ]
                    : [
                        'drop-shadow(0 0 20px #ffff00) brightness(1.2)',
                        'drop-shadow(0 0 40px #ffff00) brightness(1.5)',
                        'drop-shadow(0 0 20px #ffff00) brightness(1.2)'
                      ],
                  rotate: isEnraged ? [-5, 5, -5] : [0, 0, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: isEnraged ? 0.5 : 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                {/* Mini JS Logos orbiting the boss */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 text-2xl"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.2,
                      },
                    }}
                    style={{
                      transformOrigin: `${Math.cos(i * Math.PI / 3) * 100}px ${Math.sin(i * Math.PI / 3) * 100}px`,
                    }}
                  >
                    {isEnraged ? '🔥' : '✨'}
                  </motion.div>
                ))}
                {isEnraged ? '👿' : '👾'}
              </motion.div>

              {/* Boss Name */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[#ff0000] pixel-text text-4xl whitespace-nowrap"
                animate={{
                  textShadow: isEnraged
                    ? [
                        '0 0 20px #ff0000',
                        '0 0 40px #ff0000'
                      ]
                    : [
                        '0 0 10px #ff0000',
                        '0 0 20px #ff0000'
                      ],
                  scale: isEnraged ? [1, 1.1, 1] : [1, 1.05, 1],
                }}
                transition={{ 
                  duration: isEnraged ? 0.5 : 1,
                  repeat: Infinity,
                }}
              >
                {isEnraged ? 'ENRAGED JAVASCRIPT' : 'JAVASCRIPT BOSS'}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Combo Effects */}
        <AnimatePresence>
          {comboEffects.map(effect => (
            <ComboEffect
              key={effect.id}
              combo={effect.combo}
              position={{ x: effect.x, y: effect.y }}
            />
          ))}
        </AnimatePresence>

        {/* Close Button */}
        <motion.button
          className="fixed top-8 left-8 pixel-border px-4 py-2 bg-red-500/80 hover:bg-red-600/80 text-white pixel-text"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
        >
          EXIT BATTLE
        </motion.button>

        {/* Falling Code Fragments */}
        <AnimatePresence>
          {codeFragments.map(fragment => {
            const typeInfo = codeTypes.find(t => t.type === fragment.type)!;
            return (
              <motion.div
                key={fragment.id}
                className="absolute"
                style={{
                  left: fragment.position.x,
                  top: fragment.position.y,
                }}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ 
                  scale: fragment.size,
                  rotate: fragment.rotation,
                }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={() => handleFragmentClick(fragment)}
              >
                <motion.div
                  className="pixel-border p-3 cursor-pointer select-none flex items-center gap-2 relative"
                  style={{
                    backgroundColor: typeInfo.color + '88',
                    backdropFilter: 'blur(4px)',
                    color: fragment.type === 'JavaScript' ? 'black' : 'white',
                    boxShadow: `0 0 10px ${typeInfo.color}88`,
                  }}
                  whileHover={{ 
                    scale: 1.2,
                    boxShadow: `0 0 20px ${typeInfo.color}`,
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Icon Animation */}
                  <motion.span 
                    className="text-xl relative"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                      },
                    }}
                  >
                    {typeInfo.icon}
                    {/* Icon trail effect */}
                    <motion.div
                      className="absolute inset-0 opacity-50"
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.5],
                        opacity: [0.5, 0],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                      }}
                    >
                      {typeInfo.icon}
                    </motion.div>
                  </motion.span>
                  <motion.span 
                    className="pixel-text font-bold"
                    animate={{
                      textShadow: [
                        `0 0 5px ${typeInfo.color}`,
                        `0 0 10px ${typeInfo.color}`,
                        `0 0 5px ${typeInfo.color}`,
                      ],
                    }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                    }}
                  >
                    {fragment.type}
                  </motion.span>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BossBattle;
