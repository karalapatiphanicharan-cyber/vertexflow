import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runFloydWarshall = (nodes: GraphNode[], edges: GraphEdge[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const dist: Record<string, Record<string, number>> = {};
  const complexity = { time: 'O(V^3)', space: 'O(V^2)' };

  // Initialization
  nodes.forEach(u => {
    dist[u.id] = {};
    nodes.forEach(v => {
      dist[u.id][v.id] = u.id === v.id ? 0 : Infinity;
    });
  });

  edges.forEach(edge => {
    const weight = parseInt(edge.label || '1');
    dist[edge.source][edge.target] = Math.min(dist[edge.source][edge.target], weight);
    // If undirected, we should have handled it in edges list already or handle it here
  });

  steps.push({
    nodes: [...nodes],
    edges: [...edges],
    explanation: "Initializing distance matrix with edge weights and 0 for self-loops.",
    visitedNodes: new Set(),
    activeNodes: new Set(),
    activeEdges: new Set(),
    complexity
  });

  for (const k of nodes) {
    for (const i of nodes) {
      for (const j of nodes) {
        if (dist[i.id][k.id] !== Infinity && dist[k.id][j.id] !== Infinity) {
          if (dist[i.id][k.id] + dist[k.id][j.id] < dist[i.id][j.id]) {
            dist[i.id][j.id] = dist[i.id][k.id] + dist[k.id][j.id];

            steps.push({
              nodes: [...nodes],
              edges: [...edges],
              explanation: `Found shorter path from ${i.id} to ${j.id} through ${k.id}. New distance: ${dist[i.id][j.id]}`,
              visitedNodes: new Set([k.id]),
              activeNodes: new Set([i.id, j.id]),
              activeEdges: new Set(),
              complexity
            });
          }
        }
      }
    }
  }

  return steps;
};
