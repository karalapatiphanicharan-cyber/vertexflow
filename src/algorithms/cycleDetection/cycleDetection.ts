import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runCycleDetection = (nodes: GraphNode[], edges: GraphEdge[], isDirected: boolean): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const visited = new Set<string>();
  const recStack = new Set<string>(); // for directed
  const complexity = { time: 'O(V + E)', space: 'O(V)' };

  const hasCycleDirected = (u: string): boolean => {
    visited.add(u);
    recStack.add(u);

    steps.push({
      nodes: nodes.map(n => ({ ...n, type: recStack.has(n.id) ? 'highlight' : (visited.has(n.id) ? 'visited' : 'default') })),
      edges: [...edges],
      explanation: `Visiting node ${u}. Current recursion stack: [${Array.from(recStack).join(', ')}]`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([u]),
      activeEdges: new Set(),
      complexity
    });

    const neighbors = edges.filter(e => e.source === u).map(e => ({ target: e.target, edgeId: e.id }));
    for (const { target: v, edgeId } of neighbors) {
      if (!visited.has(v)) {
        if (hasCycleDirected(v)) return true;
      } else if (recStack.has(v)) {
        steps.push({
          nodes: [...nodes],
          edges: edges.map(e => ({ ...e, style: e.id === edgeId ? { stroke: '#F43F5E', strokeWidth: 4 } : e.style })),
          explanation: `Cycle detected! Node ${v} is already in the current recursion stack.`,
          visitedNodes: new Set(visited),
          activeNodes: new Set([v]),
          activeEdges: new Set([edgeId]),
          complexity
        });
        return true;
      }
    }

    recStack.delete(u);
    return false;
  };

  const hasCycleUndirected = (u: string, parent: string | null): boolean => {
    visited.add(u);
    steps.push({
      nodes: nodes.map(n => ({ ...n, type: visited.has(n.id) ? 'visited' : 'default' })),
      edges: [...edges],
      explanation: `Visiting node ${u}. Parent: ${parent || 'None'}`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([u]),
      activeEdges: new Set(),
      complexity
    });

    const neighbors = edges
      .filter(e => e.source === u || e.target === u)
      .map(e => ({ target: e.source === u ? e.target : e.source, edgeId: e.id }));

    for (const { target: v, edgeId } of neighbors) {
      if (!visited.has(v)) {
        if (hasCycleUndirected(v, u)) return true;
      } else if (v !== parent) {
        steps.push({
          nodes: [...nodes],
          edges: edges.map(e => ({ ...e, style: e.id === edgeId ? { stroke: '#F43F5E', strokeWidth: 4 } : e.style })),
          explanation: `Cycle detected! Node ${v} was already visited and is not the parent of ${u}.`,
          visitedNodes: new Set(visited),
          activeNodes: new Set([v]),
          activeEdges: new Set([edgeId]),
          complexity
        });
        return true;
      }
    }
    return false;
  };

  let cycleFound = false;
  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (isDirected) {
        if (hasCycleDirected(node.id)) { cycleFound = true; break; }
      } else {
        if (hasCycleUndirected(node.id, null)) { cycleFound = true; break; }
      }
    }
  }

  if (!cycleFound) {
    steps.push({
      nodes: [...nodes],
      edges: [...edges],
      explanation: "No cycle detected in the graph.",
      visitedNodes: new Set(visited),
      activeNodes: new Set(),
      activeEdges: new Set(),
      complexity
    });
  }

  return steps;
};
