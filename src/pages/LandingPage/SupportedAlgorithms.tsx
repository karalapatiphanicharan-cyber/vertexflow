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
    <section className="py-24 px-8 border-t-4 border-black bg-primary-yellow">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-black uppercase tracking-tighter mb-16 text-center">Supported Algorithms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div key={i} className="border-4 border-black p-8 bg-white shadow-brutal">
              <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">{cat.name}</h3>
              <ul className="space-y-4">
                {cat.algos.map((algo, j) => (
                  <li key={j} className="flex items-center gap-3 font-bold uppercase text-sm">
                    <div className="w-5 h-5 border-2 border-black bg-primary-blue flex items-center justify-center">
                      <Check size={12} className="text-white" />
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
