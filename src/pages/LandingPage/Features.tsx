import React from 'react';
import { MousePointer2, PlayCircle, BarChart3, GraduationCap } from 'lucide-react';

const features = [
  {
    icon: <MousePointer2 size={32} />,
    title: "Interactive Canvas",
    description: "Build and manipulate graphs with an intuitive drag-and-drop interface.",
    color: "bg-primary-yellow"
  },
  {
    icon: <PlayCircle size={32} />,
    title: "Step-by-Step",
    description: "Pause, rewind, and replay algorithm execution with absolute control.",
    color: "bg-primary-blue"
  },
  {
    icon: <BarChart3 size={32} />,
    title: "Live Analytics",
    description: "Monitor time complexity and data structure states in real-time.",
    color: "bg-green-400"
  },
  {
    icon: <GraduationCap size={32} />,
    title: "Interview Ready",
    description: "Visualize common LeetCode patterns like islands and topological sorting.",
    color: "bg-purple-400"
  }
];

export const Features: React.FC = () => {
  return (
    <section className="py-32 px-8 border-t-4 border-black bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Built for <span className="text-primary-blue">Power Users</span></h2>
          <p className="text-xl font-black text-black/60 uppercase tracking-widest">Everything you need to master graph theory</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="border-4 border-black p-8 shadow-brutal flex flex-col h-full bg-white group hover:-translate-y-2 transition-all rounded-[32px]">
              <div className={`w-16 h-16 border-4 border-black ${f.color} flex items-center justify-center mb-8 shadow-brutal`}>
                {f.icon}
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">{f.title}</h3>
              <p className="font-bold text-gray-500 leading-tight text-lg">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
