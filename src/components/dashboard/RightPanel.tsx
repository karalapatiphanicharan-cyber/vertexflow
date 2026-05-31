import React from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import {
  BarChart3,
  Info,
  Terminal,
  Activity,
  History,
  BookOpen
} from 'lucide-react';
import { GraphStats } from './GraphStats';

export const RightPanel: React.FC = () => {
  const { steps, currentStepIndex, setCurrentStepIndex } = useGraphStore();
  const currentStep = steps[currentStepIndex];

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 border-b-4 border-black">
        <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
          <Info size={20} /> Algorithm Story
        </h3>
        <div className="neo-brutal-card bg-primary-yellow p-4 mb-2">
          <p className="text-sm font-bold italic">
            "{currentStep?.explanation || 'Select an algorithm to begin visualization.'}"
          </p>
        </div>
        {currentStep?.complexity && (
          <div className="flex gap-2">
             <div className="flex-1 border-2 border-black p-1 text-center bg-white">
                <div className="text-[8px] font-black uppercase">Time</div>
                <div className="text-[10px] font-bold">{currentStep.complexity.time}</div>
             </div>
             <div className="flex-1 border-2 border-black p-1 text-center bg-white">
                <div className="text-[8px] font-black uppercase">Space</div>
                <div className="text-[10px] font-bold">{currentStep.complexity.space}</div>
             </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        <section>
          <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
            <Terminal size={20} /> Data Structures
          </h3>
          <div className="border-2 border-black bg-white p-3 font-mono text-xs space-y-2">
            {currentStep?.queueState && (
              <div>
                <div className="font-black mb-1 uppercase text-[10px]">Queue:</div>
                <div className="flex gap-1">
                  {currentStep.queueState.map((val: any, i: number) => (
                    <div key={i} className="border border-black px-2 bg-primary-blue text-white">{val}</div>
                  ))}
                  {currentStep.queueState.length === 0 && <span className="text-gray-400">Empty</span>}
                </div>
              </div>
            )}
            {currentStep?.stackState && (
              <div>
                <div className="font-black mb-1 uppercase text-[10px]">Stack:</div>
                <div className="flex flex-col-reverse gap-1 border-l-2 border-black pl-2">
                  {currentStep.stackState.map((val: any, i: number) => (
                    <div key={i} className="border border-black px-2 bg-gray-100">{val}</div>
                  ))}
                  {currentStep.stackState.length === 0 && <span className="text-gray-400">Empty</span>}
                </div>
              </div>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
            <History size={20} /> Step Timeline
          </h3>
          <div className="space-y-2">
             <input
               type="range"
               min={0}
               max={Math.max(0, steps.length - 1)}
               value={currentStepIndex}
               onChange={(e) => setCurrentStepIndex(parseInt(e.target.value))}
               className="w-full h-2 bg-gray-200 border-2 border-black rounded-none appearance-none cursor-pointer"
             />
             <div className="flex justify-between font-bold text-[10px] uppercase">
                <span>Step {currentStepIndex}</span>
                <span>Step {Math.max(0, steps.length - 1)}</span>
             </div>
          </div>
        </section>

        <GraphStats />

        <section>
           <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
            <BookOpen size={20} /> Learning Mode
          </h3>
          <div className="space-y-4">
             <div className="p-3 border-2 border-black bg-gray-50">
               <h4 className="text-xs font-black uppercase mb-1">Interview Tip</h4>
               <p className="text-[11px] font-bold">BFS is optimal for finding the shortest path in unweighted graphs.</p>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};
