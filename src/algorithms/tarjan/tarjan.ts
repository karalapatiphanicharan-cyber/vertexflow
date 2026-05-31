import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';

export const runTarjan = (nodes: GraphNode[], edges: GraphEdge[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const disc: Record<string, number> = {};
  const low: Record<string, number> = {};
  const stack: string[] = [];
  const onStack: Record<string, boolean> = {};
  let timer = 0;
  const complexity = { time: 'O(V + E)', space: 'O(V)' };

  nodes.forEach(n => {
    disc[n.id] = -1;
    low[n.id] = -1;
    onStack[n.id] = false;
  });

  const findSCC = (u: string) => {
    disc[u] = low[u] = ++timer;
    stack.push(u);
    onStack[u] = true;

    steps.push({
      nodes: nodes.map(n => ({ ...n, type: onStack[n.id] ? 'highlight' : (disc[n.id] !== -1 ? 'visited' : 'default') })),
      edges: [...edges],
      explanation: `Visiting node ${u}. Discovery: ${disc[u]}, Low-Link: ${low[u]}`,
      visitedNodes: new Set(Object.keys(disc).filter(k => disc[k] !== -1)),
      activeNodes: new Set([u]),
      activeEdges: new Set(),
      stackState: [...stack],
      complexity
    });

    const neighbors = edges.filter(e => e.source === u).map(e => e.target);

    for (const v of neighbors) {
      if (disc[v] === -1) {
        findSCC(v);
        low[u] = Math.min(low[u], low[v]);
        steps.push({
          nodes: [...nodes],
          edges: [...edges],
          explanation: `Backtracking to ${u} from ${v}. Updated Low-Link of ${u} to ${low[u]}`,
          visitedNodes: new Set(Object.keys(disc).filter(k => disc[k] !== -1)),
          activeNodes: new Set([u]),
          activeEdges: new Set(),
          stackState: [...stack],
          complexity
        });
      } else if (onStack[v]) {
        low[u] = Math.min(low[u], disc[v]);
        steps.push({
          nodes: [...nodes],
          edges: [...edges],
          explanation: `Node ${v} is on stack. Updated Low-Link of ${u} to ${low[u]}`,
          visitedNodes: new Set(Object.keys(disc).filter(k => disc[k] !== -1)),
          activeNodes: new Set([u]),
          activeEdges: new Set(),
          stackState: [...stack],
          complexity
        });
      }
    }

    if (low[u] === disc[u]) {
      const component: string[] = [];
      while (true) {
        const node = stack.pop()!;
        onStack[node] = false;
        component.push(node);
        if (node === u) break;
      }
      steps.push({
        nodes: nodes.map(n => ({ ...n, type: component.includes(n.id) ? 'completed' : n.type })),
        edges: [...edges],
        explanation: `Found Strongly Connected Component (SCC): [${component.join(', ')}]`,
        visitedNodes: new Set(Object.keys(disc).filter(k => disc[k] !== -1)),
        activeNodes: new Set(component),
        activeEdges: new Set(),
        stackState: [...stack],
        complexity
      });
    }
  };

  for (const node of nodes) {
    if (disc[node.id] === -1) findSCC(node.id);
  }

  return steps;
};
