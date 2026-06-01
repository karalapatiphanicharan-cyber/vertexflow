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

  // Graph Metadata
  isDirected: boolean;
  isWeighted: boolean;
  startNodeId: string;
  endNodeId: string;

  // Sync State
  autoSync: boolean;
  lastSyncTime: string | null;
  syncedVersion: number;

  setSideA: (partial: Partial<SideState>) => void;
  setSideB: (partial: Partial<SideState>) => void;

  setAutoSync: (autoSync: boolean) => void;
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

  isDirected: false,
  isWeighted: false,
  startNodeId: '',
  endNodeId: '',

  autoSync: true,
  lastSyncTime: null,
  syncedVersion: -1,

  setSideA: (partial) => set((state) => ({ sideA: { ...state.sideA, ...partial } })),
  setSideB: (partial) => set((state) => ({ sideB: { ...state.sideB, ...partial } })),

  setAutoSync: (autoSync) => set({ autoSync }),

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
    const { nodes, edges, isDirected, isWeighted, startNodeId, endNodeId, graphVersion } = useGraphStore.getState();

    // Deep clone to ensure total isolation between side A and B
    const clone = (data: any) => JSON.parse(JSON.stringify(data));

    set((state) => ({
      isDirected,
      isWeighted,
      startNodeId,
      endNodeId,
      syncedVersion: graphVersion,
      lastSyncTime: new Date().toLocaleTimeString(),
      sideA: {
        ...state.sideA,
        nodes: clone(nodes),
        edges: clone(edges),
        steps: [],
        currentStepIndex: 0,
        isPlaying: false
      },
      sideB: {
        ...state.sideB,
        nodes: clone(nodes),
        edges: clone(edges),
        steps: [],
        currentStepIndex: 0,
        isPlaying: false
      }
    }));
  }
}));
