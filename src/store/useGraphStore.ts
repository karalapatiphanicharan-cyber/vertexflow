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

  // Actions
  setNodes: (nodes: GraphNode[]) => void;
  setEdges: (edges: GraphEdge[]) => void;
  toggleDirected: () => void;
  toggleWeighted: () => void;
  setSelectedAlgorithm: (algo: string) => void;

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

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  toggleDirected: () => set((state) => ({ isDirected: !state.isDirected })),
  toggleWeighted: () => set((state) => ({ isWeighted: !state.isWeighted })),
  setSelectedAlgorithm: (selectedAlgorithm) => set({ selectedAlgorithm }),

  setSteps: (steps) => set({ steps, currentStepIndex: 0 }),
  setCurrentStepIndex: (index) => set({ currentStepIndex: index }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setSpeed: (speed) => set({ speed }),

  resetExecution: () => set({ currentStepIndex: 0, isPlaying: false, steps: [] }),
  clearGraph: () => set({ nodes: [], edges: [], steps: [], currentStepIndex: 0, isPlaying: false }),

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
