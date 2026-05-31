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
  },
  bellmanFord: {
    id: 'bellmanFord',
    name: 'Bellman-Ford Algorithm',
    introduction: 'Bellman-Ford computes shortest paths from a single source vertex to all other vertices in a weighted digraph.',
    whyItExists: 'Unlike Dijkstra, Bellman-Ford can handle graphs with negative edge weights and is capable of detecting negative weight cycles.',
    howItWorks: [
      'Initialize distances from source to all vertices as infinity and source to itself as 0.',
      'Relax all edges |V| - 1 times.',
      'Check for negative-weight cycles by relaxing edges one more time.'
    ],
    complexity: {
      time: 'O(V * E)',
      space: 'O(V)'
    },
    useCases: [
      'Distance Vector routing protocols (RIP)',
      'Detecting negative cycles in financial arbitrage',
      'Graphs with negative edge weights'
    ],
    whenToUse: 'When the graph contains negative weights or you need to detect negative cycles.',
    whenNotToUse: 'If all weights are non-negative, Dijkstra is much faster.',
    commonMistakes: [
      'Not relaxing edges exactly V-1 times.',
      'Forgetting the final check for negative cycles.'
    ],
    tips: [
      'Useful for finding negative cycles.',
      'Simple but slower than Dijkstra.',
      'Base of the RIP network protocol.'
    ],
    pseudocode: `BellmanFord(G, start):
  dist[start] = 0
  for i from 1 to |V|-1:
    for each edge (u, v) with weight w:
      if dist[u] + w < dist[v]:
        dist[v] = dist[u] + w
  for each edge (u, v) with weight w:
    if dist[u] + w < dist[v]:
      return "Negative cycle detected"`
  },
  floydWarshall: {
    id: 'floydWarshall',
    name: 'Floyd-Warshall Algorithm',
    introduction: 'Floyd-Warshall is an algorithm for finding shortest paths in a weighted graph with positive or negative edge weights (but no negative cycles).',
    whyItExists: 'It finds the shortest paths between all pairs of vertices in a single execution, which is more efficient than running Dijkstra for every node.',
    howItWorks: [
      'Initialize a distance matrix with edge weights.',
      'Iterate through each vertex k as an intermediate node.',
      'For each pair (i, j), check if path through k is shorter than current path.'
    ],
    complexity: {
      time: 'O(V^3)',
      space: 'O(V^2)'
    },
    useCases: [
      'Finding all-pairs shortest paths',
      'Transitive closure of a graph',
      'Finding the diameter of a graph'
    ],
    whenToUse: 'When the graph is small and you need the shortest path between all pairs of nodes.',
    whenNotToUse: 'On large graphs where V > 500, due to the O(V^3) complexity.',
    commonMistakes: [
      'Using the wrong loop order (k must be the outermost loop).',
      'Not initializing the diagonal to zero.'
    ],
    tips: [
      'Uses dynamic programming.',
      'Works with negative weights.',
      'Excellent for dense graphs.'
    ],
    pseudocode: `FloydWarshall(G):
  dist = |V|x|V| matrix initialized to infinity
  for each vertex v: dist[v][v] = 0
  for each edge (u, v) with weight w: dist[u][v] = w
  for k from 1 to |V|:
    for i from 1 to |V|:
      for j from 1 to |V|:
        if dist[i][j] > dist[i][k] + dist[k][j]:
          dist[i][j] = dist[i][k] + dist[k][j]`
  },
  astar: {
    id: 'astar',
    name: 'A* Search',
    introduction: 'A* is a graph traversal and path search algorithm, which is often used in computer science due to its completeness, optimality, and efficiency.',
    whyItExists: 'It improves upon Dijkstra by using heuristics to guide the search towards the target, significantly reducing the number of nodes explored.',
    howItWorks: [
      'Maintain an open set of nodes to be explored.',
      'For each node, calculate f(n) = g(n) + h(n), where g is cost from start and h is heuristic to goal.',
      'Always expand the node with the lowest f(n) value.'
    ],
    complexity: {
      time: 'O(E) in best case, depends on heuristic',
      space: 'O(V)'
    },
    useCases: [
      'Video game pathfinding',
      'Maps and navigation',
      'Robotics'
    ],
    whenToUse: 'When you have a clear goal node and a heuristic function (like Euclidean distance) to estimate the distance to that goal.',
    whenNotToUse: 'If there is no good heuristic or if you need the shortest path to all nodes, not just one specific target.',
    commonMistakes: [
      'Using an "inadmissible" heuristic that overestimates the distance (makes the path non-optimal).',
      'Not updating the g(n) value when a better path is found.'
    ],
    tips: [
      'Heuristic selection is critical.',
      'Dijkstra is actually A* with h(n) = 0.',
      'Commonly used in AI.'
    ],
    pseudocode: `AStar(start, goal, h):
  openSet = {start}
  fScore[start] = h(start)
  while openSet not empty:
    current = node in openSet with lowest fScore
    if current == goal: return path
    openSet.remove(current)
    for each neighbor of current:
      tentative_gScore = gScore[current] + d(current, neighbor)
      if tentative_gScore < gScore[neighbor]:
        gScore[neighbor] = tentative_gScore
        fScore[neighbor] = gScore[neighbor] + h(neighbor)
        if neighbor not in openSet: openSet.add(neighbor)`
  },
  prim: {
    id: 'prim',
    name: "Prim's Algorithm",
    introduction: "Prim's is a greedy algorithm that finds a minimum spanning tree for a weighted undirected graph.",
    whyItExists: "It finds the minimum set of edges that connects all vertices together with the minimum total weight, which is essential for network design.",
    howItWorks: [
      'Start with an arbitrary node.',
      'Repeatedly add the minimum weight edge that connects a vertex in the tree to a vertex outside the tree.',
      'Continue until all vertices are in the tree.'
    ],
    complexity: {
      time: 'O(E log V)',
      space: 'O(V)'
    },
    useCases: [
      'Designing telecommunication networks',
      'Laying out electrical grids',
      'Approximating the Traveling Salesperson Problem'
    ],
    whenToUse: 'When you have a dense graph and need to find the Minimum Spanning Tree (MST).',
    whenNotToUse: 'On sparse graphs, Kruskal\'s algorithm might be slightly simpler to implement or faster depending on edge sorting.',
    commonMistakes: [
      'Using it on directed graphs (it\'s designed for undirected).',
      'Not using a priority queue for efficiency.'
    ],
    tips: [
      'Always yields a single connected component.',
      'Grows the tree from a starting point.',
      'Best for dense graphs.'
    ],
    pseudocode: `Prim(G):
  dist[v] = infinity for all v
  parent[v] = null
  PQ.push(start, 0)
  while PQ not empty:
    u = PQ.pop_min()
    inMST[u] = true
    for each neighbor v of u:
      if not inMST[v] and weight(u,v) < dist[v]:
        dist[v] = weight(u,v)
        parent[v] = u
        PQ.push(v, dist[v])`
  },
  kruskal: {
    id: 'kruskal',
    name: "Kruskal's Algorithm",
    introduction: "Kruskal's is a minimum spanning tree algorithm that finds an edge of the least possible weight that connects any two trees in the forest.",
    whyItExists: "It's an alternative to Prim's that is often easier to implement on sparse graphs and naturally handles disconnected components by creating a Minimum Spanning Forest.",
    howItWorks: [
      'Sort all edges by weight.',
      'Initialize a Disjoint Set Union (DSU) to keep track of connected components.',
      'For each edge, if it doesn\'t form a cycle, add it to the MST.'
    ],
    complexity: {
      time: 'O(E log E) or O(E log V)',
      space: 'O(V)'
    },
    useCases: [
      'LAN network design',
      'Cluster analysis',
      'Image segmentation'
    ],
    whenToUse: 'When the graph is sparse or when you want an algorithm that is easy to implement using DSU.',
    whenNotToUse: 'On very dense graphs where E ≈ V^2, Prim\'s might be more efficient.',
    commonMistakes: [
      'Forgetting to sort the edges first.',
      'Not using a cycle detection mechanism (like DSU).'
    ],
    tips: [
      'Uses the Greedy strategy.',
      'Relies on DSU (Disjoint Set Union).',
      'Can work on disconnected graphs.'
    ],
    pseudocode: `Kruskal(G):
  MST = {}
  for each vertex v: MakeSet(v)
  sort edges by weight
  for each edge (u, v) in sorted edges:
    if Find(u) != Find(v):
      MST.add(edge(u, v))
      Union(u, v)
  return MST`
  },
  topologicalSort: {
    id: 'topologicalSort',
    name: 'Topological Sort',
    introduction: 'Topological sort of a directed graph is a linear ordering of its vertices such that for every directed edge uv from vertex u to vertex v, u comes before v in the ordering.',
    whyItExists: 'It is essential for scheduling tasks with dependencies, such as compiling code or planning a sequence of college courses.',
    howItWorks: [
      'Identify all nodes with zero in-degree.',
      'Add these nodes to a queue and a result list.',
      'Remove their outgoing edges, potentially creating new zero in-degree nodes.',
      'Repeat until all nodes are processed.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Course scheduling',
      'Build systems (e.g. Make, Bazel)',
      'Dependency resolution in package managers'
    ],
    whenToUse: 'When you have a Directed Acyclic Graph (DAG) and need to find a valid sequence of tasks.',
    whenNotToUse: 'If the graph has a cycle, a topological sort is impossible.',
    commonMistakes: [
      'Applying it to a graph with cycles without checking first.',
      'Forgetting that a graph can have multiple valid topological sorts.'
    ],
    tips: [
      'Only works on DAGs.',
      'Can be implemented using DFS or Kahn\'s Algorithm.',
      'Detection of a cycle is a byproduct of Kahn\'s.'
    ],
    pseudocode: `TopologicalSort(G):
  compute in-degree for all nodes
  Q = queue of nodes with in-degree 0
  while Q not empty:
    u = Q.dequeue()
    add u to result
    for each neighbor v of u:
      in-degree[v]--
      if in-degree[v] == 0: Q.enqueue(v)`
  },
  kosaraju: {
    id: 'kosaraju',
    name: "Kosaraju's Algorithm",
    introduction: "Kosaraju's is a linear time algorithm to find the strongly connected components of a directed graph.",
    whyItExists: "It identifies groups of nodes where every node is reachable from every other node in the same group, which is key for understanding network structure.",
    howItWorks: [
      'Perform a DFS and push nodes onto a stack based on finish time.',
      'Transpose the graph (reverse all edges).',
      'Pop nodes from the stack and perform a second DFS on the transposed graph.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Social network community detection',
      'Optimizing compilers',
      'Analyzing ecological food webs'
    ],
    whenToUse: 'When you need to find Strongly Connected Components (SCCs) and prefer a conceptual two-pass DFS approach.',
    whenNotToUse: 'If you want to find SCCs in a single pass, Tarjan\'s algorithm is usually preferred.',
    commonMistakes: [
      'Forgetting to transpose the graph.',
      'Using the wrong order when popping from the stack in the second pass.'
    ],
    tips: [
      'Two-pass DFS algorithm.',
      'Requires graph transposition.',
      'Conceptually simpler than Tarjan\'s.'
    ],
    pseudocode: `Kosaraju(G):
  1. DFS(G) to get finishing times (stack)
  2. G_T = Transpose(G)
  3. while stack not empty:
       u = stack.pop()
       if u not visited:
         DFS(G_T, u) -> forms an SCC`
  },
  tarjan: {
    id: 'tarjan',
    name: "Tarjan's Algorithm",
    introduction: "Tarjan's algorithm is an algorithm in graph theory for finding the strongly connected components of a directed graph.",
    whyItExists: "It is more efficient than Kosaraju's because it finds all SCCs in a single DFS pass by keeping track of the 'low link' values of nodes.",
    howItWorks: [
      'Perform a DFS and assign an index and low-link value to each node.',
      'Push nodes onto a stack.',
      'If a node\'s low-link equals its index, pop nodes from the stack until the current node is reached; these form an SCC.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Cycle detection in complex systems',
      'Software dependency analysis',
      'Solving 2-SAT problems'
    ],
    whenToUse: 'When you need an efficient, single-pass algorithm to find SCCs.',
    whenNotToUse: 'It can be more difficult to implement correctly than Kosaraju\'s due to the low-link logic.',
    commonMistakes: [
      'Not updating the low-link value correctly during the DFS.',
      'Incorrectly handling nodes that are already part of an SCC.'
    ],
    tips: [
      'Single-pass DFS.',
      'Uses a stack and "low-link" values.',
      'More complex but slightly more efficient.'
    ],
    pseudocode: `Tarjan(u):
  index[u] = lowlink[u] = time++
  stack.push(u)
  onStack[u] = true
  for each neighbor v of u:
    if index[v] is undefined:
      Tarjan(v)
      lowlink[u] = min(lowlink[u], lowlink[v])
    else if onStack[v]:
      lowlink[u] = min(lowlink[u], index[v])
  if lowlink[u] == index[u]:
    pop from stack until u is reached`
  },
  connectedComponents: {
    id: 'connectedComponents',
    name: 'Connected Components',
    introduction: 'In graph theory, a connected component of an undirected graph is a subgraph in which any two vertices are connected to each other by paths.',
    whyItExists: 'It helps in understanding the reachability and partition of nodes in an undirected network.',
    howItWorks: [
      'Iterate through all nodes of the graph.',
      'For each unvisited node, start a BFS or DFS.',
      'All nodes reached in one traversal belong to the same component.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Image processing (blob extraction)',
      'Social network partitions',
      'Checking if a graph is a tree'
    ],
    whenToUse: 'When you need to know if all parts of an undirected graph are reachable from each other.',
    whenNotToUse: 'Not directly applicable to directed graphs (use SCC algorithms like Tarjan\'s instead).',
    commonMistakes: [
      'Forgetting to check every node (some components might be isolated).',
      'Confusing it with Strongly Connected Components.'
    ],
    tips: [
      'Uses repeated BFS or DFS.',
      'Only for undirected graphs.',
      'Simple and effective.'
    ],
    pseudocode: `ConnectedComponents(G):
  visited = {false...}
  count = 0
  for each vertex v:
    if not visited[v]:
      count++
      DFS(v, count)
  return count`
  },
  dsu: {
    id: 'dsu',
    name: 'Disjoint Set Union (DSU)',
    introduction: 'DSU is a data structure that keeps track of a set of elements partitioned into a number of disjoint (non-overlapping) subsets.',
    whyItExists: 'It provides near-constant time operations to merge sets and find if two elements belong to the same set, which is crucial for algorithms like Kruskal\'s.',
    howItWorks: [
      'Each element starts in its own set.',
      'Union: Merge two sets together.',
      'Find: Determine which set an element belongs to (using path compression).'
    ],
    complexity: {
      time: 'O(α(N)) per operation (α is the inverse Ackermann function)',
      space: 'O(N)'
    },
    useCases: [
      'Kruskal\'s MST algorithm',
      'Cycle detection in undirected graphs',
      'Dynamic connectivity problems'
    ],
    whenToUse: 'When you need to maintain connected components in a graph as edges are added dynamically.',
    whenNotToUse: 'If edges are being removed, DSU becomes much more complex.',
    commonMistakes: [
      'Forgetting to use path compression (makes it O(log N) or O(N)).',
      'Not envolving union by rank or size.'
    ],
    tips: [
      'Extremely efficient.',
      'Path Compression is key.',
      'Union by Rank keeps trees flat.'
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
    name: 'Cycle Detection',
    introduction: 'Cycle detection is the algorithmic problem of finding a cycle in a graph.',
    whyItExists: 'Cycles can cause infinite loops in algorithms and indicate dependencies that cannot be resolved, making detection vital for system stability.',
    howItWorks: [
      'For Directed: Use DFS and keep track of nodes in the current recursion stack.',
      'For Undirected: Use DFS or DSU and check if a neighbor is already visited and not the parent.'
    ],
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    },
    useCases: [
      'Detecting deadlocks in operating systems',
      'Package dependency resolution',
      'Checking if a graph is a tree'
    ],
    whenToUse: 'When you need to ensure a graph is a DAG (Directed Acyclic Graph) or a tree.',
    whenNotToUse: 'If you already know the graph is cyclic and just need to traverse it.',
    commonMistakes: [
      'Using the undirected detection method on a directed graph (incorrect).',
      'Forgetting the "parent" check in undirected graphs.'
    ],
    tips: [
      'Directed needs recursion stack tracking.',
      'Undirected can use DSU.',
      'Critical for deadlock detection.'
    ],
    pseudocode: `HasCycleDirected(u, visited, stack):
  visited[u] = true
  stack[u] = true
  for neighbor v of u:
    if not visited[v]:
      if HasCycleDirected(v) return true
    else if stack[v] return true
  stack[u] = false
  return false`
  },
  bidirectionalBfs: {
    id: 'bidirectionalBfs',
    name: 'Bidirectional BFS',
    introduction: 'Bidirectional BFS is a graph search algorithm that finds the shortest path from a start node to a goal node by running two simultaneous searches.',
    whyItExists: 'It significantly reduces the number of nodes explored in large graphs by searching from both ends and meeting in the middle.',
    howItWorks: [
      'Start one BFS from the start node and another from the goal node.',
      'At each step, expand the smaller of the two frontiers.',
      'Stop when the two searches meet at a common node.'
    ],
    complexity: {
      time: 'O(b^(d/2)) where b is branching factor and d is distance',
      space: 'O(b^(d/2))'
    },
    useCases: [
      'Finding paths in social networks',
      'Solving puzzles like Rubik\'s cube',
      'Route planning in large maps'
    ],
    whenToUse: 'When you have a single source and a single destination and want a faster search than standard BFS.',
    whenNotToUse: 'When you don\'t know the destination node or when the graph is directed and edges only flow one way.',
    commonMistakes: [
      'Not checking if the frontiers meet at every step.',
      'Incorrectly handling the reverse edges in a directed graph.'
    ],
    tips: [
      'Much faster for large distances.',
      'Requires knowledge of the target node.',
      'Saves exponential amount of work.'
    ],
    pseudocode: `BidirectionalBFS(start, goal):
  q_start = {start}, q_goal = {goal}
  visited_start = {start}, visited_goal = {goal}
  while q_start and q_goal:
    expand(q_start, visited_start, visited_goal)
    if meeting found: return path
    expand(q_goal, visited_goal, visited_start)
    if meeting found: return path`
  }
};
