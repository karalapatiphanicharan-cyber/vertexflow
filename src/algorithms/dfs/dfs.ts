import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runDFS = (nodes: GraphNode[], edges: GraphEdge[], startNodeId: string, isDirected: boolean = false): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const stack: string[] = [startNodeId];
  const visited = new Set<string>();

  const traverse = (nodeId: string) => {
    visited.add(nodeId);
    steps.push({
      nodes: nodes.map(n => ({ ...n, type: visited.has(n.id) ? 'visited' : 'default' })),
      edges: [...edges],
      explanation: `Visiting node ${nodeId}`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([nodeId]),
      activeEdges: new Set(),
      stackState: [...stack]
    });

    const neighbors = edges
      .filter(e => e.source === nodeId || (!isDirected && e.target === nodeId))
      .map(e => e.source === nodeId ? e.target : e.source);

    for (const neighborId of neighbors) {
      if (!visited.has(neighborId)) {
        stack.push(neighborId);
        traverse(neighborId);
        stack.pop();
      }
    }

    steps.push({
      nodes: nodes.map(n => ({ ...n, type: visited.has(n.id) ? 'completed' : 'default' })),
      edges: [...edges],
      explanation: `Finished processing node ${nodeId}`,
      visitedNodes: new Set(visited),
      activeNodes: new Set([nodeId]),
      activeEdges: new Set(),
      stackState: [...stack]
    });
  };

  traverse(startNodeId);
  return steps;
};
