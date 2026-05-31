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

  // Actions
  setNodes: (nodes: GraphNode[]) => void;
  setEdges: (edges: GraphEdge[]) => void;
  toggleDirected: () => void;
  toggleWeighted: () => void;
  setSelectedAlgorithm: (algo: string) => void;
  setInteractionMode: (mode: 'pointer' | 'addNode' | 'addEdge') => void;

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
  selectedAlgorithm: 'bfs',

  isPlaying: false,
  speed: 1,
  currentStepIndex: 0,
  steps: [],

  history: [],
  historyIndex: -1,

  interactionMode: 'pointer',

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  toggleDirected: () => set((state) => ({ isDirected: !state.isDirected })),
  toggleWeighted: () => set((state) => ({ isWeighted: !state.isWeighted })),
  setSelectedAlgorithm: (selectedAlgorithm) => set({ selectedAlgorithm }),
  setInteractionMode: (interactionMode) => set({ interactionMode }),

  addNode: (position) => {
    const { nodes } = get();
    const id = (nodes.length === 0) ? 'A' : String.fromCharCode(nodes[nodes.length - 1].id.charCodeAt(0) + 1);
    const safeId = nodes.find(n => n.id === id) ? `Node ${nodes.length + 1}` : id;

    const newNode: GraphNode = {
      id: safeId,
      type: 'custom',
      data: { label: safeId, type: 'default' },
      position
    };
    set({ nodes: [...nodes, newNode] });
    get().pushHistory();
  },

  deleteNode: (id) => {
    const { nodes, edges } = get();
    set({
      nodes: nodes.filter(n => n.id !== id),
      edges: edges.filter(e => e.source !== id && e.target !== id)
    });
    get().pushHistory();
  },

  renameNode: (id, label) => {
    const { nodes } = get();
    set({
      nodes: nodes.map(n => n.id === id ? { ...n, data: { ...n.data, label } } : n)
    });
    get().pushHistory();
  },

  addEdge: (source, target) => {
    const { edges, isWeighted } = get();
    const id = `e${source}-${target}`;
    if (edges.find(e => e.id === id)) return;

    const newEdge: GraphEdge = {
      id,
      source,
      target,
      label: isWeighted ? '1' : undefined,
      style: { strokeWidth: 2, stroke: '#000' }
    };
    set({ edges: [...edges, newEdge] });
    get().pushHistory();
  },

  deleteEdge: (id) => {
    const { edges } = get();
    set({ edges: edges.filter(e => e.id !== id) });
    get().pushHistory();
  },

  updateEdgeWeight: (id, weight) => {
    const { edges } = get();
    set({
      edges: edges.map(e => e.id === id ? { ...e, label: weight } : e)
    });
    get().pushHistory();
  },

  setSteps: (steps) => set({ steps, currentStepIndex: 0 }),
  setCurrentStepIndex: (index) => set({ currentStepIndex: index }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),

  resetExecution: () => set({ currentStepIndex: 0, isPlaying: false, steps: [] }),
  clearGraph: () => {
     set({ nodes: [], edges: [], steps: [], currentStepIndex: 0, isPlaying: false });
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
