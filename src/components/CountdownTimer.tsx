import { useEffect, useState } from 'react';
import { Card } from './ui/card';
import { motion, AnimatePresence } from 'motion/react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +targetDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      <TimeUnit value={timeLeft.days} label="Days" />
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <TimeUnit value={timeLeft.minutes} label="Minutes" />
      <TimeUnit value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}

interface TimeUnitProps {
  value: number;
  label: string;
}

function TimeUnit({ value, label }: TimeUnitProps) {
  const [prevValue, setPrevValue] = useState(value);

  useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value);
    }
  }, [value, prevValue]);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="relative p-6 md:p-10 text-center bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm shadow-2xl border-cyan-500/30 hover:border-cyan-400/60 transition-all overflow-hidden group">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Animated corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60"></div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={value}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-5xl md:text-7xl tabular-nums text-cyan-400"
              style={{
                textShadow: '0 0 20px rgba(34, 211, 238, 0.6), 0 0 40px rgba(34, 211, 238, 0.3)'
              }}
            >
              {String(value).padStart(2, '0')}
            </motion.div>
          </AnimatePresence>
          <div className="text-gray-300 mt-3 tracking-wider uppercase text-sm">{label}</div>
        </div>
      </Card>
    </motion.div>
  );
}
