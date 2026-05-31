import React from 'react';
import { useGraphStore } from '../../store/useGraphStore';
import { Activity, Layout, Layers } from 'lucide-react';

export const GraphStats: React.FC = () => {
  const { nodes, edges, isDirected, isWeighted } = useGraphStore();

  const density = nodes.length > 1
    ? (edges.length / (nodes.length * (nodes.length - 1))).toFixed(2)
    : '0.00';

  const avgDegree = nodes.length > 0
    ? (edges.length * 2 / nodes.length).toFixed(2)
    : '0.00';

  return (
    <section>
      <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-3 tracking-tight">
        <Activity size={20} className="text-primary-blue" /> Graph Info
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <StatItem label="Node Count" value={nodes.length} color="bg-white" />
        <StatItem label="Edge Count" value={edges.length} color="bg-white" />
        <StatItem label="Density" value={density} color="bg-white" />
        <StatItem label="Avg Degree" value={avgDegree} color="bg-white" />
      </div>
      <div className="mt-4 p-3 border-4 border-black bg-primary-blue text-white shadow-brutal flex items-center justify-between">
         <div className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Layout size={14} className="text-primary-yellow" /> Type
         </div>
         <div className="text-[10px] font-black uppercase">
            {isDirected ? 'Directed' : 'Undirected'}, {isWeighted ? 'Weighted' : 'Unweighted'}
         </div>
      </div>
    </section>
  );
};

const StatItem = ({ label, value, color }: any) => (
  <div className={`border-4 border-black p-4 ${color} shadow-brutal transition-transform hover:-translate-y-0.5`}>
    <div className="text-[9px] font-black uppercase text-gray-400 mb-1 tracking-tighter">{label}</div>
    <div className="text-2xl font-black">{value}</div>
  </div>
);
