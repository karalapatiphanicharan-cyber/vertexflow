import React, { useEffect } from 'react';
import { Navbar } from '../../components/common/Navbar';
import {
  ArrowLeftRight,
  Activity,
  Clock,
  Layers,
  Play,
  RotateCcw,
  Shuffle,
  Zap,
  BarChart3,
  RefreshCw,
  Database,
  Route,
  CheckCircle2,
  AlertTriangle,
  History as HistoryIcon
} from 'lucide-react';
import { useComparisonStore } from '../../store/useComparisonStore';
import ComparisonGraph from '../../components/comparison/ComparisonGraph';
import { runAlgorithm } from '../../utils/algorithmRunner';
import { generateRandomGraph } from '../../utils/graphGenerator';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { NeoButton } from '../../components/common/NeoButton';
import { useGraphStore } from '../../store/useGraphStore';

const ComparisonPage: React.FC = () => {
  const {
    sideA,
    sideB,
    setSideA,
    setSideB,
    resetComparison,
    startSimultaneous,
    syncFromPlayground,
    autoSync,
    setAutoSync,
    syncedVersion,
    lastSyncTime
  } = useComparisonStore();

  const {
    nodes: playgroundNodes,
    edges: playgroundEdges,
    graphVersion
  } = useGraphStore();

  const isSynced = graphVersion === syncedVersion;

  // Auto-Sync Logic
  useEffect(() => {
    if (autoSync && !isSynced) {
      syncFromPlayground();
    }
  }, [autoSync, graphVersion, syncedVersion, syncFromPlayground]);

  // Initialization
  useEffect(() => {
    if (sideA.nodes.length === 0) {
      if (playgroundNodes.length > 0) {
        syncFromPlayground();
      } else {
        handleGenerate();
      }
    }
  }, []);

  const handleGenerate = () => {
    const { nodes, edges } = generateRandomGraph(6, 'medium', false, false);
    setSideA({ nodes, edges, steps: [], currentStepIndex: 0, isPlaying: false });
    setSideB({ nodes: JSON.parse(JSON.stringify(nodes)), edges: JSON.parse(JSON.stringify(edges)), steps: [], currentStepIndex: 0, isPlaying: false });
  };

  const handleRunAll = () => {
    const { isDirected, startNodeId, endNodeId } = useComparisonStore.getState();
    const effectiveStartId = startNodeId || sideA.nodes[0]?.id || '';

    const resA = runAlgorithm(sideA.algorithm, sideA.nodes, sideA.edges, isDirected, effectiveStartId, endNodeId);
    const resB = runAlgorithm(sideB.algorithm, sideB.nodes, sideB.edges, isDirected, effectiveStartId, endNodeId);

    // Extract Traversal Order
    const getOrder = (steps: any[]) => {
       const order: string[] = [];
       const seen = new Set();
       steps.forEach(s => s.visitedNodes.forEach((id: string) => {
          if (!seen.has(id)) { order.push(id); seen.add(id); }
       }));
       return order;
    };

    setSideA({
      steps: resA.steps,
      currentStepIndex: 0,
      metrics: {
        ...sideA.metrics,
        runtime: resA.runtimeMs,
        steps: resA.steps.length,
        nodesVisited: resA.steps[resA.steps.length - 1]?.visitedNodes?.size || 0,
        traversalOrder: getOrder(resA.steps),
        memoryEstimate: (resA.steps.length * 0.5).toFixed(1) + ' KB'
      }
    });

    setSideB({
      steps: resB.steps,
      currentStepIndex: 0,
      metrics: {
        ...sideB.metrics,
        runtime: resB.runtimeMs,
        steps: resB.steps.length,
        nodesVisited: resB.steps[resB.steps.length - 1]?.visitedNodes?.size || 0,
        traversalOrder: getOrder(resB.steps),
        memoryEstimate: (resB.steps.length * 0.5).toFixed(1) + ' KB'
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
    { name: 'Visited', A: sideA.metrics.nodesVisited, B: sideB.metrics.nodesVisited },
    { name: 'Runtime', A: Math.round(sideA.metrics.runtime * 10), B: Math.round(sideB.metrics.runtime * 10) },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 p-4 md:p-12 max-w-[1600px] mx-auto w-full">
        <header className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
           <div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="px-3 py-1 bg-black text-white font-black text-[10px] uppercase tracking-[0.3em]">Analysis</div>
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
                <ArrowLeftRight size={56} className="text-primary-blue" /> Comparison <span className="text-gray-300">Mode</span>
              </h1>
              <p className="text-lg font-bold text-gray-500 max-w-2xl">
                 Evaluate multiple algorithms on the same graph topology. Perfect for understanding trade-offs in time, space, and traversal patterns.
              </p>
           </div>

           <div className="flex flex-wrap gap-4">
              <NeoButton onClick={syncFromPlayground} variant="secondary" className="flex items-center gap-2">
                <RefreshCw size={20} /> Sync Playground
              </NeoButton>
              <NeoButton onClick={handleRunAll} variant="primary" className="flex items-center gap-2">
                <Play size={20} /> Run Analysis
              </NeoButton>
              <button onClick={resetComparison} className="p-4 border-4 border-black bg-white hover:bg-gray-100 shadow-brutal active:translate-y-1 active:shadow-none transition-all">
                <RotateCcw size={24} />
              </button>
           </div>
        </header>

        {/* Sync Status Panel */}
        <div className="mb-12 p-6 border-4 border-black bg-gray-50 shadow-brutal rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-8">
           <div className="flex items-center gap-6">
              <div className={`flex items-center gap-2 px-4 py-2 border-4 border-black font-black uppercase text-sm ${isSynced ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600 animate-pulse'}`}>
                 {isSynced ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
                 {isSynced ? 'Synced' : 'Out of Sync'}
              </div>
              <div className="space-y-1">
                 <div className="flex items-center gap-4 text-[10px] font-black uppercase text-gray-500">
                    <span className="flex items-center gap-1"><HistoryIcon size={12} /> Last Sync: {lastSyncTime || 'Never'}</span>
                    <span>Version: {syncedVersion}</span>
                 </div>
                 <div className="flex items-center gap-4 text-xs font-black uppercase">
                    <span>Nodes: {sideA.nodes.length}</span>
                    <span>Edges: {sideA.edges.length}</span>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-6 border-l-4 border-black border-dashed pl-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                 <div className="relative">
                    <input
                      type="checkbox"
                      checked={autoSync}
                      onChange={(e) => setAutoSync(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-gray-200 border-4 border-black rounded-full peer peer-checked:bg-primary-blue transition-all"></div>
                    <div className="absolute top-1 left-1 w-4 h-4 bg-black rounded-full transition-all peer-checked:translate-x-6"></div>
                 </div>
                 <span className="font-black uppercase text-xs tracking-tight group-hover:text-primary-blue transition-colors">Auto-Sync Playground</span>
              </label>

              {!isSynced && !autoSync && (
                <NeoButton onClick={syncFromPlayground} variant="primary" className="py-2 px-4 text-xs">
                  Sync Now
                </NeoButton>
              )}
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
           <ComparisonStatCard
             icon={<Clock className="text-blue-500" />}
             label="Engine Runtime"
             valA={`${sideA.metrics.runtime}ms`}
             valB={`${sideB.metrics.runtime}ms`}
             winner={sideA.metrics.runtime > 0 && sideA.metrics.runtime < sideB.metrics.runtime ? 'A' : (sideB.metrics.runtime > 0 && sideB.metrics.runtime < sideA.metrics.runtime ? 'B' : null)}
           />
           <ComparisonStatCard
             icon={<Layers className="text-purple-500" />}
             label="Execution Steps"
             valA={sideA.metrics.steps}
             valB={sideB.metrics.steps}
             winner={sideA.metrics.steps > 0 && sideA.metrics.steps < sideB.metrics.steps ? 'A' : (sideB.metrics.steps > 0 && sideB.metrics.steps < sideA.metrics.steps ? 'B' : null)}
           />
           <ComparisonStatCard
             icon={<Database className="text-green-500" />}
             label="Memory Est."
             valA={sideA.metrics.memoryEstimate}
             valB={sideB.metrics.memoryEstimate}
             winner={null}
           />
           <div className="border-4 border-black p-8 bg-black text-white shadow-brutal flex flex-col justify-center items-center rounded-[32px]">
              <Zap size={32} className="mb-2 text-primary-yellow" />
              <div className="font-black uppercase text-center leading-tight">
                 Real-Time Efficiency
              </div>
              <div className="text-[10px] font-bold mt-2 opacity-60 text-center">
                 {sideA.metrics.steps === 0 ? "START ANALYSIS TO VIEW DATA" :
                   sideA.metrics.steps < sideB.metrics.steps ? "ALGO A IS MORE STEP-EFFICIENT" : "ALGO B IS MORE STEP-EFFICIENT"}
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 border-4 border-black p-8 bg-white shadow-brutal rounded-[32px]">
              <div className="flex items-center gap-3 mb-8">
                 <BarChart3 size={32} className="text-primary-blue" />
                 <h2 className="text-3xl font-black uppercase tracking-tight">Performance Chart</h2>
              </div>
              <div className="h-[350px] w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                       <XAxis dataKey="name" stroke="#000" tick={{fontWeight: 'black', fontSize: 10}} />
                       <YAxis stroke="#000" tick={{fontWeight: 'black', fontSize: 10}} />
                       <Tooltip
                         contentStyle={{border: '4px solid black', borderRadius: '0', fontWeight: 'black', textTransform: 'uppercase', fontSize: '10px'}}
                         cursor={{fill: '#f3f4f6'}}
                       />
                       <Bar dataKey="A" fill="#3B82F6" name="Algorithm A" stroke="#000" strokeWidth={3} />
                       <Bar dataKey="B" fill="#FEF08A" name="Algorithm B" stroke="#000" strokeWidth={3} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="border-4 border-black p-8 bg-gray-50 shadow-brutal rounded-[32px] flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                 <Route size={32} className="text-primary-blue" />
                 <h2 className="text-3xl font-black uppercase tracking-tight">Traversal</h2>
              </div>
              <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                 <div>
                    <div className="text-[10px] font-black uppercase text-gray-400 mb-2">Algorithm A Order</div>
                    <div className="flex flex-wrap gap-1">
                       {sideA.metrics.traversalOrder.map((id, i) => (
                          <div key={i} className="w-8 h-8 border-2 border-black bg-primary-blue text-white flex items-center justify-center font-black text-xs">{id}</div>
                       ))}
                       {sideA.metrics.traversalOrder.length === 0 && <div className="text-xs font-bold text-gray-300 italic">Run to see order</div>}
                    </div>
                 </div>
                 <div className="pt-4 border-t-2 border-black border-dashed">
                    <div className="text-[10px] font-black uppercase text-gray-400 mb-2">Algorithm B Order</div>
                    <div className="flex flex-wrap gap-1">
                       {sideB.metrics.traversalOrder.map((id, i) => (
                          <div key={i} className="w-8 h-8 border-2 border-black bg-primary-yellow text-black flex items-center justify-center font-black text-xs">{id}</div>
                       ))}
                       {sideB.metrics.traversalOrder.length === 0 && <div className="text-xs font-bold text-gray-300 italic">Run to see order</div>}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonStatCard = ({ icon, label, valA, valB, winner }: any) => (
  <div className="border-4 border-black p-8 bg-white shadow-brutal relative overflow-hidden rounded-[32px]">
     <div className="flex items-center gap-2 mb-6 font-black uppercase text-xs tracking-widest text-gray-400">
        {icon} {label}
     </div>
     <div className="flex justify-between items-end relative z-10">
        <div className={winner === 'A' ? "text-primary-blue" : ""}>
           <div className="text-[10px] font-black uppercase opacity-30 mb-1">Algo A</div>
           <div className="text-4xl font-black tracking-tighter">{valA}</div>
        </div>
        <div className="text-gray-100 font-black text-5xl mx-2 italic select-none">VS</div>
        <div className={winner === 'B' ? "text-primary-blue text-right" : "text-right"}>
           <div className="text-[10px] font-black uppercase opacity-30 mb-1">Algo B</div>
           <div className="text-4xl font-black tracking-tighter">{valB}</div>
        </div>
     </div>
     {winner && (
        <div className={`absolute top-4 right-4 px-3 py-1 border-2 border-black text-[10px] font-black uppercase ${winner === 'A' ? 'bg-primary-blue text-white left-4 right-auto' : 'bg-primary-yellow text-black'}`}>
           Optimal
        </div>
     )}
  </div>
);

export default ComparisonPage;
