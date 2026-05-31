import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runPrim = (nodes: GraphNode[], edges: GraphEdge[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  if (nodes.length === 0) return steps;

  const visited = new Set<string>();
  const mstEdges = new Set<string>();
  const startNodeId = nodes[0].id;
  const complexity = { time: 'O(E log V)', space: 'O(V)' };

  visited.add(startNodeId);

  steps.push({
    nodes: nodes.map(n => ({ ...n, type: n.id === startNodeId ? 'visited' : 'default' })),
    edges: [...edges],
    explanation: `Starting Prim's algorithm from node ${startNodeId}.`,
    visitedNodes: new Set(visited),
    activeNodes: new Set([startNodeId]),
    activeEdges: new Set(),
    complexity
  });

  while (visited.size < nodes.length) {
    let minEdge: GraphEdge | null = null;
    let minWeight = Infinity;

    // Find the minimum weight edge connecting visited to unvisited nodes
    for (const edge of edges) {
      const u = edge.source;
      const v = edge.target;
      const weight = parseInt(edge.label || '1');

      const uVisited = visited.has(u);
      const vVisited = visited.has(v);

      if ((uVisited && !vVisited) || (!uVisited && vVisited)) {
        if (weight < minWeight) {
          minWeight = weight;
          minEdge = edge;
        }
      }
    }

    if (!minEdge) break;

    const nextNodeId = visited.has(minEdge.source) ? minEdge.target : minEdge.source;
    visited.add(nextNodeId);
    mstEdges.add(minEdge.id);

    steps.push({
      nodes: nodes.map(n => ({ ...n, type: visited.has(n.id) ? 'completed' : 'default' })),
      edges: edges.map(e => ({
        ...e,
        style: mstEdges.has(e.id) ? { stroke: '#3B82F6', strokeWidth: 4 } : e.style,
        animated: e.id === minEdge?.id
      })),
      explanation: `Selected edge ${minEdge.source}-${minEdge.target} with weight ${minWeight}. Adding node ${nextNodeId} to MST.`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([nextNodeId]),
      activeEdges: new Set([minEdge.id]),
      complexity
    });
  }

  steps.push({
    nodes: nodes.map(n => ({ ...n, type: 'completed' })),
    edges: edges.map(e => ({
      ...e,
      style: mstEdges.has(e.id) ? { stroke: '#3B82F6', strokeWidth: 4 } : { ...e.style, opacity: 0.3 }
    })),
    explanation: "MST construction complete using Prim's algorithm.",
    visitedNodes: new Set(visited),
    activeNodes: new Set(),
    activeEdges: new Set(),
    complexity
  });

  return steps;
};
