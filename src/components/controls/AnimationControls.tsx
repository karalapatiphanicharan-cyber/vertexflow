import React, { useEffect } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw
} from 'lucide-react';

export const AnimationControls: React.FC = () => {
  const {
    isPlaying,
    setIsPlaying,
    currentStepIndex,
    steps,
    nextStep,
    prevStep,
    resetExecution,
    speed,
    setSpeed
  } = useGraphStore();

  useEffect(() => {
    let interval: any;
    if (isPlaying && currentStepIndex < steps.length - 1) {
      interval = setInterval(() => {
        nextStep();
      }, 1000 / speed);
    } else {
      setIsPlaying(false);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStepIndex, steps.length, nextStep, speed, setIsPlaying]);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white border-4 border-black p-2 shadow-brutal z-10">
      <button
        onClick={resetExecution}
        className="p-2 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all"
      >
        <RotateCcw size={20} />
      </button>
      <div className="w-[2px] h-8 bg-black"></div>
      <button
        onClick={prevStep}
        disabled={currentStepIndex === 0}
        className="p-2 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all disabled:opacity-30"
      >
        <SkipBack size={20} />
      </button>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-12 h-12 flex items-center justify-center bg-primary-yellow border-2 border-black shadow-brutal active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all"
      >
        {isPlaying ? <Pause size={24} className="fill-black" /> : <Play size={24} className="fill-black" />}
      </button>

      <button
        onClick={nextStep}
        disabled={currentStepIndex === steps.length - 1}
        className="p-2 hover:bg-gray-100 border-2 border-transparent hover:border-black transition-all disabled:opacity-30"
      >
        <SkipForward size={20} />
      </button>

      <div className="w-[2px] h-8 bg-black"></div>

      <div className="flex items-center gap-2 px-2">
        <span className="text-xs font-black uppercase">Speed</span>
        <select
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="bg-white border-2 border-black px-2 py-1 font-bold text-xs outline-none"
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
