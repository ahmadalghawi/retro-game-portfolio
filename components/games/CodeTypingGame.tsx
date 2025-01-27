'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';

interface CodeTypingGameProps {
  onScoreUpdate: (score: number) => void;
  onGameComplete: () => void;
}

interface Challenge {
  code: string;
  completed: boolean;
}

// Organized code snippets by difficulty
const CODE_SNIPPETS = {
  beginner: [
    'console.log("Hello World!");',
    'let x = 42;',
    'const name = "John";',
    'function greet() { }',
    'if (true) { return; }',
  ],
  easy: [
    'const hello = () => console.log("Hello World!");',
    'function sum(a, b) { return a + b; }',
    'const [state, setState] = useState(null);',
    'useEffect(() => { /* effect */ }, []);',
    'export default function App() { return <div>Hello</div>; }',
  ],
  medium: [
    'const fetchData = async () => { const response = await fetch(url); return response.json(); }',
    'useEffect(() => { const cleanup = () => {}; return cleanup; }, [dependency]);',
    'const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);',
    'const { data, error } = useSWR("/api/user", fetcher);',
    'export const getStaticProps = async () => { return { props: { data } }; };',
  ],
  hard: [
    'const withAuth = (WrappedComponent) => (props) => { return isAuth ? <WrappedComponent {...props} /> : <Login />; };',
    'type Props<T> = T extends React.ComponentType<infer P> ? P : never;',
    'const [state, dispatch] = useReducer((state, action) => { switch(action.type) { case "INCREMENT": return state + 1; } }, 0);',
    'const { data } = useQuery(["todos", page], () => fetchTodoList(page), { keepPreviousData: true });',
    'export const getServerSideProps: GetServerSideProps = async (context) => { const session = await getSession(context); };',
  ],
  expert: [
    'const createSelector = <T,>(selector: (state: RootState) => T) => (state: RootState): T => selector(state);',
    'type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };',
    'const pipe = <T>(...fns: Array<(arg: T) => T>) => (value: T) => fns.reduce((acc, fn) => fn(acc), value);',
    'const withErrorBoundary = <P extends object>(Component: React.ComponentType<P>) => class ErrorBoundary extends React.Component<P> { };',
    'type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (...args: any) => Promise<infer R> ? R : any;',
  ]
};

// Difficulty settings
const DIFFICULTY_SETTINGS = {
  beginner: { timeLimit: 30, bonusMultiplier: 1 },
  easy: { timeLimit: 25, bonusMultiplier: 1.2 },
  medium: { timeLimit: 20, bonusMultiplier: 1.5 },
  hard: { timeLimit: 15, bonusMultiplier: 2 },
  expert: { timeLimit: 10, bonusMultiplier: 3 }
};

export const CodeTypingGame = ({ onScoreUpdate, onGameComplete }: CodeTypingGameProps) => {
  const [mounted, setMounted] = useState(false);
  const [challenge, setChallenge] = useState<Challenge>({
    code: '',
    completed: false
  });
  const [userInput, setUserInput] = useState('');
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errors, setErrors] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [bestWpm, setBestWpm] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<keyof typeof CODE_SNIPPETS>('beginner');

  const getDifficulty = useCallback((level: number): keyof typeof CODE_SNIPPETS => {
    if (level <= 5) return 'beginner';
    if (level <= 10) return 'easy';
    if (level <= 15) return 'medium';
    if (level <= 20) return 'hard';
    return 'expert';
  }, []);

  const initializeChallenge = useCallback(() => {
    const newDifficulty = getDifficulty(currentLevel);
    setDifficulty(newDifficulty);
    
    const snippets = CODE_SNIPPETS[newDifficulty];
    const randomSnippet = snippets[Math.floor(Math.random() * snippets.length)];
    
    setChallenge({
      code: randomSnippet,
      completed: false
    });
    setUserInput('');
    setWpm(0);
    setAccuracy(100);
    setErrors(0);
    setStartTime(null);
    setTimeLeft(DIFFICULTY_SETTINGS[newDifficulty].timeLimit);
  }, [currentLevel, getDifficulty]);

  const calculateAccuracy = useCallback((input: string, target: string) => {
    let correct = 0;
    const inputLength = input.length;
    const targetLength = target.length;
    
    for (let i = 0; i < inputLength; i++) {
      if (input[i] === target[i]) correct++;
    }
    
    return Math.floor((correct / targetLength) * 100);
  }, []);

  const handleTyping = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setUserInput(input);

    if (!startTime) {
      setStartTime(Date.now());
    }

    // Calculate accuracy
    const currentAccuracy = calculateAccuracy(input, challenge.code);
    setAccuracy(currentAccuracy);

    // Count errors
    if (input.length > userInput.length) {
      const lastChar = input[input.length - 1];
      const expectedChar = challenge.code[input.length - 1];
      if (lastChar !== expectedChar) {
        setErrors(prev => prev + 1);
      }
    }

    if (input === challenge.code && startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
      const wordsTyped = challenge.code.split(' ').length;
      const calculatedWpm = Math.round(wordsTyped / timeElapsed);
      
      setWpm(calculatedWpm);
      if (calculatedWpm > bestWpm) setBestWpm(calculatedWpm);
      
      setChallenge(prev => ({ ...prev, completed: true }));
      
      // Calculate score based on WPM, accuracy, current level, and difficulty bonus
      const difficultyBonus = DIFFICULTY_SETTINGS[difficulty].bonusMultiplier;
      const timeBonus = timeLeft ? timeLeft / DIFFICULTY_SETTINGS[difficulty].timeLimit : 1;
      const score = Math.floor(calculatedWpm * (accuracy / 100) * currentLevel * difficultyBonus * timeBonus);
      
      onScoreUpdate(score);
      
      // Level up and prepare next challenge
      setTimeout(() => {
        setCurrentLevel(prev => prev + 1);
        initializeChallenge();
      }, 2000);
    }
  }, [challenge.code, userInput, startTime, bestWpm, accuracy, currentLevel, calculateAccuracy, initializeChallenge, onScoreUpdate, difficulty, timeLeft]);

  // Timer effect
  useEffect(() => {
    if (startTime && timeLeft !== null && !challenge.completed) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            setChallenge(prev => ({ ...prev, completed: true }));
            onGameComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [startTime, timeLeft, challenge.completed, onGameComplete]);

  useEffect(() => {
    setMounted(true);
    initializeChallenge();
    return () => setMounted(false);
  }, [initializeChallenge]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="pixel-border-sm p-2 bg-black">
          <span className="text-[#00ff00]">WPM: {wpm}</span>
        </div>
        <div className="pixel-border-sm p-2 bg-black">
          <span className="text-[#00ff00]">Best: {bestWpm}</span>
        </div>
        <div className="pixel-border-sm p-2 bg-black">
          <span className="text-[#00ff00]">Accuracy: {accuracy}%</span>
        </div>
        <div className="pixel-border-sm p-2 bg-black">
          <span className="text-[#ff0000]">Errors: {errors}</span>
        </div>
      </div>

      {/* Difficulty and Timer */}
      <div className="flex justify-between mb-4">
        <div className="pixel-border-sm p-2 bg-black">
          <span className={`text-sm ${
            difficulty === 'beginner' ? 'text-[#00ff00]' :
            difficulty === 'easy' ? 'text-[#00ff00]' :
            difficulty === 'medium' ? 'text-[#ffff00]' :
            difficulty === 'hard' ? 'text-[#ff8800]' :
            'text-[#ff0000]'
          }`}>
            Difficulty: {difficulty.toUpperCase()}
          </span>
        </div>
        <div className="pixel-border-sm p-2 bg-black">
          <span className={`text-sm ${timeLeft && timeLeft < 5 ? 'text-[#ff0000]' : 'text-[#00ff00]'}`}>
            Time: {timeLeft}s
          </span>
        </div>
      </div>

      {/* Code Display */}
      <div className="pixel-border p-6 mb-6 bg-black">
        <code className="text-[#00ff00] font-mono text-lg block whitespace-pre-wrap">
          {challenge.code.split('').map((char, index) => {
            const userChar = userInput[index];
            let color = 'text-[#00ff00]/50';
            if (userChar !== undefined) {
              color = userChar === char ? 'text-[#00ff00]' : 'text-[#ff0000]';
            }
            return (
              <span key={index} className={color}>
                {char}
              </span>
            );
          })}
        </code>
      </div>

      {/* Input Field */}
      <input
        type="text"
        value={userInput}
        onChange={handleTyping}
        className="w-full pixel-border p-4 bg-black text-[#00ff00] font-mono focus:outline-none"
        placeholder="Start typing..."
        autoFocus
        disabled={challenge.completed}
      />

      {/* Level Complete Animation */}
      {mounted && (
        <AnimatePresence>
          {challenge.completed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 flex items-center justify-center bg-black/80"
            >
              <div className="text-center">
                <h3 className="text-[#00ff00] text-2xl mb-4">
                  {timeLeft === 0 ? 'Time\'s Up!' : 'Level Complete!'}
                </h3>
                <p className="text-[#00ff00] mb-2">WPM: {wpm}</p>
                <p className="text-[#00ff00] mb-2">Accuracy: {accuracy}%</p>
                <p className="text-[#00ff00] mb-4">
                  Difficulty: {difficulty.toUpperCase()}
                </p>
                {timeLeft !== 0 && (
                  <div className="text-[#00ff00]/70">
                    Next level starting soon...
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default CodeTypingGame;
