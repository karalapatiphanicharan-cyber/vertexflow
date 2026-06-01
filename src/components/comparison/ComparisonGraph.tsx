import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import GraphCanvas from '../graph/GraphCanvas';
import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';
import { Play, Pause, RotateCcw, FastForward, Rewind } from 'lucide-react';

interface ComparisonGraphProps {
  title: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
  steps: AlgorithmStep[];
  currentStepIndex: number;
  algorithm: string;
  onAlgorithmChange: (algo: string) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
}

const ComparisonGraph: React.FC<ComparisonGraphProps> = ({
  title,
  nodes,
  edges,
  steps,
  currentStepIndex,
  algorithm,
  onAlgorithmChange,
  isPlaying,
  onTogglePlay,
  onReset,
  onStepForward,
  onStepBackward
}) => {
  return (
    <div className="border-4 border-black p-6 bg-white shadow-brutal flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-black text-white px-3 py-1 font-black uppercase text-xs tracking-widest">{title}</div>
        <select
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          className="border-4 border-black font-black uppercase text-xs p-1 outline-none bg-white cursor-pointer hover:bg-gray-50"
        >
          <optgroup label="Traversal">
            <option value="bfs">BFS</option>
            <option value="dfs">DFS</option>
          </optgroup>
          <optgroup label="Shortest Path">
            <option value="dijkstra">Dijkstra</option>
            <option value="bellmanFord">Bellman-Ford</option>
            <option value="astar">A* Search</option>
          </optgroup>
          <optgroup label="MST">
            <option value="prim">Prim's</option>
            <option value="kruskal">Kruskal's</option>
          </optgroup>
          <optgroup label="Other">
            <option value="topologicalSort">Topological Sort</option>
            <option value="cycleDetection">Cycle Detection</option>
          </optgroup>
        </select>
      </div>

      <div className="flex-1 border-4 border-black mb-4 relative min-h-[400px] bg-gray-50">
        <ReactFlowProvider>
          <GraphCanvas
            nodes={nodes}
            edges={edges}
            steps={steps}
            currentStepIndex={currentStepIndex}
          />
        </ReactFlowProvider>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button onClick={onStepBackward} className="p-2 border-4 border-black bg-white hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
            <Rewind size={16} />
          </button>
          <button onClick={onTogglePlay} className="p-2 border-4 border-black bg-primary-yellow hover:bg-yellow-300 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <button onClick={onStepForward} className="p-2 border-4 border-black bg-white hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
            <FastForward size={16} />
          </button>
          <button onClick={onReset} className="p-2 border-4 border-black bg-white hover:bg-gray-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
            <RotateCcw size={16} />
          </button>
        </div>
        <div className="font-black text-xs uppercase tracking-tighter">
          Step <span className="text-primary-blue text-sm">{currentStepIndex}</span> / {Math.max(0, steps.length - 1)}
        </div>
      </div>
    </div>
  );
};

export default ComparisonGraph;
