import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Code2, ExternalLink, Map, Share2, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const LeetCodeMode: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 p-8">
        <header className="mb-12">
           <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
             <Code2 size={48} className="text-primary-blue" /> LeetCode Visualizer
           </h1>
           <p className="text-xl font-bold text-gray-600">Master interview problems through interactive visual demonstrations.</p>
        </header>

        <div className="space-y-8 max-w-4xl">
           <ProblemRow
             id="200"
             title="Number of Islands"
             tags={['BFS', 'DFS', 'Disjoint Set']}
             description="Given an m x n 2D binary grid which represents a map of '1's (land) and '0's (water), return the number of islands."
             icon={<Map size={40} className="text-primary-yellow" />}
             link="/leetcode/islands"
           />
           <ProblemRow
             id="207"
             title="Course Schedule"
             tags={['Topological Sort', 'Cycle Detection']}
             description="There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Some courses have prerequisites."
             icon={<Layers size={40} className="text-primary-blue" />}
             disabled
           />
           <ProblemRow
             id="133"
             title="Clone Graph"
             tags={['DFS', 'BFS', 'Hash Map']}
             description="Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph."
             icon={<Share2 size={40} className="text-purple-500" />}
             disabled
           />
        </div>
      </div>
    </div>
  );
};

const ProblemRow = ({ id, title, tags, description, icon, link, disabled }: any) => (
  <div className={`border-4 border-black p-6 bg-gray-50 shadow-brutal flex flex-col md:flex-row gap-6 items-start ${disabled ? 'opacity-60 grayscale' : ''}`}>
     <div className="w-20 h-20 border-4 border-black bg-white flex items-center justify-center shrink-0">
        {icon}
     </div>
     <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
           <span className="text-xs font-black text-gray-400">#{id}</span>
           <h2 className="text-2xl font-black uppercase">{title}</h2>
        </div>
        <div className="flex gap-2 mb-4">
           {tags.map((t: string) => (
             <span key={t} className="text-[10px] font-black uppercase border-2 border-black px-2 py-0.5 bg-white">{t}</span>
           ))}
        </div>
        <p className="font-bold text-sm text-gray-600 mb-4">{description}</p>
        {disabled ? (
           <span className="text-xs font-black uppercase text-gray-400 italic">Coming Soon</span>
        ) : (
           <Link to={link} className="neo-brutal-button bg-white text-xs py-1.5 px-4 inline-flex items-center gap-2">
              Visualize Solution <ExternalLink size={14} />
           </Link>
        )}
     </div>
  </div>
);

export default LeetCodeMode;
