import React from 'react';
import { motion } from 'framer-motion';
import { Play, Search } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative px-8 pt-20 pb-32 overflow-hidden border-b-4 border-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1 border-2 border-black bg-primary-yellow font-black uppercase tracking-widest text-sm mb-6 shadow-brutal">
            Beta Access Now Open
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.9] mb-8 tracking-tighter">
            Visualize Graph <span className="text-primary-blue">Algorithms</span> Like Never Before
          </h1>
          <p className="text-2xl font-bold mb-10 max-w-lg">
            Build graphs. Run algorithms. Understand every step with premium animations and real-time state visualization.
          </p>
          <div className="flex flex-wrap gap-6">
            <a href="/playground" className="neo-brutal-button bg-primary-blue text-white flex items-center gap-2 text-xl py-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <Play className="fill-current" /> Launch Playground
            </a>
            <a href="/algorithms" className="neo-brutal-button bg-white text-black flex items-center gap-2 text-xl py-4 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <Search /> Explore Algorithms
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] neo-brutal-card bg-gray-50 flex items-center justify-center overflow-hidden"
        >
           {/* Animated Graph Placeholder */}
           <div className="absolute inset-0 opacity-20 pointer-events-none">
             <div className="w-full h-full border-[20px] border-black/5 rounded-full scale-150 animate-pulse"></div>
           </div>
           <div className="relative z-10 flex flex-col items-center">
             <div className="flex gap-4 mb-4">
                <div className="w-16 h-16 rounded-full border-4 border-black bg-primary-yellow shadow-brutal animate-bounce"></div>
                <div className="w-16 h-16 rounded-full border-4 border-black bg-primary-blue shadow-brutal animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-16 h-16 rounded-full border-4 border-black bg-white shadow-brutal animate-bounce [animation-delay:0.4s]"></div>
             </div>
             <div className="text-center font-black uppercase tracking-tighter text-2xl">
               VertexFlow Engine
             </div>
           </div>
        </motion.div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-10 right-10 w-20 h-20 border-4 border-black bg-primary-yellow rotate-12 -z-10 shadow-brutal"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 border-4 border-black bg-primary-blue -rotate-12 -z-10 shadow-brutal"></div>
    </section>
  );
};
