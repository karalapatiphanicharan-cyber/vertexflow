import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { BookOpen, Search, Clock, Zap, CheckCircle2, AlertCircle } from 'lucide-react';
import { learningContent } from '../../data/learningContent';

const LearnPage: React.FC = () => {
  const [selectedAlgoId, setSelectedAlgoId] = useState('bfs');
  const [searchTerm, setSearchTerm] = useState('');

  const currentAlgo = learningContent[selectedAlgoId] || learningContent['bfs'];

  const categories = [
    { name: 'Traversal', algos: ['bfs', 'dfs'] },
    { name: 'Shortest Path', algos: ['dijkstra', 'bellmanFord'] },
    { name: 'MST', algos: ['prim', 'kruskal'] },
  ];

  const filteredCategories = categories.map(cat => ({
    ...cat,
    algos: cat.algos.filter(id =>
      learningContent[id]?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.algos.length > 0);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <header className="mb-12">
           <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 flex items-center gap-4">
             <BookOpen size={48} className="text-primary-yellow" /> Learning Hub
           </h1>
           <p className="text-xl font-bold text-gray-600">Master graph algorithms with comprehensive guides and interview tips.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
           <aside className="md:col-span-1 space-y-2">
              <div className="relative mb-6">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input
                   type="text"
                   placeholder="Search algorithms..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-10 pr-4 py-2 border-4 border-black font-bold outline-none focus:bg-primary-yellow/10 transition-colors"
                 />
              </div>

              {filteredCategories.map(cat => (
                <div key={cat.name}>
                  <CategoryHeader label={cat.name} />
                  {cat.algos.map(id => (
                    <AlgoLink
                      key={id}
                      label={learningContent[id].name}
                      active={selectedAlgoId === id}
                      onClick={() => setSelectedAlgoId(id)}
                    />
                  ))}
                </div>
              ))}
           </aside>

           <main className="md:col-span-3">
              <div className="border-4 border-black p-8 bg-white shadow-brutal min-h-[600px]">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h2 className="text-4xl font-black uppercase">{currentAlgo.name}</h2>
                    <div className="flex gap-4">
                       <ComplexityBadge icon={<Clock size={14}/>} label="Time" value={currentAlgo.complexity.time} />
                       <ComplexityBadge icon={<Zap size={14}/>} label="Space" value={currentAlgo.complexity.space} />
                    </div>
                 </div>

                 <section className="font-bold text-gray-600 leading-relaxed">
                    <p className="mb-8 text-lg text-black">
                       {currentAlgo.introduction}
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                       <div>
                          <h3 className="text-black font-black uppercase mb-4 flex items-center gap-2">
                            <CheckCircle2 size={20} className="text-green-500" /> How it works
                          </h3>
                          <ul className="space-y-3">
                             {currentAlgo.howItWorks.map((step, i) => (
                               <li key={i} className="flex gap-3">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-[10px]">{i+1}</span>
                                  <span>{step}</span>
                               </li>
                             ))}
                          </ul>
                       </div>

                       <div>
                          <h3 className="text-black font-black uppercase mb-4 flex items-center gap-2">
                            <AlertCircle size={20} className="text-primary-blue" /> Interview Tips
                          </h3>
                          <ul className="list-disc pl-5 space-y-2 text-sm">
                             {currentAlgo.tips.map((tip, i) => (
                               <li key={i}>{tip}</li>
                             ))}
                          </ul>
                       </div>
                    </div>

                    <div className="mb-12 border-4 border-black bg-gray-900 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                       <h4 className="text-primary-yellow font-black uppercase mb-4 text-xs tracking-widest flex justify-between items-center">
                          Pseudocode
                          <span className="text-[8px] bg-white/10 px-2 py-1 rounded text-white/50">READ ONLY</span>
                       </h4>
                       <pre className="text-white font-mono text-sm overflow-x-auto">
                          {currentAlgo.pseudocode}
                       </pre>
                    </div>

                    <h3 className="text-black font-black uppercase mb-4">Real-World Applications</h3>
                    <div className="flex flex-wrap gap-2">
                       {currentAlgo.useCases.map((useCase, i) => (
                         <span key={i} className="px-3 py-1 bg-primary-yellow/20 text-black border-2 border-black text-xs uppercase font-black">
                            {useCase}
                         </span>
                       ))}
                    </div>
                 </section>
              </div>
           </main>
        </div>
      </div>
    </div>
  );
};

const CategoryHeader = ({ label }: any) => (
  <div className="text-[10px] font-black uppercase text-gray-400 mt-6 mb-2 tracking-widest">{label}</div>
);

const AlgoLink = ({ label, active, onClick }: any) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-2 font-black uppercase text-sm border-2 mb-1 transition-all ${
      active ? 'bg-black text-white border-black translate-x-1' : 'bg-white text-black border-transparent hover:border-black'
    }`}
  >
    {label}
  </button>
);

const ComplexityBadge = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-2 border-2 border-black px-3 py-1 bg-gray-50 whitespace-nowrap">
     <span className="text-gray-400">{icon}</span>
     <span className="text-[10px] font-black uppercase">{label}:</span>
     <span className="text-xs font-black">{value}</span>
  </div>
);

export default LearnPage;
