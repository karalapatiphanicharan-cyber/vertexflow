import React, { useState } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import {
  Plus,
  Trash2,
  Zap,
  Settings2,
  RefreshCw,
  PlayCircle,
  Download,
  Upload,
  Image as ImageIcon,
  FileCode,
  MousePointer2,
  GitBranchPlus,
  Type
} from 'lucide-react';
import { generateRandomGraph } from '../../utils/graphGenerator';
import { runAlgorithm } from '../../utils/algorithmRunner';
import { toPng, toSvg } from 'html-to-image';
import { NeoButton } from '../common/NeoButton';

export const GraphControls: React.FC = () => {
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    clearGraph,
    setSteps,
    setIsPlaying,
    isDirected,
    isWeighted,
    toggleDirected,
    toggleWeighted,
    selectedAlgorithm,
    setSelectedAlgorithm,
    interactionMode,
    setInteractionMode
  } = useGraphStore();

  const [nodeCount, setNodeCount] = useState(6);
  const [density, setDensity] = useState<'sparse' | 'medium' | 'dense'>('medium');

  const handleGenerate = () => {
    const { nodes: newNodes, edges: newEdges } = generateRandomGraph(nodeCount, density, isDirected, isWeighted);
    setNodes(newNodes);
    setEdges(newEdges);
    useGraphStore.getState().pushHistory();
  };

  const handleRunAlgorithm = () => {
    if (nodes.length === 0) return;
    const res = runAlgorithm(selectedAlgorithm, nodes, edges, isDirected, nodes[0].id);
    setSteps(res.steps);
    setIsPlaying(true);
  };

  const handleExportJSON = () => {
    const data = JSON.stringify({ nodes, edges, isDirected, isWeighted });
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'vertexflow-graph.json';
    link.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = JSON.parse(evt.target?.result as string);
        if (data.nodes && data.edges) {
          setNodes(data.nodes);
          setEdges(data.edges);
          useGraphStore.getState().pushHistory();
        }
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6 space-y-8 h-full overflow-y-auto custom-scrollbar">
      <section>
        <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
          <Settings2 size={20} /> Graph Builder
        </h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
           <button
             onClick={() => setInteractionMode('pointer')}
             className={`p-3 border-4 border-black shadow-brutal transition-all flex flex-col items-center justify-center gap-1 ${interactionMode === 'pointer' ? 'bg-primary-blue text-white' : 'bg-white'}`}
             title="Pointer Mode"
           >
              <MousePointer2 size={20} />
              <span className="text-[8px] font-black uppercase">Select</span>
           </button>
           <button
             onClick={() => setInteractionMode('addNode')}
             className={`p-3 border-4 border-black shadow-brutal transition-all flex flex-col items-center justify-center gap-1 ${interactionMode === 'addNode' ? 'bg-primary-yellow' : 'bg-white'}`}
             title="Add Node Mode"
           >
              <Plus size={20} />
              <span className="text-[8px] font-black uppercase">Node</span>
           </button>
           <button
             onClick={() => setInteractionMode('addEdge')}
             className={`p-3 border-4 border-black shadow-brutal transition-all flex flex-col items-center justify-center gap-1 ${interactionMode === 'addEdge' ? 'bg-primary-yellow' : 'bg-white'}`}
             title="Add Edge Mode"
           >
              <GitBranchPlus size={20} />
              <span className="text-[8px] font-black uppercase">Edge</span>
           </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between font-black text-[10px] uppercase bg-gray-100 p-2 border-2 border-black">
            <span>Directed Graph</span>
            <input type="checkbox" checked={isDirected} onChange={toggleDirected} className="w-4 h-4 border-2 border-black cursor-pointer" />
          </div>
          <div className="flex items-center justify-between font-black text-[10px] uppercase bg-gray-100 p-2 border-2 border-black">
            <span>Weighted Edges</span>
            <input type="checkbox" checked={isWeighted} onChange={toggleWeighted} className="w-4 h-4 border-2 border-black cursor-pointer" />
          </div>
          <NeoButton
            onClick={() => {
              if (window.confirm('Are you sure you want to clear the entire canvas?')) {
                clearGraph();
              }
            }}
            variant="danger"
            className="w-full py-2 flex items-center justify-center gap-2 text-xs"
          >
            <Trash2 size={16} /> Clear Canvas
          </NeoButton>
        </div>
      </section>

      <section className="bg-gray-50 border-4 border-black p-4 shadow-brutal">
        <h3 className="text-sm font-black uppercase mb-4 flex items-center gap-2">
          <RefreshCw size={16} /> Random Generator
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block font-black text-[10px] uppercase mb-1">Nodes: {nodeCount}</label>
            <input
              type="range"
              min={3}
              max={20}
              value={nodeCount}
              onChange={(e) => setNodeCount(parseInt(e.target.value))}
              className="w-full h-2 bg-white border-2 border-black rounded-none appearance-none cursor-pointer"
            />
          </div>
          <div className="flex gap-1">
             {['sparse', 'medium', 'dense'].map(d => (
               <button
                 key={d}
                 onClick={() => setDensity(d as any)}
                 className={`flex-1 border-2 border-black py-1 text-[8px] font-black uppercase transition-colors ${density === d ? 'bg-black text-white' : 'bg-white'}`}
               >
                 {d}
               </button>
             ))}
          </div>
          <button
            onClick={handleGenerate}
            className="w-full bg-white border-2 border-black py-2 font-black uppercase text-[10px] hover:bg-gray-100 active:translate-y-0.5"
          >
            Generate Graph
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
          <PlayCircle size={20} /> Runner
        </h3>
        <div className="space-y-4">
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="w-full border-4 border-black p-3 font-black uppercase text-xs outline-none bg-white cursor-pointer shadow-brutal"
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
            <optgroup label="Minimum Spanning Tree">
              <option value="prim">Prim's</option>
              <option value="kruskal">Kruskal's</option>
            </optgroup>
            <optgroup label="Connectivity">
              <option value="topologicalSort">Topological Sort</option>
              <option value="kosaraju">Kosaraju</option>
              <option value="tarjan">Tarjan</option>
              <option value="connectedComponents">Connected Components</option>
              <option value="cycleDetection">Cycle Detection</option>
            </optgroup>
          </select>
          <NeoButton
            onClick={handleRunAlgorithm}
            variant="blue"
            className="w-full py-4 text-sm"
          >
            Start Visualization
          </NeoButton>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
          <Download size={20} /> Export / Import
        </h3>
        <div className="grid grid-cols-2 gap-2">
           <button
             onClick={handleExportJSON}
             className="border-2 border-black p-2 bg-white text-[8px] font-black uppercase hover:bg-gray-50 flex items-center justify-center gap-1"
           >
             <Download size={12} /> JSON
           </button>
           <label className="border-2 border-black p-2 bg-white text-[8px] font-black uppercase hover:bg-gray-50 flex items-center justify-center gap-1 cursor-pointer">
             <Upload size={12} /> JSON
             <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
           </label>
           <button
             onClick={() => {
                const el = document.querySelector('.react-flow') as HTMLElement;
                if (el) toPng(el).then((dataUrl: string) => {
                  const link = document.createElement('a');
                  link.download = 'vertexflow-graph.png';
                  link.href = dataUrl;
                  link.click();
                });
             }}
             className="border-2 border-black p-2 bg-white text-[8px] font-black uppercase hover:bg-gray-50 flex items-center justify-center gap-1"
           >
             <ImageIcon size={12} /> PNG
           </button>
           <button
             onClick={() => {
                const el = document.querySelector('.react-flow') as HTMLElement;
                if (el) toSvg(el).then((dataUrl: string) => {
                  const link = document.createElement('a');
                  link.download = 'vertexflow-graph.svg';
                  link.href = dataUrl;
                  link.click();
                });
             }}
             className="border-2 border-black p-2 bg-white text-[8px] font-black uppercase hover:bg-gray-50 flex items-center justify-center gap-1"
           >
             <FileCode size={12} /> SVG
           </button>
        </div>
      </section>
    </div>
  );
};
