import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runAStar = (nodes: GraphNode[], edges: GraphEdge[], startNodeId: string, endNodeId: string, isDirected: boolean): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const gScore: Record<string, number> = {};
  const fScore: Record<string, number> = {};
  const pq: { id: string; f: number }[] = [];
  const visited = new Set<string>();
  const complexity = { time: 'O(E log V)', space: 'O(V)' };

  // Heuristic function (Euclidean distance based on node positions)
  const h = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    const target = nodes.find(n => n.id === endNodeId);
    if (!node || !target) return 0;
    return Math.sqrt(Math.pow(node.position.x - target.position.x, 2) + Math.pow(node.position.y - target.position.y, 2)) / 50;
  };

  nodes.forEach(n => {
    gScore[n.id] = Infinity;
    fScore[n.id] = Infinity;
  });

  gScore[startNodeId] = 0;
  fScore[startNodeId] = h(startNodeId);
  pq.push({ id: startNodeId, f: fScore[startNodeId] });

  while (pq.length > 0) {
    pq.sort((a, b) => a.f - b.f);
    const { id: current } = pq.shift()!;

    if (current === endNodeId) {
      steps.push({
        nodes: nodes.map(n => ({ ...n, type: n.id === endNodeId ? 'end' : (visited.has(n.id) ? 'completed' : 'default') })),
        edges: [...edges],
        explanation: "Goal reached! A* search finished.",
        visitedNodes: new Set(visited),
        activeNodes: new Set([current]),
        activeEdges: new Set(),
        complexity
      });
      return steps;
    }

    visited.add(current);

    steps.push({
      nodes: nodes.map(n => ({ ...n, type: n.id === current ? 'highlight' : (visited.has(n.id) ? 'completed' : 'default') })),
      edges: [...edges],
      explanation: `Exploring node ${current}. gScore: ${gScore[current].toFixed(1)}, hScore: ${h(current).toFixed(1)}`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([current]),
      activeEdges: new Set(),
      priorityQueueState: [...pq],
      complexity
    });

    const neighbors = edges
      .filter(e => isDirected ? e.source === current : (e.source === current || e.target === current))
      .map(e => e.source === current ? { id: e.target, edgeId: e.id, weight: parseInt(e.label || '1') } : { id: e.source, edgeId: e.id, weight: parseInt(e.label || '1') });

    for (const neighbor of neighbors) {
      if (visited.has(neighbor.id)) continue;

      const tentativeGScore = gScore[current] + neighbor.weight;

      if (tentativeGScore < gScore[neighbor.id]) {
        gScore[neighbor.id] = tentativeGScore;
        fScore[neighbor.id] = gScore[neighbor.id] + h(neighbor.id);

        if (!pq.find(p => p.id === neighbor.id)) {
          pq.push({ id: neighbor.id, f: fScore[neighbor.id] });
        }

        steps.push({
          nodes: [...nodes],
          edges: edges.map(e => ({ ...e, animated: e.id === neighbor.edgeId })),
          explanation: `Updating neighbor ${neighbor.id}. New fScore: ${fScore[neighbor.id].toFixed(1)}`,
          visitedNodes: new Set(visited),
          activeNodes: new Set([neighbor.id]),
          activeEdges: new Set([neighbor.edgeId]),
          priorityQueueState: [...pq],
          complexity
        });
      }
    }
  }

  return steps;
};
