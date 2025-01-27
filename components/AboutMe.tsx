'use client';
import { motion, useAnimation } from 'framer-motion';
import { useXP } from '../context/XPContext';
import { useState, useEffect } from 'react';

interface Achievement {
  title: string;
  description: string;
  xp: number;
  icon: string;
}

interface TechInfo {
  description: string;
  details: {
    experience: string;
    projects: string;
    specialties: string;
  };
}

const AboutMe = () => {
  const { addXP } = useXP();
  const controls = useAnimation();
  const [activeQuest, setActiveQuest] = useState(0);
  const [isClicking, setIsClicking] = useState(false);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [dragCount, setDragCount] = useState(0);
  const [konami, setKonami] = useState<number[]>([]);
  const [secretCode, setSecretCode] = useState<string[]>([]);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [showTechDetails, setShowTechDetails] = useState(false);
  const [mouseClickSequence, setMouseClickSequence] = useState<string[]>([]);
  const [hoverSequence, setHoverSequence] = useState<string[]>([]);
  const [diagonalClicks, setDiagonalClicks] = useState<{x: number, y: number}[]>([]);
  const [circleClicks, setCircleClicks] = useState<{x: number, y: number}[]>([]);
  const [hoverTime, setHoverTime] = useState<{[key: string]: number}>({});
  const [lastClickTime, setLastClickTime] = useState<number>(0);

  const achievements: Record<string, Achievement> = {
    curiosityMaster: {
      title: "Curiosity Master",
      description: "Clicked the profile card 5 times",
      xp: 500,
      icon: "🏆"
    },
    draggingMaster: {
      title: "Drag Master",
      description: "Discovered the draggable quest items",
      xp: 300,
      icon: "🎮"
    },
    konamiCode: {
      title: "Retro Gamer",
      description: "Entered the Konami Code",
      xp: 1000,
      icon: "👾"
    },
    techExplorer: {
      title: "Tech Explorer",
      description: "Discovered all tech stack details",
      xp: 400,
      icon: "🔍"
    },
    secretCode: {
      title: "Code Breaker",
      description: "Found the secret code: QUEST",
      xp: 800,
      icon: "🔐"
    },
    mouseNinja: {
      title: "Mouse Ninja",
      description: "Performed the secret click sequence: Left-Right-Left-Left",
      xp: 600,
      icon: "🐭"
    },
    techMaster: {
      title: "Tech Master",
      description: "Discovered advanced tech details",
      xp: 700,
      icon: "⚡"
    },
    hoverMaster: {
      title: "Hover Master",
      description: "Found the secret hover pattern",
      xp: 450,
      icon: "🎯"
    },
    doubleClick: {
      title: "Speed Clicker",
      description: "Double-clicked all quest items",
      xp: 350,
      icon: "⚡"
    },
    diagonalMaster: {
      title: "Diagonal Master",
      description: "Drew a diagonal line with clicks",
      xp: 750,
      icon: "↗️"
    },
    circleMaster: {
      title: "Circle Master",
      description: "Drew a circle with clicks",
      xp: 850,
      icon: "⭕"
    },
    rhythmMaster: {
      title: "Rhythm Master",
      description: "Clicked in perfect rhythm",
      xp: 400,
      icon: "🎵"
    },
    patienceMaster: {
      title: "Patience Master",
      description: "Hovered over a tech for 10 seconds",
      xp: 300,
      icon: "⏳"
    }
  };

  const techStack: Record<string, TechInfo> = {
    ' Next.js': {
      description: "Server-side rendering & static generation",
      details: {
        experience: "3+ years of production experience",
        projects: "- E-commerce Platform: Built a high-performance e-commerce platform with 50k+ monthly users\n" +
                 "- Blog System: Developed a multi-author blog with SSR and ISR\n" +
                 "- Portfolio Sites: Created dynamic portfolios with optimized image loading\n" +
                 "- Real-time Dashboard: Implemented server-side analytics with live updates",
        specialties: "- SSR & Static Generation for optimal performance\n" +
                    "- API Routes with middleware for secure endpoints\n" +
                    "- Image Optimization using next/image\n" +
                    "- Incremental Static Regeneration\n" +
                    "- Dynamic routing with fallback pages"
      }
    },
    ' React.js': {
      description: "Component-based UI development",
      details: {
        experience: "4+ years of frontend development",
        projects: "- Admin Dashboard: Built a comprehensive admin panel with real-time data\n" +
                 "- Social Media App: Developed a Twitter-like platform with real-time updates\n" +
                 "- Analytics Platform: Created interactive charts and data visualization tools\n" +
                 "- Task Management System: Built a Trello-like drag-and-drop interface",
        specialties: "- Custom Hook development for reusable logic\n" +
                    "- Context API for state management\n" +
                    "- Performance optimization with useMemo and useCallback\n" +
                    "- Advanced animation implementations\n" +
                    "- Micro-frontend architecture"
      }
    },
    ' React Native': {
      description: "Cross-platform mobile development",
      details: {
        experience: "2+ years building mobile apps",
        projects: "- Social Media Mobile App: Built a cross-platform social networking app\n" +
                 "- E-commerce Mobile App: Developed a full-featured shopping app\n" +
                 "- Fitness Tracking App: Created a workout tracking app with device sensors\n" +
                 "- Chat Application: Implemented real-time messaging with push notifications",
        specialties: "- Native Module integration\n" +
                    "- Custom animation systems\n" +
                    "- Platform-specific optimizations\n" +
                    "- Offline-first architecture\n" +
                    "- Push notification handling"
      }
    },
    ' Node.js': {
      description: "Server-side JavaScript runtime",
      details: {
        experience: "3+ years backend development",
        projects: "- REST API Service: Built scalable APIs serving 100k+ daily requests\n" +
                 "- Real-time Chat Server: Developed WebSocket-based chat system\n" +
                 "- Authentication Service: Implemented OAuth2 and JWT authentication\n" +
                 "- Payment Processing: Integrated multiple payment gateways",
        specialties: "- Express.js API development\n" +
                    "- Socket.io for real-time communication\n" +
                    "- Microservices architecture\n" +
                    "- Redis caching implementation\n" +
                    "- AWS service integration"
      }
    },
    ' MySQL': {
      description: "Relational database management",
      details: {
        experience: "3+ years database design",
        projects: "- CMS Database: Designed schema for content management system\n" +
                 "- Analytics Platform: Implemented complex data aggregation\n" +
                 "- User Management System: Built hierarchical access control\n" +
                 "- E-commerce Database: Designed inventory and order management",
        specialties: "- Query optimization techniques\n" +
                    "- Index strategy design\n" +
                    "- Database normalization\n" +
                    "- Stored procedure development\n" +
                    "- Replication setup"
      }
    }
  };

  const unlockAchievement = (achievement: Achievement) => {
    setShowAchievement(achievement);
    addXP(achievement.xp);
    setTimeout(() => setShowAchievement(null), 3000);
  };

  // Handle mouse movement for energy field effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle keyboard input for Konami code
  useEffect(() => {
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
    const handleKeyDown = (e: KeyboardEvent) => {
      setKonami(prev => {
        const newKonami = [...prev, e.keyCode];
        if (newKonami.length > konamiSequence.length) {
          return newKonami.slice(1);
        }
        return newKonami;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Check for Konami code completion
  useEffect(() => {
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    if (konami.length === konamiSequence.length && 
        konami.every((code, i) => code === konamiSequence[i])) {
      unlockAchievement(achievements.konamiCode);
      setKonami([]);
    }
  }, [konami]);

  // Check for secret code
  useEffect(() => {
    if (secretCode.join('') === 'QUEST') {
      unlockAchievement(achievements.secretCode);
      setSecretCode([]);
    }
  }, [secretCode]);

  // Rotate through quests automatically
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveQuest((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleCardClick = async () => {
    setClickCount(prev => prev + 1);
    
    if (clickCount + 1 === 5) {
      unlockAchievement(achievements.curiosityMaster);
    }

    await controls.start({
      scale: [1, 1.02, 1],
      transition: { duration: 0.3 }
    });
    addXP(50);
  };

  const handleDrag = () => {
    setDragCount(prev => prev + 1);
    if (dragCount === 0) {
      unlockAchievement(achievements.draggingMaster);
    }
  };

  const handleMouseClick = (button: 'left' | 'right') => {
    setMouseClickSequence(prev => {
      const newSequence = [...prev, button].slice(-4);
      if (newSequence.join('-') === 'left-right-left-left') {
        unlockAchievement(achievements.mouseNinja);
        return [];
      }
      return newSequence;
    });
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      handleMouseClick(e.button === 0 ? 'left' : 'right');
    };
    window.addEventListener('click', handleClick);
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      handleMouseClick('right');
    });
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('contextmenu', handleClick);
    };
  }, []);

  const handleHoverSequence = (tech: string) => {
    setHoverSequence(prev => {
      const newSequence = [...prev, tech].slice(-3);
      if (newSequence.join('-') === 'Next.js-React.js-Node.js') {
        unlockAchievement(achievements.hoverMaster);
        return [];
      }
      return newSequence;
    });
  };

  const handleTechHover = (tech: string) => {
    setHoveredTech(tech);
    handleHoverSequence(tech);
    const allTechs = Object.keys(techStack);
    if (!hoveredTech && allTechs.every(t => localStorage.getItem(`tech_${t}`))) {
      unlockAchievement(achievements.techExplorer);
    } else {
      localStorage.setItem(`tech_${tech}`, 'true');
    }

    // Start timing the hover
    const startTime = Date.now();
    const timer = setInterval(() => {
      const hoverDuration = Date.now() - startTime;
      setHoverTime(prev => ({ ...prev, [tech]: hoverDuration }));
      
      if (hoverDuration >= 10000) { // 10 seconds
        unlockAchievement(achievements.patienceMaster);
        clearInterval(timer);
      }
    }, 100);

    return () => clearInterval(timer);
  };

  const handleTechClick = (tech: string) => {
    setShowTechDetails(true);
    if (Object.keys(techStack).every(t => localStorage.getItem(`tech_click_${t}`))) {
      unlockAchievement(achievements.techMaster);
    }
    localStorage.setItem(`tech_click_${tech}`, 'true');
  };

  const questItems = [
    {
      title: "AI Development Mastery",
      description: "Researching advanced AI development patterns and tools",
      color: "#00ff00"
    },
    {
      title: "No-Code Evolution",
      description: "Exploring the future of no-code application development",
      color: "#ff00ff"
    },
    {
      title: "AI Architecture",
      description: "Building scalable AI-driven application structures",
      color: "#00ffff"
    }
  ];

  const checkDiagonalPattern = (clicks: {x: number, y: number}[]) => {
    if (clicks.length < 4) return false;
    const lastClicks = clicks.slice(-4);
    const isAscending = lastClicks.every((click, i) => {
      if (i === 0) return true;
      return click.x > lastClicks[i-1].x && click.y < lastClicks[i-1].y;
    });
    return isAscending;
  };

  const checkCirclePattern = (clicks: {x: number, y: number}[]) => {
    if (clicks.length < 8) return false;
    const lastClicks = clicks.slice(-8);
    const center = {
      x: lastClicks.reduce((sum, click) => sum + click.x, 0) / 8,
      y: lastClicks.reduce((sum, click) => sum + click.y, 0) / 8
    };
    const radius = Math.sqrt(
      Math.pow(lastClicks[0].x - center.x, 2) + 
      Math.pow(lastClicks[0].y - center.y, 2)
    );
    return lastClicks.every(click => {
      const distance = Math.sqrt(
        Math.pow(click.x - center.x, 2) + 
        Math.pow(click.y - center.y, 2)
      );
      return Math.abs(distance - radius) < 20;
    });
  };

  const checkRhythmPattern = (currentTime: number) => {
    const interval = currentTime - lastClickTime;
    if (interval > 0 && Math.abs(interval - 500) < 50) {
      return true;
    }
    return false;
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    const newClick = { x: e.clientX, y: e.clientY };
    
    // Update diagonal clicks
    setDiagonalClicks(prev => {
      const newClicks = [...prev, newClick].slice(-4);
      if (checkDiagonalPattern(newClicks)) {
        unlockAchievement(achievements.diagonalMaster);
        return [];
      }
      return newClicks;
    });

    // Update circle clicks
    setCircleClicks(prev => {
      const newClicks = [...prev, newClick].slice(-8);
      if (checkCirclePattern(newClicks)) {
        unlockAchievement(achievements.circleMaster);
        return [];
      }
      return newClicks;
    });

    // Check rhythm
    const currentTime = Date.now();
    if (checkRhythmPattern(currentTime)) {
      unlockAchievement(achievements.rhythmMaster);
    }
    setLastClickTime(currentTime);
  };

  return (
    <div 
      className="min-h-screen bg-black text-white p-8 relative overflow-hidden"
      onClick={handleBackgroundClick}
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="grid grid-cols-12 h-full"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse'
          }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="border-r border-[#00ff00]"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Energy Field Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, 
            rgba(0, 255, 0, 0.1),
            transparent
          )`
        }}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 relative z-10">
      <motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className={`text-4xl font-bold mb-20 text-center pixel-text glitch-text relative ${
            isClicking ? 'animate-glitch-click' : 'animate-float'
          }`}
          data-text="Player Profile"
        >
          Player Profile
          <span className="inline-block w-4 h-8 ml-2 border-r-4 align-middle animate-blink" />
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Profile Card */}
          <motion.div
            animate={controls}
            onClick={handleCardClick}
            whileHover={{ scale: 1.02 }}
            className="pixel-border p-6 bg-black/50 backdrop-blur-sm cursor-pointer transform transition-transform"
          >
            <h3 className="text-2xl text-[#00ff00] pixel-text mb-6">Character Stats</h3>
            <div className="space-y-4 text-[#00ff00] pixel-text">
              <motion.p
                className="leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Level 99 FullStack Developer specializing in crafting powerful web applications using
                {Object.entries(techStack).map(([tech, info], i) => (
                  <motion.span
                    key={tech}
                    className="text-[#ff00ff] cursor-help relative group"
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                    onHoverStart={() => handleTechHover(tech)}
                    onClick={() => handleTechClick(tech)}
                  >
                    {tech}
                    {hoveredTech === tech && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bg-black pixel-border p-4 z-50 text-sm w-80"
                      >
                        <h4 className="text-[#00ff00] mb-2">{info.description}</h4>
                        <div className="space-y-2 text-[#00ff00]/80">
                          <p>🔥 {info.details.experience}</p>
                          <p>🚀 {info.details.projects}</p>
                          <p>⭐ {info.details.specialties}</p>
                        </div>
                        <div className="mt-2 text-[#ff00ff] text-xs">Click for more details</div>
                      </motion.div>
                    )}
                  </motion.span>
                ))}
                .
              </motion.p>
              <motion.p
                className="leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Equipped with legendary skills in UI design, project management, and team collaboration.
                Each quest completed with pixel-perfect precision and optimal performance.
              </motion.p>
            </div>

            {/* Experience Bar */}
            <motion.div
              className="mt-6 h-2 bg-[#003300] rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-[#00ff00]"
                animate={{
                  width: ["0%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
          </motion.div>

          {/* Current Quest */}
          <motion.div
            className="pixel-border p-6 bg-black/50 backdrop-blur-sm relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl text-[#00ff00] pixel-text mb-6">Current Quest</h3>
            
            {/* Quest Items */}
            <div className="space-y-6">
              {questItems.map((quest, index) => (
                <motion.div
                  key={quest.title}
                  drag
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragStart={handleDrag}
                  whileDrag={{ scale: 1.1 }}
                  onDoubleClick={() => {
                    localStorage.setItem(`quest_double_click_${index}`, 'true');
                    if (questItems.every((_, i) => localStorage.getItem(`quest_double_click_${i}`))) {
                      unlockAchievement(achievements.doubleClick);
                    }
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: activeQuest === index ? 1 : 0.5,
                    x: 0,
                    scale: activeQuest === index ? 1 : 0.95
                  }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                  onClick={() => {
                    const letter = quest.title[0];
                    setSecretCode(prev => [...prev, letter]);
                  }}
                >
                  <div className="flex items-center">
                    <motion.div
                      className="w-2 h-2 mr-2"
                      style={{ backgroundColor: quest.color }}
                      animate={{
                        scale: activeQuest === index ? [1, 1.5, 1] : 1,
                      }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <h4 className="text-lg text-[#00ff00] pixel-text">{quest.title}</h4>
                  </div>
                  <p className="text-[#00ff00] pixel-text ml-4">{quest.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Quest Completion Indicator */}
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-[#00ff00]"
              initial={{ width: "0%" }}
              animate={{
                width: ["0%", "100%"],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>
        </div>

        {/* Achievement Popup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: showAchievement ? 1 : 0,
            y: showAchievement ? 0 : 50
          }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-10 right-10 pixel-border bg-black p-4 z-50"
        >
          {showAchievement && (
            <>
              <h4 className="text-[#00ff00] pixel-text flex items-center gap-2">
                {showAchievement.icon} {showAchievement.title}
              </h4>
              <p className="text-[#00ff00] pixel-text">{showAchievement.description}</p>
              <p className="text-[#ff00ff] pixel-text">+{showAchievement.xp} XP</p>
            </>
          )}
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff00] to-transparent" />
        <motion.div
          className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00ff00] to-transparent"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-transparent via-[#00ff00] to-transparent"
          animate={{
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>
    </div>
  );
};

export default AboutMe;
