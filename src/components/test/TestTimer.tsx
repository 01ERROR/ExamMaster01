import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TestTimerProps {
  timeLimit: number; // in minutes
  onTimeUp: () => void;
}

export const TestTimer: React.FC<TestTimerProps> = ({ timeLimit, onTimeUp }) => {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // convert to seconds
  const [warningLevel, setWarningLevel] = useState<'normal' | 'warning' | 'danger'>('normal');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  useEffect(() => {
    // Set warning levels
    const totalSeconds = timeLimit * 60;
    const fifteenPercentTime = totalSeconds * 0.15;
    const fivePercentTime = totalSeconds * 0.05;

    if (timeRemaining <= fivePercentTime) {
      setWarningLevel('danger');
    } else if (timeRemaining <= fifteenPercentTime) {
      setWarningLevel('warning');
    } else {
      setWarningLevel('normal');
    }
  }, [timeRemaining, timeLimit]);

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    switch (warningLevel) {
      case 'normal':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-amber-100 text-amber-800';
      case 'danger':
        return 'bg-red-100 text-red-800 animate-pulse';
    }
  };

  return (
    <div className={`flex items-center space-x-2 px-3 py-2 rounded-full ${getTimerColor()}`}>
      <Clock size={16} />
      <span className="font-semibold">{formatTime(timeRemaining)}</span>
    </div>
  );
};