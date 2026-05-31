import { create } from 'zustand';
import { GraphNode, GraphEdge, AlgorithmStep } from '../types/graph';
import { useGraphStore } from './useGraphStore';

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
    traversalOrder: string[];
    finalPath: string[];
    memoryEstimate: string;
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

  syncFromPlayground: () => void;
}

const initialSideState = (nodes: GraphNode[] = [], edges: GraphEdge[] = [], algo: string = 'bfs'): SideState => ({
  nodes,
  edges,
  algorithm: algo,
  steps: [],
  currentStepIndex: 0,
  isPlaying: false,
  speed: 1,
  metrics: {
    runtime: 0,
    steps: 0,
    nodesVisited: 0,
    traversalOrder: [],
    finalPath: [],
    memoryEstimate: '0 KB'
  }
});

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  sideA: initialSideState([], [], 'bfs'),
  sideB: initialSideState([], [], 'dfs'),

  setSideA: (partial) => set((state) => ({ sideA: { ...state.sideA, ...partial } })),
  setSideB: (partial) => set((state) => ({ sideB: { ...state.sideB, ...partial } })),

  resetComparison: () => set((state) => ({
    sideA: { ...state.sideA, currentStepIndex: 0, isPlaying: false, steps: [] },
    sideB: { ...state.sideB, currentStepIndex: 0, isPlaying: false, steps: [] }
  })),

  startSimultaneous: () => set((state) => ({
    sideA: { ...state.sideA, isPlaying: true, currentStepIndex: 0 },
    sideB: { ...state.sideB, isPlaying: true, currentStepIndex: 0 }
  })),

  stopSimultaneous: () => set((state) => ({
    sideA: { ...state.sideA, isPlaying: false },
    sideB: { ...state.sideB, isPlaying: false }
  })),

  syncFromPlayground: () => {
    const { nodes, edges } = useGraphStore.getState();
    const cleanNodes = JSON.parse(JSON.stringify(nodes));
    const cleanEdges = JSON.parse(JSON.stringify(edges));
    set((state) => ({
      sideA: { ...state.sideA, nodes: cleanNodes, edges: cleanEdges, steps: [], currentStepIndex: 0 },
      sideB: { ...state.sideB, nodes: JSON.parse(JSON.stringify(cleanNodes)), edges: JSON.parse(JSON.stringify(cleanEdges)), steps: [], currentStepIndex: 0 }
    }));
  }
}));
