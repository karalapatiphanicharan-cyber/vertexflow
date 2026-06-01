import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-16 px-8 border-t-4 border-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
             <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary-yellow border-2 border-white flex items-center justify-center font-black text-black">V</div>
                <span className="text-3xl font-black uppercase tracking-tighter">VertexFlow</span>
             </div>
             <p className="text-gray-400 font-bold max-w-sm">
                Advanced graph algorithm visualization platform for students, developers, and educators. Master the flow of data.
             </p>
          </div>

          <div>
             <h4 className="font-black uppercase mb-6 text-primary-blue">Explore</h4>
             <ul className="space-y-4 font-bold text-sm">
                <li><Link to="/playground" className="hover:text-primary-yellow transition-colors">Playground</Link></li>
                <li><Link to="/learn-hub" className="hover:text-primary-yellow transition-colors">Learning Hub</Link></li>
                <li><Link to="/comparison" className="hover:text-primary-yellow transition-colors">Comparison Mode</Link></li>
                <li><Link to="/leetcode" className="hover:text-primary-yellow transition-colors">LeetCode Prep</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="font-black uppercase mb-6 text-primary-yellow">Connect</h4>
             <div className="flex gap-4">
                <a href="#" className="p-2 border-2 border-white hover:bg-white hover:text-black transition-all">
                   <Github size={20} />
                </a>
                <a href="#" className="p-2 border-2 border-white hover:bg-white hover:text-black transition-all">
                   <Twitter size={20} />
                </a>
                <a href="#" className="p-2 border-2 border-white hover:bg-white hover:text-black transition-all">
                   <Linkedin size={20} />
                </a>
             </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              © 2024 VertexFlow. Built with passion for graph theory.
           </p>
           <div className="flex items-center gap-2 text-xs font-black uppercase">
              Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Jules
           </div>
        </div>
      </div>
    </footer>
  );
};
