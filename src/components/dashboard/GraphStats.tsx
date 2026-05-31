import React, { useMemo } from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { BarChart2 } from 'lucide-react';

export const GraphStats: React.FC = () => {
  const { nodes, edges, isDirected, isWeighted } = useGraphStore();

  const stats = useMemo(() => {
    const n = nodes.length;
    const e = edges.length;
    const density = n > 1 ? (isDirected ? e / (n * (n - 1)) : (2 * e) / (n * (n - 1))) : 0;

    // Simple degree calculation
    const totalDegree = edges.length * 2;
    const avgDegree = n > 0 ? totalDegree / n : 0;

    return {
      nodes: n,
      edges: e,
      density: density.toFixed(2),
      avgDegree: avgDegree.toFixed(2),
      type: `${isDirected ? 'Directed' : 'Undirected'}, ${isWeighted ? 'Weighted' : 'Unweighted'}`
    };
  }, [nodes, edges, isDirected, isWeighted]);

  return (
    <section>
      <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-2">
        <BarChart2 size={20} /> Graph Statistics
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <StatCard label="Nodes" value={stats.nodes} />
        <StatCard label="Edges" value={stats.edges} />
        <StatCard label="Density" value={stats.density} />
        <StatCard label="Avg Degree" value={stats.avgDegree} />
        <div className="col-span-2 border-2 border-black p-2 bg-white">
          <div className="text-[8px] font-black uppercase">Graph Type</div>
          <div className="text-xs font-bold">{stats.type}</div>
        </div>
      </div>
    </section>
  );
};

const StatCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="border-2 border-black p-2 bg-white">
    <div className="text-[8px] font-black uppercase">{label}</div>
    <div className="text-lg font-black">{value}</div>
  </div>
);
