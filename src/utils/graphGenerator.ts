import { GraphNode, GraphEdge } from '../types/graph';

export const generateRandomGraph = (
  nodeCount: number,
  density: 'sparse' | 'medium' | 'dense',
  directed: boolean,
  weighted: boolean
) => {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];
  const radius = 250;

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * 2 * Math.PI;
    nodes.push({
      id: String.fromCharCode(65 + i),
      type: 'custom',
      data: { label: String.fromCharCode(65 + i), type: 'default' },
      position: {
        x: 400 + radius * Math.cos(angle),
        y: 300 + radius * Math.sin(angle)
      }
    });
  }

  const p = density === 'sparse' ? 0.2 : (density === 'medium' ? 0.4 : 0.7);

  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (Math.random() < p) {
        const u = nodes[i].id;
        const v = nodes[j].id;
        const weight = weighted ? Math.floor(Math.random() * 10) + 1 : 1;

        edges.push({
          id: `e-${u}-${v}`,
          source: u,
          target: v,
          label: weighted ? String(weight) : undefined,
          style: { stroke: '#000', strokeWidth: 2 }
        });
      }
    }
  }

  return { nodes, edges };
};
