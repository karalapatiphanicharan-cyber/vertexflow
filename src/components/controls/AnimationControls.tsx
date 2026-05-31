import React, { useEffect, useRef } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  FastForward,
  Rewind
} from 'lucide-react';

export const AnimationControls: React.FC = () => {
  const {
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    currentStepIndex,
    setCurrentStepIndex,
    steps,
    resetExecution
  } = useGraphStore();

  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      const delay = 1000 / speed;
      timerRef.current = window.setTimeout(() => {
        setCurrentStepIndex(currentStepIndex + 1);
      }, delay);
    } else if (currentStepIndex >= steps.length - 1) {
      setIsPlaying(false);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPlaying, currentStepIndex, steps.length, speed, setCurrentStepIndex, setIsPlaying]);

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const stepForward = () => {
    setIsPlaying(false);
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const stepBackward = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  if (steps.length === 0) return null;

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-6 bg-white border-4 border-black p-4 shadow-brutal rounded-[24px]">
      <div className="flex items-center gap-2 pr-6 border-r-2 border-black border-dashed">
         <button
           onClick={handleRestart}
           className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
           title="Restart"
         >
           <RotateCcw size={20} />
         </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={stepBackward}
          className="p-2 border-2 border-black bg-white hover:bg-gray-50 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
        >
          <Rewind size={20} />
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-14 h-14 border-4 border-black flex items-center justify-center transition-all shadow-brutal active:translate-y-1 active:shadow-none ${isPlaying ? 'bg-white' : 'bg-primary-yellow'}`}
        >
          {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
        </button>

        <button
          onClick={stepForward}
          className="p-2 border-2 border-black bg-white hover:bg-gray-50 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
        >
          <FastForward size={20} />
        </button>
      </div>

      <div className="flex items-center gap-3 pl-6 border-l-2 border-black border-dashed font-black text-[10px] uppercase">
        <span className="text-gray-400">Speed</span>
        <select
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="border-2 border-black p-1 bg-white outline-none cursor-pointer"
        >
          <option value={0.5}>0.5x</option>
          <option value={1}>1.0x</option>
          <option value={2}>2.0x</option>
          <option value={4}>4.0x</option>
        </select>
      </div>
    </div>
  );
};
