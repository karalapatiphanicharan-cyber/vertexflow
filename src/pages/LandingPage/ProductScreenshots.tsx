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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="border-4 border-black p-4 bg-gray-50 shadow-brutal group">
          <div className="aspect-video bg-white border-4 border-black mb-4 overflow-hidden relative">
             <div className="absolute inset-0 flex items-center justify-center font-black text-gray-100 text-6xl uppercase italic select-none">Playground</div>
          </div>
          <h3 className="text-2xl font-black uppercase">Interactive Playground</h3>
          <p className="font-bold text-gray-600">Build complex graphs from scratch or generate templates in seconds.</p>
        </div>
        <div className="border-4 border-black p-4 bg-gray-50 shadow-brutal group">
          <div className="aspect-video bg-white border-4 border-black mb-4 overflow-hidden relative">
             <div className="absolute inset-0 flex items-center justify-center font-black text-gray-100 text-6xl uppercase italic select-none">Analytics</div>
          </div>
          <h3 className="text-2xl font-black uppercase">Performance Comparison</h3>
          <p className="font-bold text-gray-600">Run algorithms side-by-side and analyze efficiency with real metrics.</p>
        </div>
      </div>
    </section>
  );
};
