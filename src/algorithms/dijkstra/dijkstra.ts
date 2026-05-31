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
      explanation: `Exploring node ${u} with current shortest distance ${d}`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([u]),
      activeEdges: new Set(),
      priorityQueueState: [...pq]
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
          explanation: `Relaxing edge ${u}-${v}, updated distance of ${v} to ${distances[v]}`,
          visitedNodes: new Set(visited),
          activeNodes: new Set([v]),
          activeEdges: new Set([edge.id]),
          priorityQueueState: [...pq]
        });
      }
    }
  }

  return steps;
};
