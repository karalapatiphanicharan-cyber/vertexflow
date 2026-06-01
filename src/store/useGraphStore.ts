import { create } from 'zustand';
import { GraphNode, GraphEdge, AlgorithmStep } from '../types/graph';

interface GraphState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  isDirected: boolean;
  isWeighted: boolean;
  selectedAlgorithm: string;

  // Execution State
  isPlaying: boolean;
  speed: number;
  currentStepIndex: number;
  steps: AlgorithmStep[];

  // History for Undo/Redo
  history: { nodes: GraphNode[]; edges: GraphEdge[] }[];
  historyIndex: number;

  // Manual Editing Mode
  interactionMode: 'pointer' | 'addNode' | 'addEdge';
  startNodeId: string;
  endNodeId: string;
  autoHideMinimap: boolean;
  graphVersion: number;

  // Actions
  setNodes: (nodes: GraphNode[]) => void;
  setEdges: (edges: GraphEdge[]) => void;
  toggleDirected: () => void;
  toggleWeighted: () => void;
  setSelectedAlgorithm: (algo: string) => void;
  setInteractionMode: (mode: 'pointer' | 'addNode' | 'addEdge') => void;
  setStartNodeId: (id: string) => void;
  setEndNodeId: (id: string) => void;
  setAutoHideMinimap: (hide: boolean) => void;

  // Node/Edge Editing
  addNode: (position: { x: number; y: number }) => void;
  deleteNode: (id: string) => void;
  renameNode: (id: string, label: string) => void;
  addEdge: (source: string, target: string) => void;
  deleteEdge: (id: string) => void;
  updateEdgeWeight: (id: string, weight: string) => void;

  // Execution Controls
  setSteps: (steps: AlgorithmStep[]) => void;
  setCurrentStepIndex: (index: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setSpeed: (speed: number) => void;

  resetExecution: () => void;
  clearGraph: () => void;

  // History Actions
  pushHistory: () => void;
  undo: () => void;
  redo: () => void;

  // Step Controls
  nextStep: () => void;
  prevStep: () => void;
}

export const useGraphStore = create<GraphState>((set, get) => ({
  nodes: [],
  edges: [],
  isDirected: false,
  isWeighted: false,
  graphVersion: 0,
  selectedAlgorithm: 'bfs',

  isPlaying: false,
  speed: 1,
  currentStepIndex: 0,
  steps: [],

  history: [],
  historyIndex: -1,

  interactionMode: 'pointer',
  startNodeId: '',
  endNodeId: '',
  autoHideMinimap: true,

  setNodes: (nodes) => {
    const { startNodeId, endNodeId, graphVersion } = get();
    // Validate start/end nodes still exist
    const nodeIds = new Set(nodes.map(n => n.id));
    set({
      nodes,
      startNodeId: nodeIds.has(startNodeId) ? startNodeId : (nodes.length > 0 ? nodes[0].id : ''),
      endNodeId: nodeIds.has(endNodeId) ? endNodeId : (nodes.length > 1 ? nodes[nodes.length - 1].id : (nodes.length > 0 ? nodes[0].id : '')),
      graphVersion: graphVersion + 1
    });
  },
  setEdges: (edges) => set((state) => ({ edges, graphVersion: state.graphVersion + 1 })),
  toggleDirected: () => set((state) => ({ isDirected: !state.isDirected, graphVersion: state.graphVersion + 1 })),
  toggleWeighted: () => set((state) => ({ isWeighted: !state.isWeighted, graphVersion: state.graphVersion + 1 })),
  setSelectedAlgorithm: (selectedAlgorithm) => set({ selectedAlgorithm }),
  setInteractionMode: (interactionMode) => set({ interactionMode }),
  setStartNodeId: (startNodeId) => set({ startNodeId }),
  setEndNodeId: (endNodeId) => set({ endNodeId }),
  setAutoHideMinimap: (autoHideMinimap) => set({ autoHideMinimap }),

  addNode: (position) => {
    const { nodes, graphVersion } = get();
    const id = (nodes.length === 0) ? 'A' : String.fromCharCode(nodes[nodes.length - 1].id.charCodeAt(0) + 1);
    const safeId = nodes.find(n => n.id === id) ? `Node ${nodes.length + 1}` : id;

    const newNode: GraphNode = {
      id: safeId,
      type: 'custom',
      data: { label: safeId, type: 'default' },
      position
    };
    set({ nodes: [...nodes, newNode], graphVersion: graphVersion + 1 });
    get().pushHistory();
  },

  deleteNode: (id) => {
    const { nodes, edges, startNodeId, endNodeId, graphVersion } = get();
    const newNodes = nodes.filter(n => n.id !== id);
    set({
      nodes: newNodes,
      edges: edges.filter(e => e.source !== id && e.target !== id),
      startNodeId: startNodeId === id ? (newNodes.length > 0 ? newNodes[0].id : '') : startNodeId,
      endNodeId: endNodeId === id ? (newNodes.length > 0 ? newNodes[newNodes.length - 1].id : '') : endNodeId,
      graphVersion: graphVersion + 1
    });
    get().pushHistory();
  },

  renameNode: (id, label) => {
    const { nodes, graphVersion } = get();
    set({
      nodes: nodes.map(n => n.id === id ? { ...n, data: { ...n.data, label } } : n),
      graphVersion: graphVersion + 1
    });
    get().pushHistory();
  },

  addEdge: (source, target) => {
    const { edges, isWeighted, graphVersion } = get();
    const id = `e${source}-${target}`;
    if (edges.find(e => e.id === id)) return;

    const newEdge: GraphEdge = {
      id,
      source,
      target,
      label: isWeighted ? '1' : undefined,
      style: { strokeWidth: 2, stroke: '#000' }
    };
    set({ edges: [...edges, newEdge], graphVersion: graphVersion + 1 });
    get().pushHistory();
  },

  deleteEdge: (id) => {
    const { edges, graphVersion } = get();
    set({ edges: edges.filter(e => e.id !== id), graphVersion: graphVersion + 1 });
    get().pushHistory();
  },

  updateEdgeWeight: (id, weight) => {
    const { edges, graphVersion } = get();
    set({
      edges: edges.map(e => e.id === id ? { ...e, label: weight } : e),
      graphVersion: graphVersion + 1
    });
    get().pushHistory();
  },

  setSteps: (steps) => set({ steps, currentStepIndex: 0 }),
  setCurrentStepIndex: (index) => set({ currentStepIndex: index }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),

  resetExecution: () => set({ currentStepIndex: 0, isPlaying: false, steps: [] }),
  clearGraph: () => {
     set((state) => ({
       nodes: [],
       edges: [],
       steps: [],
       currentStepIndex: 0,
       isPlaying: false,
       startNodeId: '',
       endNodeId: '',
       graphVersion: state.graphVersion + 1
     }));
     get().pushHistory();
  },

  pushHistory: () => {
    const { nodes, edges, history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ nodes: [...nodes], edges: [...edges] });
    set({ history: newHistory, historyIndex: newHistory.length - 1 });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const prevState = history[historyIndex - 1];
      set({
        nodes: prevState.nodes,
        edges: prevState.edges,
        historyIndex: historyIndex - 1
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const nextState = history[historyIndex + 1];
      set({
        nodes: nextState.nodes,
        edges: nextState.edges,
        historyIndex: historyIndex + 1
      });
    }
  },

  nextStep: () => {
    const { currentStepIndex, steps } = get();
    if (currentStepIndex < steps.length - 1) {
      set({ currentStepIndex: currentStepIndex + 1 });
    }
  },

  prevStep: () => {
    const { currentStepIndex } = get();
    if (currentStepIndex > 0) {
      set({ currentStepIndex: currentStepIndex - 1 });
    }
  }
}));
