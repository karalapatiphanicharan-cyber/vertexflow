import React from 'react';
import { Camera } from 'lucide-react';

export const ProductScreenshots: React.FC = () => {
  return (
    <section className="py-24 px-8 border-t-4 border-black bg-white">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="flex justify-center items-center gap-4 mb-6">
          <Camera size={48} className="text-primary-yellow" />
          <h2 className="text-5xl font-black uppercase tracking-tighter">Product Tour</h2>
        </div>
        <p className="text-xl font-bold text-gray-600">A workspace designed for maximum clarity and deep learning.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="border-4 border-black p-6 bg-gray-50 shadow-brutal group rounded-[32px] hover:-translate-y-2 transition-all">
          <div className="aspect-video bg-primary-yellow border-4 border-black mb-6 overflow-hidden relative rounded-[20px]">
             <div className="absolute inset-0 flex items-center justify-center font-black text-black/10 text-4xl uppercase italic select-none">Graph Editor</div>
             <div className="absolute inset-4 border-4 border-black border-dashed flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-black bg-white shadow-brutal rounded-full animate-bounce"></div>
             </div>
          </div>
          <h3 className="text-3xl font-black uppercase mb-3">Interactive Playground</h3>
          <p className="font-bold text-gray-500 text-lg leading-snug">Build graphs manually, add weights, edit nodes and run algorithms in a professional workspace.</p>
        </div>

        <div className="border-4 border-black p-6 bg-gray-50 shadow-brutal group rounded-[32px] hover:-translate-y-2 transition-all">
          <div className="aspect-video bg-primary-blue border-4 border-black mb-6 overflow-hidden relative rounded-[20px]">
             <div className="absolute inset-0 flex items-center justify-center font-black text-white/10 text-4xl uppercase italic select-none">Analysis</div>
             <div className="absolute inset-4 border-4 border-white/30 border-dashed flex items-center justify-center gap-2">
                <div className="w-8 h-16 border-4 border-white bg-white/20"></div>
                <div className="w-8 h-24 border-4 border-white bg-white/20"></div>
                <div className="w-8 h-12 border-4 border-white bg-white/20"></div>
             </div>
          </div>
          <h3 className="text-3xl font-black uppercase mb-3">Algorithm Comparison</h3>
          <p className="font-bold text-gray-500 text-lg leading-snug">Compare algorithms side-by-side on identical topologies and analyze efficiency with live performance metrics.</p>
        </div>

        <div className="border-4 border-black p-6 bg-gray-50 shadow-brutal group rounded-[32px] hover:-translate-y-2 transition-all">
          <div className="aspect-video bg-white border-4 border-black mb-6 overflow-hidden relative rounded-[20px]">
             <div className="absolute inset-0 flex items-center justify-center font-black text-black/10 text-4xl uppercase italic select-none">Wiki</div>
             <div className="absolute inset-4 border-4 border-black/10 border-dashed flex flex-col gap-2 p-4">
                <div className="w-full h-2 bg-black/10"></div>
                <div className="w-3/4 h-2 bg-black/10"></div>
                <div className="w-1/2 h-2 bg-black/10"></div>
             </div>
          </div>
          <h3 className="text-3xl font-black uppercase mb-3">Learning Hub</h3>
          <p className="font-bold text-gray-500 text-lg leading-snug">Master theory through interactive walkthroughs, complexity analysis, pseudocode, and technical interview tips.</p>
        </div>
      </div>
    </section>
  );
};
