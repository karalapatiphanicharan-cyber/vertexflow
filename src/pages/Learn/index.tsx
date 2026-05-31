import React, { useState } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { learningContent, AlgorithmLearningData } from '../../data/learningContent';
import { Book, Code2, Zap, Info, ShieldAlert, CheckCircle2, ChevronRight, GraduationCap } from 'lucide-react';
import { NeoCard } from '../../components/common/NeoCard';

const LearnPage: React.FC = () => {
  const [selectedAlgo, setSelectedAlgo] = useState<string>('bfs');
  const data = learningContent[selectedAlgo];

  if (!data) return <div>Algorithm not found</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 border-r-4 border-black p-8 bg-gray-50 flex flex-col h-auto lg:h-[calc(100vh-80px)] overflow-y-auto sticky top-20">
          <div className="flex items-center gap-3 mb-12">
            <GraduationCap size={40} className="text-primary-blue" />
            <h2 className="text-3xl font-black uppercase tracking-tighter">Learning <br />Hub</h2>
          </div>

          <div className="space-y-4">
             <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Select Algorithm</div>
             {Object.keys(learningContent).map((key) => (
               <button
                 key={key}
                 onClick={() => setSelectedAlgo(key)}
                 className={`w-full text-left p-4 border-4 border-black font-black uppercase text-xs transition-all shadow-brutal active:translate-y-1 active:shadow-none flex items-center justify-between ${selectedAlgo === key ? 'bg-primary-yellow translate-x-1 translate-y-1 shadow-none' : 'bg-white hover:bg-gray-100'}`}
               >
                 {learningContent[key].name}
                 <ChevronRight size={16} />
               </button>
             ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 p-4 md:p-12 overflow-y-auto max-w-6xl">
           <header className="mb-16">
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">{data.name}</h1>
              <p className="text-xl md:text-2xl font-bold text-gray-500 leading-relaxed italic border-l-8 border-primary-yellow pl-8">
                "{data.introduction}"
              </p>
           </header>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <section className="space-y-8">
                 <div className="border-4 border-black p-8 bg-white shadow-brutal rounded-[24px]">
                    <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                       <Info size={28} className="text-primary-blue" /> Why it exists
                    </h3>
                    <p className="font-bold text-gray-600 leading-relaxed">{data.whyItExists}</p>
                 </div>

                 <div className="border-4 border-black p-8 bg-gray-50 shadow-brutal rounded-[24px]">
                    <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                       <Zap size={28} className="text-primary-yellow" /> When to use
                    </h3>
                    <div className="space-y-4">
                       <div className="p-4 bg-white border-2 border-black flex gap-4">
                          <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                          <p className="text-sm font-bold text-gray-600">{data.whenToUse}</p>
                       </div>
                       <div className="p-4 bg-white border-2 border-black flex gap-4">
                          <ShieldAlert size={24} className="text-red-500 shrink-0" />
                          <p className="text-sm font-bold text-gray-600">{data.whenNotToUse}</p>
                       </div>
                    </div>
                 </div>
              </section>

              <section className="space-y-8">
                 <div className="border-4 border-black p-8 bg-black text-white shadow-brutal rounded-[24px]">
                    <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                       <Code2 size={28} className="text-primary-yellow" /> Pseudocode
                    </h3>
                    <div className="bg-zinc-900 p-6 font-mono text-xs text-primary-yellow overflow-x-auto leading-loose">
                       <pre>{data.pseudocode}</pre>
                    </div>
                 </div>

                 <div className="border-4 border-black p-8 bg-white shadow-brutal rounded-[24px]">
                    <h3 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
                       <Book size={28} className="text-primary-blue" /> Complexity
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="p-4 border-2 border-black text-center">
                          <div className="text-[10px] font-black uppercase text-gray-400">Time</div>
                          <div className="text-3xl font-black">{data.complexity.time}</div>
                       </div>
                       <div className="p-4 border-2 border-black text-center">
                          <div className="text-[10px] font-black uppercase text-gray-400">Space</div>
                          <div className="text-3xl font-black">{data.complexity.space}</div>
                       </div>
                    </div>
                 </div>
              </section>
           </div>

           <section className="mb-24">
              <h3 className="text-3xl font-black uppercase mb-12 flex items-center gap-3 underline decoration-primary-yellow underline-offset-8">
                 Interactive Walkthrough
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div>
                    <h4 className="text-xl font-black uppercase mb-6">How it works</h4>
                    <ul className="space-y-6">
                       {data.howItWorks.map((step, i) => (
                         <li key={i} className="flex gap-4">
                            <div className="w-8 h-8 border-4 border-black bg-black text-white flex items-center justify-center shrink-0 font-black text-sm">{i+1}</div>
                            <p className="font-bold text-gray-600 pt-1">{step}</p>
                         </li>
                       ))}
                    </ul>
                 </div>
                 <div className="space-y-12">
                    <div>
                       <h4 className="text-xl font-black uppercase mb-6">Common Mistakes</h4>
                       <ul className="space-y-4">
                          {data.commonMistakes.map((m, i) => (
                            <li key={i} className="flex items-center gap-3 p-4 border-2 border-red-500 bg-red-50 font-bold text-sm text-red-700">
                               <ShieldAlert size={20} /> {m}
                            </li>
                          ))}
                       </ul>
                    </div>
                    <div>
                       <h4 className="text-xl font-black uppercase mb-6">Interview Tips</h4>
                       <ul className="space-y-4">
                          {data.tips.map((t, i) => (
                            <li key={i} className="flex items-center gap-3 p-4 border-2 border-primary-blue bg-blue-50 font-bold text-sm text-primary-blue">
                               <CheckCircle2 size={20} /> {t}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </div>
           </section>
        </main>
      </div>
    </div>
  );
};

export default LearnPage;
