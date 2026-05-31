import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runDSU = (nodes: GraphNode[], edges: GraphEdge[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const parent: Record<string, string> = {};
  const complexity = { time: 'O(E α(V))', space: 'O(V)' };

  nodes.forEach(n => parent[n.id] = n.id);

  steps.push({
    nodes: [...nodes],
    edges: [...edges],
    explanation: "Initializing DSU: each node is its own parent.",
    visitedNodes: new Set(),
    activeNodes: new Set(),
    activeEdges: new Set(),
    dsuState: { ...parent },
    complexity
  });

  const find = (i: string): string => {
    if (parent[i] === i) return i;
    return find(parent[i]); // We can add path compression here too
  };

  const union = (i: string, j: string, edgeId: string) => {
    const rootI = find(i);
    const rootJ = find(j);
    if (rootI !== rootJ) {
      parent[rootI] = rootJ;
      steps.push({
        nodes: [...nodes],
        edges: [...edges],
        explanation: `Uniting sets of ${i} and ${j}. Node ${rootI}'s parent is now ${rootJ}.`,
        visitedNodes: new Set(),
        activeNodes: new Set([rootI, rootJ]),
        activeEdges: new Set([edgeId]),
        dsuState: { ...parent },
        complexity
      });
    } else {
       steps.push({
        nodes: [...nodes],
        edges: [...edges],
        explanation: `Nodes ${i} and ${j} are already in the same set (root: ${rootI}). Cycle detected if undirected!`,
        visitedNodes: new Set(),
        activeNodes: new Set([rootI]),
        activeEdges: new Set([edgeId]),
        dsuState: { ...parent },
        complexity
      });
    }
  };

  for (const edge of edges) {
    union(edge.source, edge.target, edge.id);
  }

  return steps;
};
