export interface AlgorithmLearningData {
  id: string;
  name: string;
  introduction: string;
  howItWorks: string[];
  complexity: {
    time: string;
    space: string;
  };
  useCases: string[];
  tips: string[];
  pseudocode: string;
}

export const learningContent: Record<string, AlgorithmLearningData> = {
  bfs: {
    id: 'bfs',
    name: 'Breadth First Search',
    introduction: 'BFS is a graph traversal algorithm that explores nodes layer by layer, starting from the root and moving outwards to neighbors.',
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
      'Social network neighbor levels',
      'Broadcasting in networks'
    ],
    tips: [
      'Use a queue for FIFO processing.',
      'Always mark nodes as visited when enqueuing to prevent cycles.',
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
      'Solving puzzles (like mazes)',
      'Topological sorting',
      'Finding connected components'
    ],
    tips: [
      'Use a stack (explicitly or via recursion).',
      'DFS is great for exploring paths, but not for finding shortest paths.',
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
  },
  bellmanFord: {
    id: 'bellmanFord',
    name: "Bellman-Ford",
    introduction: "Computes shortest paths from a single source vertex to all other vertices, even with negative edge weights.",
    howItWorks: [
      'Initialize distances: source = 0, others = infinity.',
      'Relax all edges |V| - 1 times.',
      'Relax once more to check for negative cycles.'
    ],
    complexity: {
      time: 'O(V * E)',
      space: 'O(V)'
    },
    useCases: [
      'Network routing protocols',
      'Arbitrage detection in finance'
    ],
    tips: [
      'Slower than Dijkstra but supports negative weights.',
      'If a distance can be reduced in the V-th iteration, a negative cycle exists.'
    ],
    pseudocode: `BellmanFord(G, source):
  dist[source] = 0
  for i from 1 to |V|-1:
    for each edge (u, v) with weight w:
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w`
  },
  astar: {
    id: 'astar',
    name: "A* Search",
    introduction: "An informed search algorithm that uses heuristics to find the shortest path more efficiently than Dijkstra.",
    howItWorks: [
      'Assign f(n) = g(n) + h(n) to nodes.',
      'g(n) is cost from start, h(n) is estimated cost to goal.',
      'Use priority queue to explore nodes with lowest f(n).'
    ],
    complexity: {
      time: 'O(E)',
      space: 'O(V)'
    },
    useCases: [
      'Pathfinding in games',
      'Robotics navigation'
    ],
    tips: [
      'Heuristic must be admissible (never overestimates).',
      'Consistent heuristics guarantee optimality.'
    ],
    pseudocode: `AStar(start, goal):
  openSet = {start}
  fScore[start] = h(start)
  while openSet is not empty:
    current = openSet.pop_min_f()
    if current == goal: return reconstruct_path()
    for neighbor in current:
      if gScore[current] + d(current, neighbor) < gScore[neighbor]:
        update scores and add to openSet`
  },
  kruskal: {
    id: 'kruskal',
    name: "Kruskal's Algorithm",
    introduction: "Finds the minimum spanning tree (MST) by processing edges in increasing order of weight.",
    howItWorks: [
      'Sort all edges by weight.',
      'Add the smallest edge that doesn\'t form a cycle.',
      'Use DSU for efficient cycle detection.'
    ],
    complexity: {
      time: 'O(E log E)',
      space: 'O(E + V)'
    },
    useCases: [
      'Network infrastructure design',
      'Approximation algorithms'
    ],
    tips: [
      'Efficient for sparse graphs.',
      'Sorting edges is the bottleneck.'
    ],
    pseudocode: `Kruskal(G):
  sort edges by weight
  for edge (u, v):
    if find(u) != find(v):
      add to MST
      union(u, v)`
  },
  prim: {
    id: 'prim',
    name: "Prim's Algorithm",
    introduction: "Finds the MST by growing the tree one node at a time from a starting vertex.",
    howItWorks: [
      'Start with a single node in the MST.',
      'In each step, add the cheapest edge connecting a node in the MST to a node outside.',
      'Repeat until all nodes are included.'
    ],
    complexity: {
      time: 'O(E log V)',
      space: 'O(V)'
    },
    useCases: [
      'Cluster analysis',
      'Network design'
    ],
    tips: [
      'Works better than Kruskal for dense graphs.',
      'Use a priority queue to find the minimum weight edge.'
    ],
    pseudocode: `Prim(G, start):
  visited[start] = true
  PQ.push(edges of start)
  while PQ not empty:
    e = PQ.pop_min()
    if e.v is not visited:
      add e to MST
      visited[e.v] = true
      PQ.push(edges of e.v)`
  },
  topologicalSort: {
    id: 'topologicalSort',
    name: "Topological Sort",
    introduction: "Linear ordering of vertices such that for every directed edge uv, vertex u comes before v.",
    howItWorks: [
      'Identify nodes with 0 in-degree.',
      'Add them to the ordering and "remove" their outgoing edges.',
      'Repeat until all nodes are processed or a cycle is detected.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Task scheduling',
      'Compiler dependency resolution'
    ],
    tips: [
      'Only possible in Directed Acyclic Graphs (DAGs).',
      'Can be implemented using Kahn\'s algorithm or DFS.'
    ],
    pseudocode: `Kahn(G):
  L = Empty list
  S = Set of nodes with no incoming edges
  while S is not empty:
    u = S.pop()
    add u to L
    for neighbor v of u:
      remove edge (u, v)
      if v has no more incoming edges:
        add v to S`
  },
  floydWarshall: {
    id: 'floydWarshall',
    name: "Floyd-Warshall",
    introduction: "An all-pairs shortest path algorithm that finds shortest paths between all pairs of vertices.",
    howItWorks: [
      'Initialize a distance matrix with edge weights.',
      'For each intermediate vertex k, update distances between all pairs (i, j).',
      'If dist[i][j] > dist[i][k] + dist[k][j], update dist[i][j].'
    ],
    complexity: {
      time: 'O(V^3)',
      space: 'O(V^2)'
    },
    useCases: [
      'Finding the transitive closure of a graph',
      'Solving the all-pairs shortest path problem',
      'Network routing'
    ],
    tips: [
      'Can handle negative edge weights, but not negative cycles.',
      'Very easy to implement with triple nested loops.'
    ],
    pseudocode: `FloydWarshall(G):
  dist = matrix initialized to infinity
  for each edge (u, v): dist[u][v] = weight(u, v)
  for k from 1 to V:
    for i from 1 to V:
      for j from 1 to V:
        dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`
  },
  kosaraju: {
    id: 'kosaraju',
    name: "Kosaraju's Algorithm",
    introduction: "Finds the strongly connected components (SCCs) of a directed graph.",
    howItWorks: [
      'Perform DFS on the original graph and push nodes to a stack based on finish time.',
      'Reverse the direction of all edges in the graph.',
      'Pop nodes from the stack and perform DFS on the reversed graph to find each SCC.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V + E)'
    },
    useCases: [
      'Social network group analysis',
      'Solving 2-SAT problems',
      'Web page ranking'
    ],
    tips: [
      'Requires two passes of DFS.',
      'Effective for analyzing directed graph connectivity.'
    ],
    pseudocode: `Kosaraju(G):
  1. DFS(G) to get finishing times
  2. Create G_transpose
  3. While stack not empty:
       u = stack.pop()
       if u not visited:
         DFS(G_transpose, u) -> identifies an SCC`
  },
  tarjan: {
    id: 'tarjan',
    name: "Tarjan's Algorithm",
    introduction: "Finds SCCs in a single pass of DFS using discovery times and low-link values.",
    howItWorks: [
      'Use DFS to track discovery time and the lowest discovery time reachable (low-link).',
      'Push nodes onto a stack as they are visited.',
      'If a node\'s low-link equals its discovery time, it is the root of an SCC.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Finding bottlenecks in networks',
      'Deadlock detection in databases'
    ],
    tips: [
      'More efficient than Kosaraju as it uses only one DFS pass.',
      'Relies on discovery times and a stack.'
    ],
    pseudocode: `Tarjan(u):
  low[u] = disc[u] = ++time
  stack.push(u)
  for each neighbor v of u:
    if v not visited:
      Tarjan(v)
      low[u] = min(low[u], low[v])
    else if v in stack:
      low[u] = min(low[u], disc[v])
  if low[u] == disc[u]:
    pop from stack until u`
  },
  dsu: {
    id: 'dsu',
    name: "Disjoint Set Union",
    introduction: "A data structure that keeps track of elements partitioned into non-overlapping sets.",
    howItWorks: [
      'Maintain a parent array to represent sets as trees.',
      'Use "Find" to determine which set an element belongs to.',
      'Use "Union" to merge two sets.'
    ],
    complexity: {
      time: 'O(alpha(N))',
      space: 'O(N)'
    },
    useCases: [
      'Kruskal\'s algorithm for MST',
      'Finding connected components in an undirected graph',
      'Cycle detection in undirected graphs'
    ],
    tips: [
      'Use Path Compression and Union by Rank for near-constant time complexity.',
      'alpha(N) is the inverse Ackermann function, which grows very slowly.'
    ],
    pseudocode: `Find(i):
  if parent[i] == i: return i
  return parent[i] = Find(parent[i])

Union(i, j):
  root_i = Find(i)
  root_j = Find(j)
  if root_i != root_j:
    parent[root_i] = root_j`
  },
  cycleDetection: {
    id: 'cycleDetection',
    name: "Cycle Detection",
    introduction: "Determines if a graph contains at least one cycle.",
    howItWorks: [
      'For directed graphs, use DFS with a recursion stack (back-edges).',
      'For undirected graphs, use DFS or DSU (checking if neighbors are already visited and not the parent).'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Deadlock detection',
      'Dependency cycle checking'
    ],
    tips: [
      'In directed graphs, look for back-edges to nodes currently in the recursion stack.',
      'In undirected graphs, a cycle exists if we visit an already visited node that is not the direct parent.'
    ],
    pseudocode: `HasCycleDirected(u):
  visited[u] = true
  recStack[u] = true
  for neighbor v of u:
    if not visited[v] and HasCycleDirected(v): return true
    else if recStack[v]: return true
  recStack[u] = false
  return false`
  },
  connectedComponents: {
    id: 'connectedComponents',
    name: "Connected Components",
    introduction: "Finds all maximal subgraphs in which any two vertices are connected by paths.",
    howItWorks: [
      'Iterate through all nodes.',
      'If a node is not visited, start a BFS or DFS from it.',
      'All nodes reached in one traversal belong to the same component.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Image processing (connected component labeling)',
      'Social network community detection'
    ],
    tips: [
      'Simple application of BFS or DFS.',
      'The number of times a new traversal is started equals the number of components.'
    ],
    pseudocode: `CountComponents(G):
  count = 0
  for node in G:
    if not visited[node]:
      count++
      DFS(node)
  return count`
  },
  bidirectionalBfs: {
    id: 'bidirectionalBfs',
    name: "Bidirectional BFS",
    introduction: "Finds the shortest path between two nodes by running two simultaneous BFS searches from start and goal.",
    howItWorks: [
      'Start one BFS from the source and another from the destination.',
      'Alternate between the two searches.',
      'The search stops when the two frontiers intersect.'
    ],
    complexity: {
      time: 'O(b^(d/2))',
      space: 'O(b^(d/2))'
    },
    useCases: [
      'Search in large graphs (like the web)',
      'Social network connection paths'
    ],
    tips: [
      'Significantly faster than standard BFS in large graphs as it reduces the search space.',
      'Only applicable if the goal state is known and the graph is undirected or edges can be reversed.'
    ],
    pseudocode: `BidirectionalBFS(start, goal):
  q_start = {start}, q_goal = {goal}
  visited_start = {start}, visited_goal = {goal}
  while q_start and q_goal:
    expand(q_start, visited_start, visited_goal)
    if intersection: return path
    expand(q_goal, visited_goal, visited_start)
    if intersection: return path`
  }
};
