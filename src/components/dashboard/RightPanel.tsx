import React from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import {
  BarChart3,
  Info,
  Terminal,
  Activity,
  History,
  BookOpen,
  Quote
} from 'lucide-react';
import { GraphStats } from './GraphStats';

export const RightPanel: React.FC = () => {
  const { steps, currentStepIndex, setCurrentStepIndex } = useGraphStore();
  const currentStep = steps[currentStepIndex];

  return (
    <div className="flex flex-col h-full bg-white font-sans">
      <div className="p-6 md:p-8 border-b-4 border-black bg-gray-50">
        <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-3 tracking-tighter">
          <Info size={24} className="text-primary-blue" /> Step Story
        </h3>
        <div className="relative border-4 border-black bg-primary-yellow p-6 shadow-brutal mb-4">
           <Quote size={20} className="absolute -top-3 -left-3 text-black fill-black" />
           <p className="text-sm font-black leading-relaxed">
            {currentStep?.explanation || 'Select an algorithm and press start to begin the step-by-step visualization.'}
           </p>
        </div>
        {currentStep?.complexity && (
          <div className="grid grid-cols-2 gap-3">
             <div className="border-2 border-black p-2 bg-white text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-[9px] font-black uppercase text-gray-400">Time Complexity</div>
                <div className="text-xs font-black">{currentStep.complexity.time}</div>
             </div>
             <div className="border-2 border-black p-2 bg-white text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-[9px] font-black uppercase text-gray-400">Space Complexity</div>
                <div className="text-xs font-black">{currentStep.complexity.space}</div>
             </div>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar">
        <section>
          <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-3 tracking-tight">
            <Terminal size={20} className="text-primary-blue" /> Internals
          </h3>
          <div className="border-4 border-black bg-black p-4 font-mono text-xs space-y-4 shadow-brutal text-white overflow-hidden">
            {currentStep?.queueState && (
              <div>
                <div className="font-black mb-2 uppercase text-[9px] text-primary-yellow">Queue Structure:</div>
                <div className="flex flex-wrap gap-1">
                  {currentStep.queueState.map((val: any, i: number) => (
                    <div key={i} className="border border-white/20 px-2 py-1 bg-white/10 text-white min-w-[24px] text-center">{val}</div>
                  ))}
                  {currentStep.queueState.length === 0 && <span className="text-gray-500 italic">Empty</span>}
                </div>
              </div>
            )}
            {currentStep?.stackState && (
              <div>
                <div className="font-black mb-2 uppercase text-[9px] text-primary-blue">Stack View:</div>
                <div className="flex flex-col-reverse gap-1 border-l-2 border-primary-blue pl-3">
                  {currentStep.stackState.map((val: any, i: number) => (
                    <div key={i} className="border border-white/20 px-2 py-1 bg-white/10 text-white w-full">{val}</div>
                  ))}
                  {currentStep.stackState.length === 0 && <span className="text-gray-500 italic">Empty</span>}
                </div>
              </div>
            )}
            {currentStep?.priorityQueueState && (
              <div>
                <div className="font-black mb-2 uppercase text-[9px] text-orange-500">Priority Queue (Node:Dist):</div>
                <div className="flex flex-wrap gap-1">
                  {currentStep.priorityQueueState.map((val: any, i: number) => (
                    <div key={i} className="border border-white/20 px-2 py-1 bg-white/10 text-white min-w-[24px] text-center">{val}</div>
                  ))}
                  {currentStep.priorityQueueState.length === 0 && <span className="text-gray-500 italic">Empty</span>}
                </div>
              </div>
            )}
            {currentStep?.dsuState && (
              <div>
                <div className="font-black mb-2 uppercase text-[9px] text-purple-500">DSU State (Parent Map):</div>
                <div className="grid grid-cols-4 gap-1">
                  {Object.entries(currentStep.dsuState).map(([node, parent]: [any, any]) => (
                    <div key={node} className="border border-white/20 px-1 py-1 bg-white/10 text-[8px] text-center">
                      <span className="text-gray-400">{node}</span>→{parent}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!currentStep?.queueState && !currentStep?.stackState && !currentStep?.priorityQueueState && !currentStep?.dsuState && (
               <div className="text-gray-500 py-4 text-center border border-dashed border-gray-700">
                  Awaiting algorithm data...
               </div>
            )}
          </div>
        </section>

        <section>
          <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-3 tracking-tight">
            <History size={20} className="text-primary-blue" /> Timeline
          </h3>
          <div className="space-y-4">
             <div className="relative pt-1">
                <input
                  type="range"
                  min={0}
                  max={Math.max(0, steps.length - 1)}
                  value={currentStepIndex}
                  onChange={(e) => setCurrentStepIndex(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 border-4 border-black rounded-none appearance-none cursor-pointer accent-primary-blue"
                />
             </div>
             <div className="flex justify-between font-black text-[10px] uppercase tracking-widest text-gray-400">
                <span>Start</span>
                <span className="bg-black text-white px-2 py-0.5 border-2 border-black">Step {currentStepIndex} / {Math.max(0, steps.length - 1)}</span>
                <span>Finish</span>
             </div>
          </div>
        </section>

        <GraphStats />

        <section className="pb-8">
           <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-3 tracking-tight">
            <BookOpen size={20} className="text-primary-blue" /> Quick Tip
          </h3>
          <div className="p-4 border-4 border-black bg-gray-50 shadow-brutal">
             <p className="text-xs font-bold text-gray-600 leading-relaxed italic">
                {currentStep?.explanation ? "Keep an eye on the internal data structure to understand how the algorithm makes decisions at each step." : "Select an algorithm and starting point to see how it works internally."}
             </p>
          </div>
        </section>
      </div>
    </div>
  );
};
