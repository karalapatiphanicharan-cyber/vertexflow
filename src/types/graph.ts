export type NodeType = 'default' | 'start' | 'end' | 'visited' | 'highlight' | 'completed' | 'custom';

export interface GraphNode {
  id: string;
  type: NodeType;
  data: { label: string; type?: NodeType };
  position: { x: number; y: number };
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  style?: React.CSSProperties;
}

export interface AlgorithmStep {
  nodes: GraphNode[];
  edges: GraphEdge[];
  explanation: string;
  visitedNodes: Set<string>;
  activeNodes: Set<string>;
  activeEdges: Set<string>;
  queueState?: any[];
  stackState?: any[];
  dsuState?: any;
  priorityQueueState?: any[];
  distances?: Record<string, number | string>;
  complexity?: {
    time: string;
    space: string;
  };
}
