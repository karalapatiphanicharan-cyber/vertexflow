import React from 'react';
import { MousePointer2, Layers, Activity, BookOpen, GraduationCap } from 'lucide-react';

const reasons = [
  {
    icon: <GraduationCap size={32} />,
    title: "Interactive Learning",
    description: "Don't just read about algorithms—interact with them. Modify structures in real-time and see immediate results.",
    color: "bg-primary-yellow"
  },
  {
    icon: <MousePointer2 size={32} />,
    title: "Manual Graph Building",
    description: "Our robust graph editor allows you to draw any topology from scratch, including custom weights and edge directions.",
    color: "bg-primary-blue",
    textColor: "text-white"
  },
  {
    icon: <Layers size={32} />,
    title: "Side-by-Side Comparison",
    description: "Run multiple algorithms on the same graph topology simultaneously to analyze performance trade-offs.",
    color: "bg-white"
  },
  {
    icon: <Activity size={32} />,
    title: "Real-Time Visualization",
    description: "Watch internal data structures like Queues, Stacks, and Priority Queues update live as the algorithm executes.",
    color: "bg-gray-100"
  },
  {
    icon: <BookOpen size={32} />,
    title: "Interview Preparation",
    description: "Deep-dive into complexity analysis, pseudocode, and technical interview tips for every major graph algorithm.",
    color: "bg-primary-yellow"
  }
];

export const WhyVertexFlow: React.FC = () => {
  return (
    <section className="py-32 px-8 bg-white border-t-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center lg:text-left">
           <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Why <span className="text-primary-blue">VertexFlow?</span></h2>
           <p className="text-xl md:text-2xl font-bold text-gray-500 max-w-3xl">The definitive platform for students and developers to master graph theory through action and observation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {reasons.map((reason, i) => (
             <div
               key={i}
               className={`border-4 border-black p-10 shadow-brutal transition-all hover:-translate-y-2 ${reason.color} ${reason.textColor || 'text-black'} flex flex-col items-start gap-6 rounded-[32px]`}
             >
                <div className="p-4 border-4 border-black bg-white text-black shadow-brutal">
                   {reason.icon}
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight leading-tight">{reason.title}</h3>
                <p className="font-bold text-lg opacity-80 leading-relaxed">{reason.description}</p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};
