import { create } from 'zustand';
import { GraphNode, GraphEdge, AlgorithmStep } from '../types/graph';

interface SideState {
  nodes: GraphNode[];
  edges: GraphEdge[];
  algorithm: string;
  steps: AlgorithmStep[];
  currentStepIndex: number;
  isPlaying: boolean;
  speed: number;
  metrics: {
    runtime: number;
    steps: number;
    nodesVisited: number;
    edgesTraversed: number;
  };
}

interface ComparisonState {
  sideA: SideState;
  sideB: SideState;

  setSideA: (partial: Partial<SideState>) => void;
  setSideB: (partial: Partial<SideState>) => void;

  resetComparison: () => void;
  startSimultaneous: () => void;
  stopSimultaneous: () => void;

  syncGraphs: () => void; // Copy graph A to B
}

const initialSideState = (nodes: GraphNode[] = [], edges: GraphEdge[] = []): SideState => ({
  nodes,
  edges,
  algorithm: 'bfs',
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  speed: 1,
  metrics: {
    runtime: 0,
    steps: 0,
    nodesVisited: 0,
    edgesTraversed: 0
  }
});

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  sideA: initialSideState(),
  sideB: initialSideState(),

  setSideA: (partial) => set((state) => ({ sideA: { ...state.sideA, ...partial } })),
  setSideB: (partial) => set((state) => ({ sideB: { ...state.sideB, ...partial } })),

  resetComparison: () => set({
    sideA: { ...get().sideA, currentStepIndex: 0, isPlaying: false, steps: [] },
    sideB: { ...get().sideB, currentStepIndex: 0, isPlaying: false, steps: [] }
  }),

  startSimultaneous: () => set((state) => ({
    sideA: { ...state.sideA, isPlaying: true },
    sideB: { ...state.sideB, isPlaying: true }
  })),

  stopSimultaneous: () => set((state) => ({
    sideA: { ...state.sideA, isPlaying: false },
    sideB: { ...state.sideB, isPlaying: false }
  })),

  syncGraphs: () => {
    const { sideA } = get();
    set((state) => ({
      sideB: {
        ...state.sideB,
        nodes: JSON.parse(JSON.stringify(sideA.nodes)),
        edges: JSON.parse(JSON.stringify(sideA.edges))
      }
    }));
  }
}));
