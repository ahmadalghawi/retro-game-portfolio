'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PowerUp {
  name: string;
  duration: number;
  color: string;
  description: string;
  multiplier: number;
}

interface XPContextType {
  xp: number;
  level: number;
  combo: number;
  powerUp: string | null;
  addXP: (amount: number) => void;
  incrementCombo: () => void;
  setPowerUp: (type: string | null) => void;
  powerUps: Record<string, PowerUp>;
}

const XPContext = createContext<XPContextType | undefined>(undefined);

export const powerUps: Record<string, PowerUp> = {
  'speed': {
    name: 'Speed Boost',
    duration: 5000,
    color: '#ff00ff',
    description: 'Faster animations!',
    multiplier: 1
  },
  'double': {
    name: 'Double XP',
    duration: 8000,
    color: '#00ffff',
    description: '2x XP gain!',
    multiplier: 2
  },
  'chain': {
    name: 'Chain Bonus',
    duration: 10000,
    color: '#ffff00',
    description: 'Extended combo time!',
    multiplier: 1.5
  },
  'critical': {
    name: 'Critical Hit',
    duration: 6000,
    color: '#ff0000',
    description: '3x XP chance!',
    multiplier: 3
  },
  'rainbow': {
    name: 'Rainbow Power',
    duration: 12000,
    color: 'rainbow',
    description: 'All bonuses active!',
    multiplier: 4
  },
  'time': {
    name: 'Time Warp',
    duration: 7000,
    color: '#00ff99',
    description: 'Slow motion effects!',
    multiplier: 1.25
  },
  'ghost': {
    name: 'Ghost Mode',
    duration: 9000,
    color: '#9966ff',
    description: 'Special effects!',
    multiplier: 1.75
  },
  'pixel': {
    name: 'Pixel Perfect',
    duration: 8000,
    color: '#66ff33',
    description: 'Enhanced visuals!',
    multiplier: 1.5
  }
};

export function XPProvider({ children }: { children: ReactNode }) {
  const [xp, setXP] = useState(0);
  const [combo, setCombo] = useState(0);
  const [powerUp, setPowerUpState] = useState<string | null>(null);

  // Calculate level based on XP (every 1000 XP = 1 level)
  const level = Math.floor(xp / 1000) + 1;

  // Reset combo after 3 seconds of inactivity
  useEffect(() => {
    if (combo > 0) {
      const timer = setTimeout(() => setCombo(0), 3000);
      return () => clearTimeout(timer);
    }
  }, [combo]);

  // Clear power-up after duration
  useEffect(() => {
    if (powerUp && powerUp in powerUps) {
      const timer = setTimeout(
        () => setPowerUpState(null),
        powerUps[powerUp].duration
      );
      return () => clearTimeout(timer);
    }
  }, [powerUp]);

  const addXP = (amount: number) => {
    const comboMultiplier = Math.max(1, combo * 0.5); // 50% extra per combo
    const powerUpMultiplier = powerUp && powerUp in powerUps ? powerUps[powerUp].multiplier : 1;
    const totalXP = Math.round(amount * comboMultiplier * powerUpMultiplier);
    
    setXP(prev => prev + totalXP);
  };

  const incrementCombo = () => {
    setCombo(prev => prev + 1);
  };

  const setPowerUp = (type: string | null) => {
    setPowerUpState(type);
  };

  return (
    <XPContext.Provider
      value={{
        xp,
        level,
        combo,
        powerUp,
        addXP,
        incrementCombo,
        setPowerUp,
        powerUps
      }}
    >
      {children}
    </XPContext.Provider>
  );
}

export function useXP() {
  const context = useContext(XPContext);
  if (context === undefined) {
    throw new Error('useXP must be used within an XPProvider');
  }
  return context;
}
