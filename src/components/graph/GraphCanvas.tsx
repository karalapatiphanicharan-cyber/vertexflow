import React, { useEffect, useMemo, memo, useCallback, useRef } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  Connection,
  Edge,
  MarkerType,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  useReactFlow,
  ReactFlowProvider,
  Node,
  Edge as RFEdge
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';
import NodeComponent from './NodeComponent';
import { useGraphStore } from '../../store/useGraphStore';

const nodeTypes = {
  custom: NodeComponent,
};

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  steps?: AlgorithmStep[];
  currentStepIndex?: number;
  onNodeClick?: (id: string) => void;
  fitView?: boolean;
}

const GraphCanvasInternal: React.FC<GraphCanvasProps> = ({
  nodes: inputNodes,
  edges: inputEdges,
  steps = [],
  currentStepIndex = 0,
  onNodeClick,
  fitView = true
}) => {
  const {
    interactionMode,
    addNode,
    addEdge: addStoreEdge,
    isDirected,
    setNodes: setStoreNodes,
    setEdges: setStoreEdges,
    deleteEdge,
    updateEdgeWeight,
    isWeighted
  } = useGraphStore();

  const { screenToFlowPosition } = useReactFlow();

  const displayNodes = useMemo(() => {
    if (steps.length > 0 && steps[currentStepIndex]) {
      return steps[currentStepIndex].nodes.map(n => ({
        ...n,
        type: 'custom',
        data: { ...n.data, type: n.type }
      })) as Node[];
    }
    return inputNodes.map(n => ({
      ...n,
      type: 'custom',
      data: { ...n.data, type: n.type || 'default' }
    })) as Node[];
  }, [inputNodes, steps, currentStepIndex]);

  const displayEdges = useMemo(() => {
    const baseEdges = (steps.length > 0 && steps[currentStepIndex]) ? steps[currentStepIndex].edges : inputEdges;
    const activeEdges = (steps.length > 0 && steps[currentStepIndex]) ? steps[currentStepIndex].activeEdges : new Set();

    return baseEdges.map(e => {
      const isActive = activeEdges.has(e.id);
      return {
        ...e,
        animated: e.animated || isActive,
        markerEnd: isDirected ? { type: MarkerType.ArrowClosed, color: isActive ? '#3B82F6' : '#000' } : undefined,
        style: {
          stroke: isActive ? '#3B82F6' : (e.style?.stroke || '#000'),
          strokeWidth: isActive ? 4 : (e.style?.strokeWidth || 2),
          transition: 'stroke 0.3s ease-in-out, stroke-width 0.3s ease-in-out'
        }
      };
    }) as RFEdge[];
  }, [inputEdges, steps, currentStepIndex, isDirected]);

  const [nodes, setNodes] = useNodesState(displayNodes);
  const [edges, setEdges] = useEdgesState(displayEdges);

  useEffect(() => { setNodes(displayNodes); }, [displayNodes, setNodes]);
  useEffect(() => { setEdges(displayEdges); }, [displayEdges, setEdges]);

  const onConnect = useCallback((params: Connection) => {
    if (interactionMode === 'addEdge' && params.source && params.target) {
      addStoreEdge(params.source, params.target);
    }
  }, [interactionMode, addStoreEdge]);

  const onPaneClick = useCallback((event: React.MouseEvent) => {
    if (interactionMode === 'addNode') {
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      addNode(position);
    }
  }, [interactionMode, addNode, screenToFlowPosition]);

  const onEdgeDoubleClick = useCallback((event: React.MouseEvent, edge: RFEdge) => {
    event.stopPropagation();
    if (isWeighted) {
      const weight = prompt('Enter edge weight:', edge.label as string || '1');
      if (weight !== null) {
        updateEdgeWeight(edge.id, weight);
      }
    } else {
      if (window.confirm('Delete this edge?')) {
        deleteEdge(edge.id);
      }
    }
  }, [isWeighted, updateEdgeWeight, deleteEdge]);

  const onNodesChangeInternal = useCallback((changes: NodeChange[]) => {
    const newNodes = applyNodeChanges(changes, nodes);
    setNodes(newNodes);
    if (steps.length === 0) {
      setStoreNodes(newNodes as any);
    }
  }, [nodes, steps.length, setNodes, setStoreNodes]);

  const onEdgesChangeInternal = useCallback((changes: EdgeChange[]) => {
    const newEdges = applyEdgeChanges(changes, edges);
    setEdges(newEdges);
    if (steps.length === 0) {
       setStoreEdges(newEdges as any);
    }
  }, [edges, steps.length, setEdges, setStoreEdges]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChangeInternal}
        onEdgesChange={onEdgesChangeInternal}
        onConnect={onConnect}
        onNodeClick={(_, node) => onNodeClick && onNodeClick(node.id)}
        onPaneClick={onPaneClick}
        onEdgeDoubleClick={onEdgeDoubleClick}
        nodeTypes={nodeTypes}
        fitView={fitView}
        deleteKeyCode={['Backspace', 'Delete']}
        nodesConnectable={interactionMode === 'addEdge'}
      >
        <Controls />
        <MiniMap />
        <Background gap={20} size={1} color="#000" />

        <Panel position="top-right" className="bg-white py-2 px-4 flex flex-col md:flex-row items-center gap-4 border-4 border-black shadow-brutal rounded-none">
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-white border-2 border-black"></div>
             <span className="font-black text-[10px] uppercase">Unvisited</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-primary-blue border-2 border-black"></div>
             <span className="font-black text-[10px] uppercase">Visiting</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-green-500 border-2 border-black"></div>
             <span className="font-black text-[10px] uppercase">Done</span>
          </div>
        </Panel>

        <Panel position="bottom-left" className="bg-black text-white px-3 py-1 font-black text-[10px] uppercase tracking-widest shadow-brutal border-2 border-white">
           {interactionMode === 'addNode' ? 'Click Canvas to Add Node' : (interactionMode === 'addEdge' ? 'Drag between nodes to add edge' : 'Pointer Mode')}
        </Panel>
      </ReactFlow>
    </div>
  );
};

const GraphCanvas: React.FC<GraphCanvasProps> = (props) => (
  <ReactFlowProvider>
    <GraphCanvasInternal {...props} />
  </ReactFlowProvider>
);

export default memo(GraphCanvas);
