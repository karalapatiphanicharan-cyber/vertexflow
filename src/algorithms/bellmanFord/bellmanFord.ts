import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runBellmanFord = (nodes: GraphNode[], edges: GraphEdge[], startNodeId: string, isDirected: boolean): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const distances: Record<string, number> = {};

  nodes.forEach(n => distances[n.id] = Infinity);
  distances[startNodeId] = 0;

  const complexity = { time: 'O(V * E)', space: 'O(V)' };

  steps.push({
    nodes: nodes.map(n => ({ ...n, type: n.id === startNodeId ? 'start' : 'default' })),
    edges: [...edges],
    explanation: `Starting Bellman-Ford from node ${startNodeId}. Initializing distances to infinity.`,
    visitedNodes: new Set(),
    activeNodes: new Set([startNodeId]),
    activeEdges: new Set(),
    distances: { ...distances },
    complexity
  });

  for (let i = 0; i < nodes.length - 1; i++) {
    let changed = false;
    for (const edge of edges) {
      const pairs = isDirected ? [[edge.source, edge.target]] : [[edge.source, edge.target], [edge.target, edge.source]];

      for (const [u, v] of pairs) {
        const weight = parseInt(edge.label || '1');

        if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
          distances[v] = distances[u] + weight;
          changed = true;
          steps.push({
            nodes: [...nodes],
            edges: [...edges],
            explanation: `Relaxing edge ${u} -> ${v}. New distance of ${v} is ${distances[v]}.`,
            visitedNodes: new Set(),
            activeNodes: new Set([v]),
            activeEdges: new Set([edge.id]),
            distances: { ...distances },
            complexity
          });
        }
      }
    }
    if (!changed) break;
  }

  // Check for negative cycles
  for (const edge of edges) {
    const pairs = isDirected ? [[edge.source, edge.target]] : [[edge.source, edge.target], [edge.target, edge.source]];
    for (const [u, v] of pairs) {
      const weight = parseInt(edge.label || '1');
      if (distances[u] !== Infinity && distances[u] + weight < distances[v]) {
        steps.push({
          nodes: [...nodes],
          edges: [...edges],
          explanation: "Negative cycle detected! Graph contains a cycle with negative total weight.",
          visitedNodes: new Set(),
          activeNodes: new Set(),
          activeEdges: new Set([edge.id]),
          distances: { ...distances },
          complexity
        });
        return steps;
      }
    }
  }

  return steps;
};
