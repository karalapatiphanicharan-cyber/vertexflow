import React from 'react';
import { Navbar } from '../components/common/Navbar';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>{children}</main>
      <footer className="border-t-4 border-black bg-white p-12 mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
               <img src="/logo/vertexflow-logo.png" alt="VertexFlow Logo" className="h-8" />
               <span className="text-xl font-black uppercase tracking-tighter">VertexFlow</span>
            </div>
            <p className="font-bold text-gray-600 max-w-sm">
              The ultimate platform for visualizing graph algorithms in motion. Built for students, educators, and engineers.
            </p>
          </div>
          <div>
            <h4 className="font-black uppercase mb-4">Product</h4>
            <ul className="space-y-2 font-bold">
              <li><a href="#" className="hover:underline">Playground</a></li>
              <li><a href="#" className="hover:underline">Algorithms</a></li>
              <li><a href="#" className="hover:underline">Challenges</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase mb-4">Resources</h4>
            <ul className="space-y-2 font-bold">
              <li><a href="#" className="hover:underline">Documentation</a></li>
              <li><a href="#" className="hover:underline">Github</a></li>
              <li><a href="#" className="hover:underline">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t-2 border-black/10 text-center font-bold">
          © 2025 VertexFlow. Visualize Graph Algorithms in Motion.
        </div>
      </footer>
    </div>
  );
};
