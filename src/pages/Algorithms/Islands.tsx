import React, { useState, useEffect } from 'react';
import { Navbar } from '../../components/common/Navbar';
import { ArrowLeft, Play, RotateCcw, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ROWS = 6;
const COLS = 8;

const IslandsVisualization: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([]);
  const [visited, setVisited] = useState<boolean[][]>([]);
  const [exploring, setExploring] = useState<[number, number] | null>(null);
  const [islandCount, setIslandCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(200);

  useEffect(() => {
    generateRandomGrid();
  }, []);

  const generateRandomGrid = () => {
    const newGrid = Array(ROWS).fill(0).map(() =>
      Array(COLS).fill(0).map(() => Math.random() > 0.6 ? 1 : 0)
    );
    setGrid(newGrid);
    setVisited(Array(ROWS).fill(0).map(() => Array(COLS).fill(false)));
    setExploring(null);
    setIslandCount(0);
    setIsRunning(false);
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runVisualization = async () => {
    if (isRunning) return;
    setIsRunning(true);

    const currentVisited = Array(ROWS).fill(0).map(() => Array(COLS).fill(false));
    setVisited(currentVisited);
    let count = 0;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c] === 1 && !currentVisited[r][c]) {
          count++;
          setIslandCount(count);
          await bfs(r, c, currentVisited);
        }
      }
    }

    setIsRunning(false);
    setExploring(null);
  };

  const bfs = async (r: number, c: number, currentVisited: boolean[][]) => {
    const queue: [number, number][] = [[r, c]];
    currentVisited[r][c] = true;
    setVisited([...currentVisited.map(row => [...row])]);

    while (queue.length > 0) {
      const [currR, currC] = queue.shift()!;
      setExploring([currR, currC]);
      await sleep(speed);

      const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      for (const [dr, dc] of dirs) {
        const nr = currR + dr;
        const nc = currC + dc;
        if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc] === 1 && !currentVisited[nr][nc]) {
          currentVisited[nr][nc] = true;
          setVisited([...currentVisited.map(row => [...row])]);
          queue.push([nr, nc]);
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 p-8 max-w-6xl mx-auto w-full">
        <Link to="/leetcode" className="inline-flex items-center gap-2 font-black uppercase text-sm mb-8 hover:text-primary-blue transition-colors">
          <ArrowLeft size={16} /> Back to Problems
        </Link>

        <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
           <div>
              <div className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 mb-2">
                 <span>LeetCode #200</span>
                 <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                 <span className="text-primary-blue">Medium</span>
              </div>
              <h1 className="text-5xl font-black uppercase tracking-tighter">Number of Islands</h1>
           </div>

           <div className="flex gap-4">
              <div className="border-4 border-black p-4 bg-primary-yellow shadow-brutal">
                 <div className="text-[10px] font-black uppercase opacity-60">Islands Found</div>
                 <div className="text-3xl font-black">{islandCount}</div>
              </div>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2">
              <div className="border-4 border-black p-8 bg-white shadow-brutal mb-8">
                 <div className="grid grid-cols-8 gap-4">
                    {grid.map((row, r) => (
                      row.map((cell, c) => (
                        <motion.div
                          key={`${r}-${c}`}
                          animate={{
                            backgroundColor: exploring?.[0] === r && exploring?.[1] === c
                              ? '#3B82F6'
                              : (visited[r][c] ? '#FEF08A' : (cell === 1 ? '#000' : '#f3f4f6')),
                            scale: exploring?.[0] === r && exploring?.[1] === c ? 1.1 : 1
                          }}
                          className={`aspect-square border-2 border-black flex items-center justify-center`}
                        >
                           {cell === 1 && !visited[r][c] && !isRunning && <Map size={16} className="text-white opacity-20" />}
                        </motion.div>
                      ))
                    ))}
                 </div>
              </div>

              <div className="flex gap-4">
                 <button
                   onClick={runVisualization}
                   disabled={isRunning}
                   className="flex-1 flex items-center justify-center gap-2 border-4 border-black px-6 py-4 font-black uppercase bg-primary-blue text-white hover:bg-blue-600 transition-all shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
                 >
                   <Play size={20} /> Run Visualization
                 </button>
                 <button
                   onClick={generateRandomGrid}
                   disabled={isRunning}
                   className="flex items-center justify-center gap-2 border-4 border-black px-6 py-4 font-black uppercase bg-white hover:bg-gray-100 transition-all shadow-brutal active:translate-x-1 active:translate-y-1 active:shadow-none disabled:opacity-50"
                 >
                   <RotateCcw size={20} /> Reset
                 </button>
              </div>
           </div>

           <div className="space-y-6">
              <div className="border-4 border-black p-6 bg-white shadow-brutal">
                 <h3 className="text-xl font-black uppercase mb-4 border-b-4 border-black pb-2">Problem Logic</h3>
                 <div className="space-y-4 text-sm font-bold text-gray-600">
                    <div className="flex gap-3">
                       <div className="w-6 h-6 border-2 border-black bg-black flex-shrink-0"></div>
                       <span>Land (1)</span>
                    </div>
                    <div className="flex gap-3">
                       <div className="w-6 h-6 border-2 border-black bg-gray-100 flex-shrink-0"></div>
                       <span>Water (0)</span>
                    </div>
                    <div className="flex gap-3">
                       <div className="w-6 h-6 border-2 border-black bg-primary-yellow flex-shrink-0"></div>
                       <span>Visited Land</span>
                    </div>
                    <div className="flex gap-3">
                       <div className="w-6 h-6 border-2 border-black bg-primary-blue flex-shrink-0"></div>
                       <span>Current Scan</span>
                    </div>
                 </div>
              </div>

              <div className="border-4 border-black p-6 bg-gray-50 shadow-brutal">
                 <h3 className="text-xl font-black uppercase mb-4">Algorithm</h3>
                 <p className="text-sm font-bold text-gray-600 mb-4">
                    We use BFS to explore each island. When we find an unvisited land cell, we increment our counter and visit all connected land cells.
                 </p>
                 <div className="bg-black p-4 rounded-none text-green-400 font-mono text-[10px] overflow-x-auto">
                    <pre>
{`for r in rows:
  for c in cols:
    if grid[r][c] == '1':
      count++
      bfs(grid, r, c)`}
                    </pre>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IslandsVisualization;
