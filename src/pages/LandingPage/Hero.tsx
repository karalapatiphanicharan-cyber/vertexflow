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
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <div className="inline-block px-4 py-2 border-4 border-black bg-primary-yellow font-black uppercase tracking-widest text-sm mb-8 shadow-brutal">
            Interactive Graph Algorithm Platform
          </div>
          <h1 className="text-5xl md:text-6xl xl:text-8xl font-black uppercase leading-[0.85] mb-8 tracking-tighter max-w-2xl">
            Visualize Graph <span className="text-primary-blue">Algorithms</span> In Motion
          </h1>
          <p className="text-xl md:text-2xl xl:text-3xl font-black mb-12 max-w-xl text-gray-500 leading-tight">
            Build. Run. Understand. The ultimate playground for mastering graph theory.
          </p>
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
            <a href="/playground" className="neo-brutal-button bg-primary-blue text-white flex items-center gap-3 text-2xl py-6 px-10 hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
              <Play className="fill-current" size={24} /> Launch Playground
            </a>
            <a href="/learn" className="neo-brutal-button bg-white text-black flex items-center gap-3 text-2xl py-6 px-10 hover:translate-x-2 hover:translate-y-2 hover:shadow-none transition-all">
              <Search size={24} /> Explore Algorithms
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
