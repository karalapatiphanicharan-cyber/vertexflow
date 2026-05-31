import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runKosaraju = (nodes: GraphNode[], edges: GraphEdge[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const visited = new Set<string>();
  const stack: string[] = [];
  const complexity = { time: 'O(V + E)', space: 'O(V)' };

  // Step 1: Fill stack with finishing order
  const fillOrder = (u: string) => {
    visited.add(u);
    steps.push({
      nodes: nodes.map(n => ({ ...n, type: visited.has(n.id) ? 'visited' : 'default' })),
      edges: [...edges],
      explanation: `Step 1 (DFS): Visiting node ${u}`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([u]),
      activeEdges: new Set(),
      stackState: [...stack],
      complexity
    });

    const neighbors = edges.filter(e => e.source === u).map(e => e.target);
    for (const v of neighbors) {
      if (!visited.has(v)) fillOrder(v);
    }
    stack.push(u);
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) fillOrder(node.id);
  }

  // Step 2: Reverse the graph
  const reversedEdges: GraphEdge[] = edges.map(e => ({ ...e, source: e.target, target: e.source }));
  steps.push({
    nodes: [...nodes],
    edges: reversedEdges,
    explanation: "Step 2: Reversing all edges in the graph.",
    visitedNodes: new Set(visited),
    activeNodes: new Set(),
    activeEdges: new Set(),
    stackState: [...stack],
    complexity
  });

  // Step 3: Process nodes in stack order on reversed graph
  visited.clear();
  const sccs: string[][] = [];

  const dfsReversed = (u: string, currentSCC: string[]) => {
    visited.add(u);
    currentSCC.push(u);
    steps.push({
      nodes: nodes.map(n => ({ ...n, type: visited.has(n.id) ? 'highlight' : 'default' })),
      edges: reversedEdges,
      explanation: `Step 3 (DFS on Reversed): Visiting node ${u}`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([u]),
      activeEdges: new Set(),
      stackState: [...stack],
      complexity
    });

    const neighbors = reversedEdges.filter(e => e.source === u).map(e => e.target);
    for (const v of neighbors) {
      if (!visited.has(v)) dfsReversed(v, currentSCC);
    }
  };

  while (stack.length > 0) {
    const u = stack.pop()!;
    if (!visited.has(u)) {
      const currentSCC: string[] = [];
      dfsReversed(u, currentSCC);
      sccs.push(currentSCC);
      steps.push({
        nodes: nodes.map(n => ({ ...n, type: visited.has(n.id) ? 'completed' : 'default' })),
        edges: reversedEdges,
        explanation: `Found SCC: [${currentSCC.join(', ')}]`,
        visitedNodes: new Set(visited),
        activeNodes: new Set(currentSCC),
        activeEdges: new Set(),
        stackState: [...stack],
        complexity
      });
    }
  }

  return steps;
};
