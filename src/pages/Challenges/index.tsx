import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Trophy, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ChallengesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex-1 p-8">
        <header className="mb-12">
           <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
             <Trophy size={48} className="text-primary-yellow" /> Graph Challenges
           </h1>
           <p className="text-xl font-bold text-gray-600">Test your knowledge. Predict the algorithm's behavior.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <ChallengeCard
             title="BFS Explorer"
             difficulty="Easy"
             description="Predict the order in which nodes will be visited during a Breadth-First Search."
             link="/challenges/bfs"
           />
           <ChallengeCard
             title="Shortest Path Master"
             difficulty="Medium"
             description="Find the shortest path distance between two nodes before Dijkstra does."
             disabled
           />
           <ChallengeCard
             title="Cycle Detector"
             difficulty="Hard"
             description="Analyze the graph and determine if it contains any directed cycles."
             disabled
           />
        </div>
      </div>
    </div>
  );
};

const ChallengeCard = ({ title, difficulty, description, link, disabled }: any) => (
  <div className={`border-4 border-black p-6 bg-white shadow-brutal transition-transform ${disabled ? 'opacity-60 grayscale' : 'hover:-translate-x-1 hover:-translate-y-1 cursor-pointer'}`}>
     <div className="flex justify-between items-start mb-4">
        <h3 className="text-2xl font-black uppercase leading-none">{title}</h3>
        <span className={`px-2 py-1 text-[10px] font-black uppercase border-2 border-black ${
          difficulty === 'Easy' ? 'bg-green-400' : (difficulty === 'Medium' ? 'bg-primary-yellow' : 'bg-red-400')
        }`}>
          {difficulty}
        </span>
     </div>
     <p className="font-bold text-sm mb-6 text-gray-600">{description}</p>
     {disabled ? (
        <div className="w-full text-center font-black uppercase text-xs text-gray-400 py-2 border-2 border-dashed border-gray-300">
           Available Soon
        </div>
     ) : (
        <Link to={link} className="w-full neo-brutal-button-blue py-2 flex items-center justify-center gap-2">
           Start Challenge <HelpCircle size={18} />
        </Link>
     )}
  </div>
);

export default ChallengesPage;
