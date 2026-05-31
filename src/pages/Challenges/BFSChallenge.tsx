import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { ArrowLeft, Trophy, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import GraphCanvas from '../../components/graph/GraphCanvas';
import { generateRandomGraph } from '../../utils/graphGenerator';
import { runBFS } from '../../algorithms/bfs/bfs';
import { GraphNode, GraphEdge } from '../../types/graph';

const BFSChallenge: React.FC = () => {
  const [graph, setGraph] = useState<{nodes: GraphNode[], edges: GraphEdge[]}>({nodes: [], edges: []});
  const [correctOrder, setCorrectOrder] = useState<string[]>([]);
  const [userOrder, setUserOrder] = useState<string[]>([]);
  const [status, setStatus] = useState<'playing' | 'success' | 'failed'>('playing');

  useEffect(() => {
    initChallenge();
  }, []);

  const initChallenge = () => {
    const { nodes, edges } = generateRandomGraph(6, 'sparse', false, false);
    setGraph({ nodes, edges });

    const steps = runBFS(nodes, edges, nodes[0].id, false);
    // Extract visit order from steps
    const order: string[] = [];
    const visitedSet = new Set<string>();
    steps.forEach(step => {
      step.visitedNodes.forEach(id => {
        if (!visitedSet.has(id)) {
          visitedSet.add(id);
          order.push(id);
        }
      });
    });

    setCorrectOrder(order);
    setUserOrder([]);
    setStatus('playing');
  };

  const handleNodeClick = (nodeId: string) => {
    if (status !== 'playing' || userOrder.includes(nodeId)) return;

    const newUserOrder = [...userOrder, nodeId];
    setUserOrder(newUserOrder);

    // Check if the latest addition is correct
    const currentIndex = newUserOrder.length - 1;
    if (newUserOrder[currentIndex] !== correctOrder[currentIndex]) {
      setStatus('failed');
    } else if (newUserOrder.length === correctOrder.length) {
      setStatus('success');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <Link to="/challenges" className="inline-flex items-center gap-2 font-black uppercase text-sm mb-8 hover:text-primary-blue transition-colors">
          <ArrowLeft size={16} /> Back to Challenges
        </Link>

        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
           <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 mb-2">
                 <span>Challenge #01</span>
                 <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                 <span className="text-green-500">Easy</span>
              </div>
              <h1 className="text-5xl font-black uppercase tracking-tighter">BFS Explorer</h1>
              <p className="text-xl font-bold text-gray-600 mt-2">Predict the visit order for Breadth-First Search starting from Node A.</p>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           <div className="lg:col-span-3">
              <div className="border-4 border-black h-[500px] bg-gray-50 shadow-brutal relative mb-8">
                 <GraphCanvas
                   nodes={graph.nodes.map(n => ({
                     ...n,
                     type: userOrder.includes(n.id) ? 'visited' : 'default'
                   }))}
                   edges={graph.edges}
                   onNodeClick={(id) => handleNodeClick(id)}
                 />

                 {status !== 'playing' && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                       <div className="border-4 border-black p-10 bg-white shadow-brutal text-center max-w-md">
                          {status === 'success' ? (
                            <>
                               <CheckCircle2 size={64} className="text-green-500 mx-auto mb-4" />
                               <h2 className="text-3xl font-black uppercase mb-2">Excellent!</h2>
                               <p className="font-bold text-gray-600 mb-6">You correctly predicted the BFS traversal order.</p>
                            </>
                          ) : (
                            <>
                               <XCircle size={64} className="text-red-500 mx-auto mb-4" />
                               <h2 className="text-3xl font-black uppercase mb-2">Oops!</h2>
                               <p className="font-bold text-gray-600 mb-6">That wasn't the next node in BFS. Remember, BFS explores level by level.</p>
                            </>
                          )}
                          <button
                            onClick={initChallenge}
                            className="w-full neo-brutal-button-blue py-3 flex items-center justify-center gap-2"
                          >
                             <RotateCcw size={20} /> Try Another Graph
                          </button>
                       </div>
                    </div>
                 )}
              </div>
           </div>

           <div className="space-y-6">
              <div className="border-4 border-black p-6 bg-white shadow-brutal">
                 <h3 className="text-xl font-black uppercase mb-4 border-b-4 border-black pb-2">Your Path</h3>
                 <div className="flex flex-wrap gap-2 min-h-[100px]">
                    {userOrder.map((id, index) => (
                      <div key={id} className="w-10 h-10 border-2 border-black flex items-center justify-center font-black bg-primary-yellow">
                         {graph.nodes.find(n => n.id === id)?.data.label}
                      </div>
                    ))}
                    {status === 'playing' && (
                      <div className="w-10 h-10 border-2 border-black border-dashed flex items-center justify-center font-black text-gray-300">
                         ?
                      </div>
                    )}
                 </div>
              </div>

              <div className="border-4 border-black p-6 bg-primary-blue text-white shadow-brutal">
                 <h3 className="text-xl font-black uppercase mb-4 flex items-center gap-2">
                   <Trophy size={20} className="text-primary-yellow" /> Goal
                 </h3>
                 <ul className="space-y-3 text-sm font-bold">
                    <li>1. Click Node A to start.</li>
                    <li>2. Select its neighbors in alphabetical order.</li>
                    <li>3. Proceed to the next level of neighbors.</li>
                    <li>4. Complete the sequence!</li>
                 </ul>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BFSChallenge;
