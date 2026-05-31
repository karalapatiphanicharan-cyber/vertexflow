import React, { useEffect } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { ArrowLeftRight, Activity, Clock, Layers, Play, RotateCcw, Shuffle, Zap, BarChart3 } from 'lucide-react';
import { useComparisonStore } from '../../store/useComparisonStore';
import ComparisonGraph from '../../components/comparison/ComparisonGraph';
import { runAlgorithm } from '../../utils/algorithmRunner';
import { generateRandomGraph } from '../../utils/graphGenerator';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const ComparisonPage: React.FC = () => {
  const { sideA, sideB, setSideA, setSideB, resetComparison, startSimultaneous } = useComparisonStore();

  // Initialization
  useEffect(() => {
    if (sideA.nodes.length === 0) {
      handleGenerate();
    }
  }, []);

  const handleGenerate = () => {
    const { nodes, edges } = generateRandomGraph(8, 'medium', false, false);
    setSideA({ nodes, edges, steps: [], currentStepIndex: 0, isPlaying: false, metrics: { runtime: 0, steps: 0, nodesVisited: 0, edgesTraversed: 0 } });
    setSideB({ nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), steps: [], currentStepIndex: 0, isPlaying: false, metrics: { runtime: 0, steps: 0, nodesVisited: 0, edgesTraversed: 0 } });
  };

  const handleRunAll = () => {
    const startNodeId = sideA.nodes[0]?.id || '';
    const resA = runAlgorithm(sideA.algorithm, sideA.nodes, sideA.edges, false, startNodeId);
    const resB = runAlgorithm(sideB.algorithm, sideB.nodes, sideB.edges, false, startNodeId);

    setSideA({
      steps: resA.steps,
      currentStepIndex: 0,
      metrics: {
        ...sideA.metrics,
        runtime: resA.runtimeMs,
        steps: resA.steps.length,
        nodesVisited: resA.steps[resA.steps.length - 1]?.visitedNodes?.size || 0
      }
    });

    setSideB({
      steps: resB.steps,
      currentStepIndex: 0,
      metrics: {
        ...sideB.metrics,
        runtime: resB.runtimeMs,
        steps: resB.steps.length,
        nodesVisited: resB.steps[resB.steps.length - 1]?.visitedNodes?.size || 0
      }
    });

    startSimultaneous();
  };

  // Playback logic
  useEffect(() => {
    let intervalA: any;
    if (sideA.isPlaying && sideA.currentStepIndex < sideA.steps.length - 1) {
      intervalA = setInterval(() => {
        setSideA({ currentStepIndex: sideA.currentStepIndex + 1 });
      }, 300 / sideA.speed);
    } else if (sideA.currentStepIndex >= sideA.steps.length - 1) {
      setSideA({ isPlaying: false });
    }
    return () => clearInterval(intervalA);
  }, [sideA.isPlaying, sideA.currentStepIndex, sideA.steps.length, sideA.speed]);

  useEffect(() => {
    let intervalB: any;
    if (sideB.isPlaying && sideB.currentStepIndex < sideB.steps.length - 1) {
      intervalB = setInterval(() => {
        setSideB({ currentStepIndex: sideB.currentStepIndex + 1 });
      }, 300 / sideB.speed);
    } else if (sideB.currentStepIndex >= sideB.steps.length - 1) {
      setSideB({ isPlaying: false });
    }
    return () => clearInterval(intervalB);
  }, [sideB.isPlaying, sideB.currentStepIndex, sideB.steps.length, sideB.speed]);

  const chartData = [
    { name: 'Steps', A: sideA.metrics.steps, B: sideB.metrics.steps },
    { name: 'Visited', A: sideA.steps[sideA.currentStepIndex]?.visitedNodes?.size || 0, B: sideB.steps[sideB.currentStepIndex]?.visitedNodes?.size || 0 },
    { name: 'Runtime (x100)', A: Math.round(sideA.metrics.runtime * 100), B: Math.round(sideB.metrics.runtime * 100) },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 p-8">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
           <div>
              <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
                <ArrowLeftRight size={48} /> Algorithm Comparison
              </h1>
              <p className="text-xl font-bold text-gray-600">Run algorithms side-by-side and compare their performance.</p>
           </div>

           <div className="flex gap-4">
              <button
                onClick={handleGenerate}
                className="flex items-center gap-2 border-4 border-black px-6 py-3 font-black uppercase hover:bg-gray-100 transition-all shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <Shuffle size={20} /> New Graph
              </button>
              <button
                onClick={handleRunAll}
                className="flex items-center gap-2 border-4 border-black px-6 py-3 font-black uppercase bg-primary-yellow hover:bg-yellow-300 transition-all shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <Play size={20} /> Run Comparison
              </button>
              <button
                onClick={resetComparison}
                className="flex items-center gap-2 border-4 border-black px-6 py-3 font-black uppercase bg-white hover:bg-gray-100 transition-all shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <RotateCcw size={20} /> Reset
              </button>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
           <ComparisonGraph
             title="Algorithm A"
             nodes={sideA.nodes}
             edges={sideA.edges}
             steps={sideA.steps}
             currentStepIndex={sideA.currentStepIndex}
             algorithm={sideA.algorithm}
             onAlgorithmChange={(algo) => setSideA({ algorithm: algo, steps: [], currentStepIndex: 0 })}
             isPlaying={sideA.isPlaying}
             onTogglePlay={() => setSideA({ isPlaying: !sideA.isPlaying })}
             onReset={() => setSideA({ currentStepIndex: 0, isPlaying: false })}
             onStepForward={() => setSideA({ currentStepIndex: Math.min(sideA.steps.length - 1, sideA.currentStepIndex + 1) })}
             onStepBackward={() => setSideA({ currentStepIndex: Math.max(0, sideA.currentStepIndex - 1) })}
           />

           <ComparisonGraph
             title="Algorithm B"
             nodes={sideB.nodes}
             edges={sideB.edges}
             steps={sideB.steps}
             currentStepIndex={sideB.currentStepIndex}
             algorithm={sideB.algorithm}
             onAlgorithmChange={(algo) => setSideB({ algorithm: algo, steps: [], currentStepIndex: 0 })}
             isPlaying={sideB.isPlaying}
             onTogglePlay={() => setSideB({ isPlaying: !sideB.isPlaying })}
             onReset={() => setSideB({ currentStepIndex: 0, isPlaying: false })}
             onStepForward={() => setSideB({ currentStepIndex: Math.min(sideB.steps.length - 1, sideB.currentStepIndex + 1) })}
             onStepBackward={() => setSideB({ currentStepIndex: Math.max(0, sideB.currentStepIndex - 1) })}
           />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
           <ComparisonStatCard
             icon={<Clock className="text-blue-500" />}
             label="Engine Runtime"
             valA={`${sideA.metrics.runtime}ms`}
             valB={`${sideB.metrics.runtime}ms`}
             winner={sideA.metrics.runtime < sideB.metrics.runtime ? 'A' : sideB.metrics.runtime < sideA.metrics.runtime ? 'B' : null}
           />
           <ComparisonStatCard
             icon={<Layers className="text-purple-500" />}
             label="Execution Steps"
             valA={sideA.metrics.steps}
             valB={sideB.metrics.steps}
             winner={sideA.metrics.steps < sideB.metrics.steps ? 'A' : sideB.metrics.steps < sideA.metrics.steps ? 'B' : null}
           />
           <ComparisonStatCard
             icon={<Activity className="text-green-500" />}
             label="Nodes Explored"
             valA={sideA.steps[sideA.currentStepIndex]?.visitedNodes?.size || 0}
             valB={sideB.steps[sideB.currentStepIndex]?.visitedNodes?.size || 0}
             winner={null}
           />
           <div className="border-4 border-black p-6 bg-primary-blue text-white shadow-brutal flex flex-col justify-center items-center">
              <Zap size={32} className="mb-2 text-primary-yellow" />
              <div className="font-black uppercase text-center leading-tight">
                 Efficiency Analysis
              </div>
              <div className="text-xs font-bold mt-2 opacity-80 text-center">
                 {sideA.metrics.steps === 0 ? "Run algorithms to see comparison analytics." :
                   sideA.metrics.steps < sideB.metrics.steps ? "Algo A is more step-efficient." : "Algo B is more step-efficient."}
              </div>
           </div>
        </div>

        <div className="border-4 border-black p-8 bg-white shadow-brutal">
           <div className="flex items-center gap-3 mb-8">
              <BarChart3 size={32} />
              <h2 className="text-3xl font-black uppercase">Visual Performance Analytics</h2>
           </div>

           <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={chartData}>
                    <XAxis dataKey="name" stroke="#000" tick={{fontWeight: 'bold'}} />
                    <YAxis stroke="#000" tick={{fontWeight: 'bold'}} />
                    <Tooltip
                      contentStyle={{border: '4px solid black', borderRadius: '0', fontWeight: 'bold'}}
                      cursor={{fill: '#f3f4f6'}}
                    />
                    <Bar dataKey="A" fill="#3B82F6" name="Algorithm A" stroke="#000" strokeWidth={2} />
                    <Bar dataKey="B" fill="#FEF08A" name="Algorithm B" stroke="#000" strokeWidth={2} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
           <div className="mt-4 flex justify-center gap-8 font-black uppercase text-sm">
              <div className="flex items-center gap-2">
                 <div className="w-4 h-4 bg-primary-blue border-2 border-black"></div> Algorithm A
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-4 h-4 bg-primary-yellow border-2 border-black"></div> Algorithm B
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonStatCard = ({ icon, label, valA, valB, winner }: any) => (
  <div className="border-4 border-black p-6 bg-white shadow-brutal relative overflow-hidden">
     <div className="flex items-center gap-2 mb-4 font-black uppercase text-sm">
        {icon} {label}
     </div>
     <div className="flex justify-between items-end relative z-10">
        <div className={winner === 'A' ? "text-primary-blue" : ""}>
           <div className="text-[10px] font-black uppercase opacity-40">Algo A</div>
           <div className="text-3xl font-black">{valA}</div>
        </div>
        <div className="text-gray-100 font-black text-4xl mx-2 italic select-none">VS</div>
        <div className={winner === 'B' ? "text-primary-blue text-right" : "text-right"}>
           <div className="text-[10px] font-black uppercase opacity-40">Algo B</div>
           <div className="text-3xl font-black">{valB}</div>
        </div>
     </div>
     {winner && (
        <div className={`absolute top-2 right-2 px-2 py-0.5 border-2 border-black text-[10px] font-black uppercase ${winner === 'A' ? 'bg-primary-yellow left-2 right-auto' : 'bg-primary-yellow'}`}>
           Faster
        </div>
     )}
  </div>
);

export default ComparisonPage;
