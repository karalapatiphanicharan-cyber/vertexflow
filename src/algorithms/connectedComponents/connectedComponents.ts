import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runConnectedComponents = (nodes: GraphNode[], edges: GraphEdge[], isDirected: boolean): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const visited = new Set<string>();
  let componentCount = 0;
  const complexity = { time: 'O(V + E)', space: 'O(V)' };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      componentCount++;
      const stack: string[] = [node.id];
      visited.add(node.id);

      steps.push({
        nodes: nodes.map(n => ({ ...n, type: visited.has(n.id) ? 'visited' : 'default' })),
        edges: [...edges],
        explanation: `Starting new component search from node ${node.id} (Component #${componentCount})`,
        visitedNodes: new Set(visited),
        activeNodes: new Set([node.id]),
        activeEdges: new Set(),
        complexity
      });

      while (stack.length > 0) {
        const u = stack.pop()!;

        const neighbors = edges
          .filter(e => isDirected ? e.source === u : (e.source === u || e.target === u))
          .map(e => e.source === u ? e.target : e.source);

        for (const v of neighbors) {
          if (!visited.has(v)) {
            visited.add(v);
            stack.push(v);

            steps.push({
              nodes: nodes.map(n => ({ ...n, type: visited.has(n.id) ? 'visited' : 'default' })),
              edges: [...edges],
              explanation: `Found node ${v} in the same component as ${u}`,
              visitedNodes: new Set(visited),
              activeNodes: new Set([v]),
              activeEdges: new Set(),
              complexity
            });
          }
        }
      }
    }
  }

  steps.push({
    nodes: [...nodes],
    edges: [...edges],
    explanation: `Search finished. Total components found: ${componentCount}`,
    visitedNodes: new Set(visited),
    activeNodes: new Set(),
    activeEdges: new Set(),
    complexity
  });

  return steps;
};
