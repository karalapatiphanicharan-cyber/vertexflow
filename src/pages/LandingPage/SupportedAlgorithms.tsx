import React from 'react';
import { Check } from 'lucide-react';

const categories = [
  {
    name: "Traversal",
    algos: ["BFS", "DFS", "Bidirectional BFS"]
  },
  {
    name: "Shortest Path",
    algos: ["Dijkstra", "Bellman-Ford", "A* Search", "Floyd-Warshall"]
  },
  {
    name: "Spanning Tree",
    algos: ["Prim's", "Kruskal's"]
  },
  {
    name: "Advanced",
    algos: ["Topological Sort", "Tarjan's", "Kosaraju", "Cycle Detection"]
  }
];

export const SupportedAlgorithms: React.FC = () => {
  return (
    <section className="py-32 px-8 border-t-4 border-black bg-primary-yellow">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Algorithm <span className="text-primary-blue">Catalog</span></h2>
          <p className="text-xl font-black text-black/60 uppercase tracking-widest">16+ Production-Grade Visualizations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="border-4 border-black p-8 bg-white shadow-brutal hover:-translate-y-2 transition-all rounded-[32px] group">
              <div className="flex justify-between items-start mb-6 border-b-4 border-black pb-4">
                <h3 className="text-2xl font-black uppercase leading-none">{cat.name}</h3>
                <span className="bg-black text-white px-3 py-1 text-xs font-black rounded-full">{cat.algos.length}</span>
              </div>
              <ul className="space-y-4">
                {cat.algos.map((algo, j) => (
                  <li key={j} className="flex items-center gap-3 font-black uppercase text-xs text-gray-500 group-hover:text-black transition-colors">
                    <div className="w-5 h-5 border-2 border-black bg-primary-yellow flex items-center justify-center shrink-0">
                      <Check size={12} className="text-black" strokeWidth={4} />
                    </div>
                    {algo}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
