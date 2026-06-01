import React, { useEffect, useRef } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import {
  Play,
  Pause,
  RotateCcw,
  FastForward,
  Rewind,
  Plus,
  Minus,
  Maximize
} from 'lucide-react';
import { useReactFlow } from '@xyflow/react';

export const AnimationControls: React.FC = () => {
  const {
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    currentStepIndex,
    setCurrentStepIndex,
    steps,
  } = useGraphStore();

  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      const delay = 1000 / speed;
      timerRef.current = window.setTimeout(() => {
        setCurrentStepIndex(currentStepIndex + 1);
      }, delay);
    } else if (currentStepIndex >= steps.length - 1 && steps.length > 0) {
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

  const hasSteps = steps.length > 0;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] md:w-auto">
      <div className="flex flex-col md:flex-row items-center gap-4 bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[32px] transition-all">

        {/* Zoom Controls Section */}
        <div className="flex items-center gap-2 pr-4 md:border-r-4 border-black border-dashed">
          <button
            onClick={() => zoomIn()}
            className="p-2 border-2 border-black bg-white hover:bg-primary-yellow active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none rounded-xl"
            title="Zoom In"
          >
            <Plus size={18} strokeWidth={3} />
          </button>
          <button
            onClick={() => zoomOut()}
            className="p-2 border-2 border-black bg-white hover:bg-primary-yellow active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none rounded-xl"
            title="Zoom Out"
          >
            <Minus size={18} strokeWidth={3} />
          </button>
          <button
            onClick={() => fitView()}
            className="p-2 border-2 border-black bg-white hover:bg-primary-yellow active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none rounded-xl"
            title="Fit to Screen"
          >
            <Maximize size={18} strokeWidth={3} />
          </button>
        </div>

        {/* Playback Controls Section */}
        <div className={`flex items-center gap-4 ${!hasSteps ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
          <button
            onClick={handleRestart}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            title="Restart"
          >
            <RotateCcw size={20} strokeWidth={3} />
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={stepBackward}
              className="p-2 border-2 border-black bg-white hover:bg-gray-50 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none rounded-xl"
              disabled={!hasSteps}
            >
              <Rewind size={20} fill="black" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-14 h-14 border-4 border-black rounded-2xl flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none ${isPlaying ? 'bg-white' : 'bg-primary-yellow'}`}
              disabled={!hasSteps}
            >
              {isPlaying ? <Pause size={28} fill="black" /> : <Play size={28} fill="black" className="ml-1" />}
            </button>

            <button
              onClick={stepForward}
              className="p-2 border-2 border-black bg-white hover:bg-gray-50 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none rounded-xl"
              disabled={!hasSteps}
            >
              <FastForward size={20} fill="black" />
            </button>
          </div>
        </div>

        {/* Timeline Section */}
        {hasSteps && (
          <div className="flex items-center gap-4 px-4 border-l-4 border-black border-dashed min-w-[200px] hidden lg:flex flex-1">
            <input
              type="range"
              min={0}
              max={Math.max(0, steps.length - 1)}
              value={currentStepIndex}
              onChange={(e) => setCurrentStepIndex(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 border-2 border-black rounded-none appearance-none cursor-pointer accent-primary-blue"
            />
            <span className="font-black text-[10px] tabular-nums min-w-[60px] text-center">
              {currentStepIndex} / {steps.length - 1}
            </span>
          </div>
        )}

        {/* Speed Selection Section */}
        <div className={`flex items-center gap-3 pl-4 md:border-l-4 border-black border-dashed ${!hasSteps ? 'opacity-40 grayscale pointer-events-none' : ''}`}>
          <span className="font-black text-[10px] uppercase tracking-tighter hidden xl:inline">Speed</span>
          <select
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="border-2 border-black p-1 bg-white font-black text-xs outline-none cursor-pointer rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            disabled={!hasSteps}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1.0x</option>
            <option value={2}>2.0x</option>
            <option value={4}>4.0x</option>
          </select>
        </div>

        {!hasSteps && (
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black text-white px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-widest animate-pulse">
            Awaiting Algorithm Execution
          </div>
        )}
      </div>
    </div>
  );
};
