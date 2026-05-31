import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runBFS = (nodes: GraphNode[], edges: GraphEdge[], startNodeId: string, isDirected: boolean = false): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const queue: string[] = [startNodeId];
  const visited = new Set<string>([startNodeId]);

  // Initial Step
  steps.push({
    nodes: nodes.map(n => ({ ...n, type: n.id === startNodeId ? 'start' : 'default' })),
    edges: [...edges],
    explanation: `Starting BFS from node ${startNodeId}`,
    visitedNodes: new Set(visited),
    activeNodes: new Set([startNodeId]),
    activeEdges: new Set(),
    queueState: [...queue]
  });

  while (queue.length > 0) {
    const currentNodeId = queue.shift()!;

    // Process neighbors
    const neighbors = edges
      .filter(e => e.source === currentNodeId || (!isDirected && e.target === currentNodeId))
      .map(e => e.source === currentNodeId ? e.target : e.source);

    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push(neighborId);

        steps.push({
          nodes: nodes.map(n => ({
            ...n,
            type: visited.has(n.id) ? (queue.includes(n.id) ? 'visited' : 'completed') : 'default'
          })),
          edges: [...edges],
          explanation: `Visiting neighbor ${neighborId} from ${currentNodeId}`,
          visitedNodes: new Set(visited),
          activeNodes: new Set([neighborId]),
          activeEdges: new Set([edges.find(e => (e.source === currentNodeId && e.target === neighborId) || (e.target === currentNodeId && e.source === neighborId))?.id || '']),
          queueState: [...queue]
        });
      }
    }
  }

  return steps;
};
