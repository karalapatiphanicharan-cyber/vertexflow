import { runBFS } from '../algorithms/bfs/bfs';
import { runDFS } from '../algorithms/dfs/dfs';
import { runDijkstra } from '../algorithms/dijkstra/dijkstra';
import { runBellmanFord } from '../algorithms/bellmanFord/bellmanFord';
import { runPrim } from '../algorithms/prim/prim';
import { runKruskal } from '../algorithms/kruskal/kruskal';
import { runAStar } from '../algorithms/astar/astar';
import { runTopologicalSort } from '../algorithms/topologicalSort/topologicalSort';
import { runKosaraju } from '../algorithms/kosaraju/kosaraju';
import { runTarjan } from '../algorithms/tarjan/tarjan';
import { runConnectedComponents } from '../algorithms/connectedComponents/connectedComponents';
import { runCycleDetection } from '../algorithms/cycleDetection/cycleDetection';
import { runBidirectionalBFS } from '../algorithms/bidirectionalBfs/bidirectionalBfs';

import { GraphNode, GraphEdge, AlgorithmStep } from '../types/graph';

export interface RunResult {
  steps: AlgorithmStep[];
  runtimeMs: number;
}

export const runAlgorithm = (
  algo: string,
  nodes: GraphNode[],
  edges: GraphEdge[],
  isDirected: boolean,
  startNodeId: string = '',
  endNodeId: string = ''
): RunResult => {
  const startId = startNodeId || (nodes.length > 0 ? nodes[0].id : '');
  const endId = endNodeId || (nodes.length > 0 ? nodes[nodes.length - 1].id : '');

  const startTime = performance.now();
  let steps: AlgorithmStep[] = [];

  switch (algo) {
    case 'bfs':
      steps = runBFS(nodes, edges, startId, isDirected);
      break;
    case 'dfs':
      steps = runDFS(nodes, edges, startId, isDirected);
      break;
    case 'dijkstra':
      steps = runDijkstra(nodes, edges, startId, isDirected);
      break;
    case 'bellmanFord':
      steps = runBellmanFord(nodes, edges, startId, isDirected);
      break;
    case 'prim':
      steps = runPrim(nodes, edges);
      break;
    case 'kruskal':
      steps = runKruskal(nodes, edges);
      break;
    case 'astar':
      steps = runAStar(nodes, edges, startId, endId, isDirected);
      break;
    case 'topologicalSort':
      steps = runTopologicalSort(nodes, edges);
      break;
    case 'kosaraju':
      steps = runKosaraju(nodes, edges);
      break;
    case 'tarjan':
      steps = runTarjan(nodes, edges);
      break;
    case 'connectedComponents':
      steps = runConnectedComponents(nodes, edges, isDirected);
      break;
    case 'cycleDetection':
      steps = runCycleDetection(nodes, edges, isDirected);
      break;
    case 'bidirectionalBfs':
      steps = runBidirectionalBFS(nodes, edges, startId, endId, isDirected);
      break;
    default:
      steps = [];
  }
  const endTime = performance.now();

  return {
    steps,
    runtimeMs: parseFloat((endTime - startTime).toFixed(4))
  };
};
