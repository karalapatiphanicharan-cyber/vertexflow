import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runKruskal = (nodes: GraphNode[], edges: GraphEdge[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const parent: Record<string, string> = {};
  const mstEdges: string[] = [];

  const find = (i: string): string => {
    if (parent[i] === i) return i;
    return find(parent[i]);
  };

  const union = (i: string, j: string) => {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      return true;
    }
    return false;
  };

  nodes.forEach(n => parent[n.id] = n.id);

  const sortedEdges = [...edges].sort((a, b) => parseInt(a.label || '0') - parseInt(b.label || '0'));

  steps.push({
    nodes: [...nodes],
    edges: [...edges],
    explanation: "Starting Kruskal's algorithm. Sorting edges by weight.",
    visitedNodes: new Set(),
    activeNodes: new Set(),
    activeEdges: new Set(),
    dsuState: { ...parent }
  });

  for (const edge of sortedEdges) {
    const u = edge.source;
    const v = edge.target;

    const isCycle = find(u) === find(v);

    steps.push({
      nodes: [...nodes],
      edges: edges.map(e => ({ ...e, style: { stroke: e.id === edge.id ? '#3B82F6' : (mstEdges.includes(e.id) ? '#22C55E' : '#000'), strokeWidth: e.id === edge.id || mstEdges.includes(e.id) ? 4 : 2 } })),
      explanation: `Checking edge ${u}-${v} (weight ${edge.label}). ${isCycle ? 'Forms a cycle, skipping.' : 'No cycle, adding to MST.'}`,
      visitedNodes: new Set(),
      activeNodes: new Set([u, v]),
      activeEdges: new Set([edge.id]),
      dsuState: { ...parent }
    });

    if (!isCycle) {
      union(u, v);
      mstEdges.push(edge.id);
    }
  }

  steps.push({
    nodes: [...nodes],
    edges: edges.map(e => ({ ...e, style: { stroke: mstEdges.includes(e.id) ? '#22C55E' : '#E5E7EB', strokeWidth: mstEdges.includes(e.id) ? 4 : 1 } })),
    explanation: "Kruskal's algorithm complete. MST shown in green.",
    visitedNodes: new Set(),
    activeNodes: new Set(),
    activeEdges: new Set(),
    dsuState: { ...parent }
  });

  return steps;
};
