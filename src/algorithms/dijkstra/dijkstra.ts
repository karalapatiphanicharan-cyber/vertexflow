import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runDijkstra = (nodes: GraphNode[], edges: GraphEdge[], startNodeId: string, isDirected: boolean = false): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const distances: Record<string, number> = {};
  const pq: { id: string; dist: number }[] = [];
  const visited = new Set<string>();

  nodes.forEach(n => distances[n.id] = Infinity);
  distances[startNodeId] = 0;
  pq.push({ id: startNodeId, dist: 0 });

  while (pq.length > 0) {
    pq.sort((a, b) => a.dist - b.dist);
    const { id: u, dist: d } = pq.shift()!;

    if (visited.has(u)) continue;
    visited.add(u);

    steps.push({
      nodes: nodes.map(n => ({
        ...n,
        type: u === n.id ? 'highlight' : (visited.has(n.id) ? 'completed' : 'default'),
        data: { ...n.data, label: `${n.data.label} [${distances[n.id] === Infinity ? '∞' : distances[n.id]}]` }
      })),
      edges: [...edges],
      explanation: `Selected node ${nodes.find(n => n.id === u)?.data.label || u} from Priority Queue with distance ${d}. It's now part of the shortest path tree.`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([u]),
      activeEdges: new Set(),
      priorityQueueState: pq.map(item => `${nodes.find(n => n.id === item.id)?.data.label || item.id}:${item.dist}`)
    });

    const outgoingEdges = edges.filter(e => e.source === u || (!isDirected && e.target === u));
    for (const edge of outgoingEdges) {
      const v = edge.source === u ? edge.target : edge.source;
      const weight = parseInt(edge.label || '1');

      if (distances[u] + weight < distances[v]) {
        distances[v] = distances[u] + weight;
        pq.push({ id: v, dist: distances[v] });

        steps.push({
          nodes: nodes.map(n => ({
            ...n,
            data: { ...n.data, label: `${n.data.label} [${distances[n.id] === Infinity ? '∞' : distances[n.id]}]` }
          })),
          edges: edges.map(e => ({ ...e, animated: e.id === edge.id })),
          explanation: `Found a shorter path to ${nodes.find(n => n.id === v)?.data.label || v} via ${nodes.find(n => n.id === u)?.data.label || u}. New distance: ${distances[v]}.`,
          visitedNodes: new Set(visited),
          activeNodes: new Set([v]),
          activeEdges: new Set([edge.id]),
          priorityQueueState: pq.map(item => `${nodes.find(n => n.id === item.id)?.data.label || item.id}:${item.dist}`)
        });
      }
    }
  }

  return steps;
};
