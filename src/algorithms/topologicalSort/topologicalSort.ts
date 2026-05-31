import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runTopologicalSort = (nodes: GraphNode[], edges: GraphEdge[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const visited = new Set<string>();
  const stack: string[] = [];
  const inProcess = new Set<string>();

  const traverse = (nodeId: string): boolean => {
    if (inProcess.has(nodeId)) return false; // Cycle detected
    if (visited.has(nodeId)) return true;

    inProcess.add(nodeId);

    steps.push({
      nodes: nodes.map(n => ({ ...n, type: inProcess.has(n.id) ? 'visited' : (visited.has(n.id) ? 'completed' : 'default') })),
      edges: [...edges],
      explanation: `DFS visiting node ${nodeId} for topological sort`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([nodeId]),
      activeEdges: new Set(),
      stackState: [...stack]
    });

    const neighbors = edges.filter(e => e.source === nodeId).map(e => e.target);
    for (const neighborId of neighbors) {
      if (!traverse(neighborId)) return false;
    }

    inProcess.delete(nodeId);
    visited.add(nodeId);
    stack.unshift(nodeId);

    steps.push({
      nodes: nodes.map(n => ({ ...n, type: visited.has(n.id) ? 'completed' : 'default' })),
      edges: [...edges],
      explanation: `Finished processing node ${nodeId}, adding to sorted list`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([nodeId]),
      activeEdges: new Set(),
      stackState: [...stack]
    });

    return true;
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (!traverse(node.id)) {
        steps.push({
          nodes: [...nodes],
          edges: [...edges],
          explanation: "Cycle detected! Topological sort not possible for this graph.",
          visitedNodes: new Set(),
          activeNodes: new Set(),
          activeEdges: new Set()
        });
        return steps;
      }
    }
  }

  return steps;
};
