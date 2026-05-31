import React, { useState } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { Plus, Trash2, Zap, Settings2, RefreshCw, PlayCircle, Download, Upload, Image as ImageIcon, FileCode } from 'lucide-react';
import { generateRandomGraph } from '../../utils/graphGenerator';
import { runAlgorithm } from '../../utils/algorithmRunner';
import { toPng, toSvg } from 'html-to-image';

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
    setSelectedAlgorithm
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
        }
      } catch (err) {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6 space-y-8">
      <section>
        <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
          <Settings2 size={20} /> Graph Controls
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between font-bold text-xs uppercase">
            <span>Directed</span>
            <input type="checkbox" checked={isDirected} onChange={toggleDirected} className="w-4 h-4 border-2 border-black cursor-pointer" />
          </div>
          <div className="flex items-center justify-between font-bold text-xs uppercase">
            <span>Weighted</span>
            <input type="checkbox" checked={isWeighted} onChange={toggleWeighted} className="w-4 h-4 border-2 border-black cursor-pointer" />
          </div>
          <button
            onClick={() => {
              clearGraph();
              useGraphStore.getState().pushHistory();
            }}
            className="w-full neo-brutal-button bg-white text-sm py-2 flex items-center justify-center gap-1 text-red-500 border-red-500 mt-4"
          >
            <Trash2 size={16} /> Clear Canvas
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
          <Download size={20} /> Import / Export
        </h3>
        <div className="grid grid-cols-2 gap-2">
           <button
             onClick={handleExportJSON}
             className="neo-brutal-button bg-white text-[8px] md:text-[10px] py-2 flex items-center justify-center gap-1"
           >
             <Download size={12} /> Export JSON
           </button>
           <label className="neo-brutal-button bg-white text-[8px] md:text-[10px] py-2 flex items-center justify-center gap-1 cursor-pointer">
             <Upload size={12} /> Import JSON
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
             className="neo-brutal-button bg-white text-[8px] md:text-[10px] py-2 flex items-center justify-center gap-1"
           >
             <ImageIcon size={12} /> Export PNG
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
             className="neo-brutal-button bg-white text-[8px] md:text-[10px] py-2 flex items-center justify-center gap-1"
           >
             <FileCode size={12} /> Export SVG
           </button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
          <Zap size={20} /> Generator
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block font-bold text-xs uppercase mb-1">Node Count: {nodeCount}</label>
            <input
              type="range"
              min={3}
              max={15}
              value={nodeCount}
              onChange={(e) => setNodeCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 border-2 border-black rounded-none appearance-none cursor-pointer"
            />
          </div>
          <div>
            <label className="block font-bold text-xs uppercase mb-1">Edge Density</label>
            <div className="flex gap-2">
               {['sparse', 'medium', 'dense'].map(d => (
                 <button
                   key={d}
                   onClick={() => setDensity(d as any)}
                   className={`flex-1 border-2 border-black py-1 text-[10px] font-black uppercase ${density === d ? 'bg-primary-yellow' : 'bg-white'}`}
                 >
                   {d}
                 </button>
               ))}
            </div>
          </div>
          <button
            onClick={handleGenerate}
            className="w-full neo-brutal-button py-2 flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} /> Generate Graph
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
          <PlayCircle size={20} /> Algorithm
        </h3>
        <div className="space-y-4">
          <select
            value={selectedAlgorithm}
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            className="w-full border-4 border-black p-2 font-black uppercase text-xs outline-none bg-white cursor-pointer"
          >
            <optgroup label="Traversal">
              <option value="bfs">Breadth First Search</option>
              <option value="dfs">Depth First Search</option>
            </optgroup>
            <optgroup label="Shortest Path">
              <option value="dijkstra">Dijkstra's Algorithm</option>
              <option value="bellmanFord">Bellman-Ford</option>
              <option value="astar">A* Search</option>
              <option value="bidirectionalBfs">Bidirectional BFS</option>
            </optgroup>
            <optgroup label="Minimum Spanning Tree">
              <option value="prim">Prim's Algorithm</option>
              <option value="kruskal">Kruskal's Algorithm</option>
            </optgroup>
            <optgroup label="Connectivity & Cycles">
              <option value="topologicalSort">Topological Sort</option>
              <option value="kosaraju">Kosaraju's Algorithm</option>
              <option value="tarjan">Tarjan's Algorithm</option>
              <option value="connectedComponents">Connected Components</option>
              <option value="cycleDetection">Cycle Detection</option>
            </optgroup>
          </select>
          <button
            onClick={handleRunAlgorithm}
            className="w-full neo-brutal-button-blue py-3 flex items-center justify-center gap-2"
          >
            Run Algorithm
          </button>
        </div>
      </section>
    </div>
  );
};
