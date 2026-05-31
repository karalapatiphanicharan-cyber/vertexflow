export interface AlgorithmLearningData {
  id: string;
  name: string;
  introduction: string;
  whyItExists: string;
  howItWorks: string[];
  complexity: {
    time: string;
    space: string;
  };
  useCases: string[];
  whenToUse: string;
  whenNotToUse: string;
  commonMistakes: string[];
  tips: string[];
  pseudocode: string;
}

export const learningContent: Record<string, AlgorithmLearningData> = {
  bfs: {
    id: 'bfs',
    name: 'Breadth First Search',
    introduction: 'BFS is a graph traversal algorithm that explores nodes layer by layer, starting from the root and moving outwards to neighbors.',
    whyItExists: 'It was originally designed to find the shortest path in unweighted graphs and to explore all reachable vertices in a structured, level-by-level manner.',
    howItWorks: [
      'Initialize a queue with the starting node.',
      'Mark the start node as visited.',
      'While the queue is not empty, dequeue a node.',
      'For each unvisited neighbor of the dequeued node, mark it visited and enqueue it.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Finding the shortest path in unweighted graphs',
      'Social network neighbor levels (e.g. 1st, 2nd, 3rd degree connections)',
      'Broadcasting in networks',
      'Web crawling'
    ],
    whenToUse: 'Use BFS when you need to find the shortest distance in an unweighted graph or when you want to explore nodes close to the source first.',
    whenNotToUse: 'Avoid BFS if the graph is extremely deep and you are looking for a specific target that is likely far away; DFS might be faster in reaching deep nodes.',
    commonMistakes: [
      'Forgetting to mark nodes as visited before enqueuing, leading to infinite loops.',
      'Using a stack instead of a queue (which results in DFS).'
    ],
    tips: [
      'Use a queue for FIFO processing.',
      'Always mark nodes as visited when enqueuing to prevent duplicates.',
      'BFS is optimal for finding the shallowest target.'
    ],
    pseudocode: `BFS(G, start_node):
  let Q be a queue
  Q.enqueue(start_node)
  mark start_node as visited
  while Q is not empty:
    v = Q.dequeue()
    for each neighbor w of v:
      if w is not visited:
        mark w as visited
        Q.enqueue(w)`
  },
  dfs: {
    id: 'dfs',
    name: 'Depth First Search',
    introduction: 'DFS is a traversal algorithm that explores as far as possible along each branch before backtracking.',
    whyItExists: 'DFS is highly efficient for exploring all possible paths, detecting cycles, and performing topological sorts due to its recursive nature.',
    howItWorks: [
      'Start at a node and mark it as visited.',
      'Recursively visit all unvisited neighbors.',
      'Backtrack when no more unvisited neighbors are available.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Topological sorting',
      'Finding connected components',
      'Solving puzzles (like mazes)',
      'Pathfinding where any path is acceptable'
    ],
    whenToUse: 'Use DFS when you need to visit every node, find a path to a target (not necessarily the shortest), or check for cycles.',
    whenNotToUse: 'Do not use DFS to find the shortest path in an unweighted graph.',
    commonMistakes: [
      'Not handling recursion depth, which can cause stack overflow in very large graphs.',
      'Forgetting to mark nodes as visited in the recursive call.'
    ],
    tips: [
      'Use a stack (explicitly or via recursion).',
      'Great for exploring paths, but not for finding shortest paths.',
      'Watch out for stack overflow on very deep graphs.'
    ],
    pseudocode: `DFS(G, v):
  mark v as visited
  for each neighbor w of v:
    if w is not visited:
      DFS(G, w)`
  },
  dijkstra: {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    introduction: "Dijkstra's algorithm finds the shortest path between nodes in a weighted graph with non-negative edge weights.",
    whyItExists: "It provides an efficient way to find the absolute shortest path from a source to all other nodes in a weighted environment, which is the foundation for modern GPS systems.",
    howItWorks: [
      'Assign distance infinity to all nodes, 0 to start node.',
      'Add all nodes to a priority queue.',
      'While queue is not empty, pick node with smallest distance.',
      'Relax edges by updating distances to neighbors.'
    ],
    complexity: {
      time: 'O((V + E) log V)',
      space: 'O(V)'
    },
    useCases: [
      'Google Maps (GPS routing)',
      'Network routing protocols (OSPF)',
      'Finding paths in robotics'
    ],
    whenToUse: 'Use Dijkstra when you have a weighted graph and all weights are non-negative.',
    whenNotToUse: 'Do not use Dijkstra if your graph has negative edge weights (use Bellman-Ford instead).',
    commonMistakes: [
      'Using a regular queue instead of a priority queue (makes it O(V^2) or incorrect).',
      'Applying it to graphs with negative weights.'
    ],
    tips: [
      'Requires non-negative weights.',
      'Uses a Priority Queue (Min-Heap) for efficiency.',
      'Known as a greedy algorithm.'
    ],
    pseudocode: `Dijkstra(G, start):
  dist[start] = 0
  PQ.push(start, 0)
  while PQ not empty:
    u = PQ.pop_min()
    for neighbor v of u:
      alt = dist[u] + weight(u, v)
      if alt < dist[v]:
        dist[v] = alt
        PQ.push(v, alt)`
  }
};
