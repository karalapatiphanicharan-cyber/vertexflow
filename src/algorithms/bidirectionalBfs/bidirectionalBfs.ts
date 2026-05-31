import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runBidirectionalBFS = (nodes: GraphNode[], edges: GraphEdge[], startNodeId: string, endNodeId: string, isDirected: boolean): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const qStart: string[] = [startNodeId];
  const qEnd: string[] = [endNodeId];
  const visitedStart = new Map<string, string | null>();
  const visitedEnd = new Map<string, string | null>();
  const complexity = { time: 'O(b^(d/2))', space: 'O(b^(d/2))' };

  visitedStart.set(startNodeId, null);
  visitedEnd.set(endNodeId, null);

  steps.push({
    nodes: nodes.map(n => ({ ...n, type: n.id === startNodeId ? 'start' : (n.id === endNodeId ? 'end' : 'default') })),
    edges: [...edges],
    explanation: `Starting Bidirectional BFS. Start: ${startNodeId}, End: ${endNodeId}`,
    visitedNodes: new Set([startNodeId, endNodeId]),
    activeNodes: new Set([startNodeId, endNodeId]),
    activeEdges: new Set(),
    complexity
  });

  while (qStart.length > 0 && qEnd.length > 0) {
    // Expand from start side
    const currStart = qStart.shift()!;
    const neighborsStart = edges
      .filter(e => isDirected ? e.source === currStart : (e.source === currStart || e.target === currStart))
      .map(e => e.source === currStart ? e.target : e.source);

    for (const v of neighborsStart) {
      if (!visitedStart.has(v)) {
        visitedStart.set(v, currStart);
        qStart.push(v);

        if (visitedEnd.has(v)) {
          steps.push({
             nodes: nodes.map(n => ({ ...n, type: visitedStart.has(n.id) || visitedEnd.has(n.id) ? 'visited' : 'default' })),
             edges: [...edges],
             explanation: `Intersection found at node ${v}! Path completed.`,
             visitedNodes: new Set([...visitedStart.keys(), ...visitedEnd.keys()]),
             activeNodes: new Set([v]),
             activeEdges: new Set(),
             complexity
          });
          return steps;
        }

        steps.push({
          nodes: nodes.map(n => ({ ...n, type: visitedStart.has(n.id) ? 'visited' : (visitedEnd.has(n.id) ? 'highlight' : 'default') })),
          edges: [...edges],
          explanation: `Expanding from start side: reached node ${v}`,
          visitedNodes: new Set([...visitedStart.keys(), ...visitedEnd.keys()]),
          activeNodes: new Set([v]),
          activeEdges: new Set(),
          complexity
        });
      }
    }

    // Expand from end side (Reverse direction if directed)
    const currEnd = qEnd.shift()!;
    const neighborsEnd = edges
      .filter(e => isDirected ? e.target === currEnd : (e.source === currEnd || e.target === currEnd))
      .map(e => e.target === currEnd ? e.source : e.target);

    for (const v of neighborsEnd) {
      if (!visitedEnd.has(v)) {
        visitedEnd.set(v, currEnd);
        qEnd.push(v);

        if (visitedStart.has(v)) {
          steps.push({
             nodes: nodes.map(n => ({ ...n, type: visitedStart.has(n.id) || visitedEnd.has(n.id) ? 'visited' : 'default' })),
             edges: [...edges],
             explanation: `Intersection found at node ${v}! Path completed.`,
             visitedNodes: new Set([...visitedStart.keys(), ...visitedEnd.keys()]),
             activeNodes: new Set([v]),
             activeEdges: new Set(),
             complexity
          });
          return steps;
        }

        steps.push({
          nodes: nodes.map(n => ({ ...n, type: visitedEnd.has(n.id) ? 'highlight' : (visitedStart.has(n.id) ? 'visited' : 'default') })),
          edges: [...edges],
          explanation: `Expanding from end side: reached node ${v}`,
          visitedNodes: new Set([...visitedStart.keys(), ...visitedEnd.keys()]),
          activeNodes: new Set([v]),
          activeEdges: new Set(),
          complexity
        });
      }
    }
  }

  return steps;
};
