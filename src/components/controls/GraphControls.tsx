import React, { useState } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import {
  Plus,
  Trash2,
  Settings2,
  RefreshCw,
  PlayCircle,
  Download,
  Upload,
  Image as ImageIcon,
  FileCode,
  MousePointer2,
  GitBranchPlus,
  Flag,
  Target,
  AlertCircle
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
    setInteractionMode,
    startNodeId,
    endNodeId,
    setStartNodeId,
    setEndNodeId,
    autoHideMinimap,
    setAutoHideMinimap
  } = useGraphStore();

  const [nodeCount, setNodeCount] = useState(6);
  const [density, setDensity] = useState<'sparse' | 'medium' | 'dense'>('medium');
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = () => {
    const { nodes: newNodes, edges: newEdges } = generateRandomGraph(nodeCount, density, isDirected, isWeighted);
    setNodes(newNodes);
    setEdges(newEdges);
    useGraphStore.getState().pushHistory();
  };

  const handleRunAlgorithm = () => {
    setError(null);
    if (nodes.length === 0) {
      setError('Please add nodes to the graph first.');
      return;
    }

    const needsStart = ['bfs', 'dfs', 'dijkstra', 'bellmanFord', 'astar', 'bidirectionalBfs'].includes(selectedAlgorithm);
    const needsEnd = ['astar', 'bidirectionalBfs'].includes(selectedAlgorithm);

    if (needsStart && !startNodeId) {
      setError('Please select a start node.');
      return;
    }
    if (needsEnd && !endNodeId) {
      setError('Please select an end node.');
      return;
    }

    const res = runAlgorithm(selectedAlgorithm, nodes, edges, isDirected, startNodeId, endNodeId);
    if (res.steps.length === 0) {
      setError('Algorithm produced no steps. Check graph connectivity.');
      return;
    }

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

  const [expandedSections, setExpandedSections] = useState({
    builder: true,
    generator: true,
    runner: true,
    export: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const SectionHeader = ({ title, icon: Icon, section }: { title: string, icon: any, section: keyof typeof expandedSections }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between py-4 border-b-4 border-black hover:bg-gray-50 transition-colors"
    >
      <h3 className="text-lg font-black uppercase flex items-center gap-2 mb-0">
        <Icon size={20} /> {title}
      </h3>
      <Plus size={20} className={`transition-transform duration-300 ${expandedSections[section] ? 'rotate-45' : ''}`} />
    </button>
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-2">
        <section>
          <SectionHeader title="Graph Builder" icon={Settings2} section="builder" />
          {expandedSections.builder && (
            <div className="pt-6 pb-2 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
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
                <div className="flex items-center justify-between font-black text-[10px] uppercase bg-gray-100 p-2 border-2 border-black">
                  <span>Auto-Hide Minimap</span>
                  <input type="checkbox" checked={autoHideMinimap} onChange={(e) => setAutoHideMinimap(e.target.checked)} className="w-4 h-4 border-2 border-black cursor-pointer" />
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
            </div>
          )}
        </section>

        <section>
          <SectionHeader title="Random Generator" icon={RefreshCw} section="generator" />
          {expandedSections.generator && (
            <div className="pt-6 pb-2 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
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
          )}
        </section>

        <section>
          <SectionHeader title="Runner" icon={PlayCircle} section="runner" />
          {expandedSections.runner && (
            <div className="pt-6 pb-2 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-gray-500">Algorithm</label>
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
                    <option value="bidirectionalBfs">Bidirectional BFS</option>
                  </optgroup>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 flex items-center gap-1">
                      <Flag size={10} /> Start Node
                    </label>
                    <select
                      value={startNodeId}
                      onChange={(e) => setStartNodeId(e.target.value)}
                      className="w-full border-2 border-black p-2 font-black uppercase text-[10px] outline-none bg-white cursor-pointer"
                    >
                      <option value="">Select...</option>
                      {nodes.map(n => <option key={n.id} value={n.id}>{n.data.label}</option>)}
                    </select>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-gray-500 flex items-center gap-1">
                      <Target size={10} /> End Node
                    </label>
                    <select
                      value={endNodeId}
                      onChange={(e) => setEndNodeId(e.target.value)}
                      className="w-full border-2 border-black p-2 font-black uppercase text-[10px] outline-none bg-white cursor-pointer"
                      disabled={!['astar', 'bidirectionalBfs'].includes(selectedAlgorithm)}
                    >
                      <option value="">Select...</option>
                      {nodes.map(n => <option key={n.id} value={n.id}>{n.data.label}</option>)}
                    </select>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 border-4 border-black bg-red-100 text-red-600 font-black text-[10px] uppercase shadow-brutal animate-bounce">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <NeoButton
                onClick={handleRunAlgorithm}
                variant="blue"
                className="w-full py-4 text-sm"
              >
                Start Visualization
              </NeoButton>
            </div>
          )}
        </section>

        <section>
          <SectionHeader title="Export / Import" icon={Download} section="export" />
          {expandedSections.export && (
            <div className="pt-6 pb-2 grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
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
          )}
        </section>
      </div>
    </div>
  );
};
