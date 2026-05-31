import React, { useEffect, useMemo, memo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { GraphNode, GraphEdge, AlgorithmStep } from '../../types/graph';
import NodeComponent from './NodeComponent';

const nodeTypes = {
  custom: NodeComponent,
};

interface GraphCanvasProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  steps?: AlgorithmStep[];
  currentStepIndex?: number;
  onNodesChange?: any;
  onEdgesChange?: any;
  onNodeClick?: (id: string) => void;
  fitView?: boolean;
}

const GraphCanvas: React.FC<GraphCanvasProps> = ({
  nodes: inputNodes,
  edges: inputEdges,
  steps = [],
  currentStepIndex = 0,
  onNodesChange: onNodesChangeProp,
  onEdgesChange: onEdgesChangeProp,
  onNodeClick,
  fitView = true
}) => {
  // Determine which nodes/edges to display based on current step or base state
  const displayNodes = useMemo(() => {
    if (steps.length > 0 && steps[currentStepIndex]) {
      return steps[currentStepIndex].nodes.map(n => ({
        ...n,
        type: 'custom',
        data: {
          ...n.data,
          type: n.type
        }
      }));
    }
    return inputNodes.map(n => ({
      ...n,
      type: 'custom',
      data: {
        ...n.data,
        type: n.type
      }
    }));
  }, [inputNodes, steps, currentStepIndex]);

  const displayEdges = useMemo(() => {
    if (steps.length > 0 && steps[currentStepIndex]) {
      const activeEdges = steps[currentStepIndex].activeEdges;
      return steps[currentStepIndex].edges.map(e => {
        const isActive = activeEdges.has(e.id);
        return {
          ...e,
          animated: e.animated || isActive,
          style: {
            ...e.style,
            stroke: isActive ? '#3B82F6' : (e.style?.stroke || '#000'),
            strokeWidth: isActive ? 4 : (e.style?.strokeWidth || 2),
            transition: 'stroke 0.3s ease-in-out, stroke-width 0.3s ease-in-out'
          }
        };
      });
    }
    return inputEdges;
  }, [inputEdges, steps, currentStepIndex]);

  const [nodes, setNodes, onNodesChange] = useNodesState(displayNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(displayEdges);

  // Sync state with store updates
  useEffect(() => {
    setNodes(displayNodes);
  }, [displayNodes, setNodes]);

  useEffect(() => {
    setEdges(displayEdges);
  }, [displayEdges, setEdges]);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => onNodeClick && onNodeClick(node.id)}
        nodeTypes={nodeTypes}
        fitView={fitView}
      >
        <Controls />
        <MiniMap />
        <Background gap={20} size={1} color="#000" />

        <Panel position="top-right" className="neo-brutal-card bg-white py-2 px-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-white border border-black"></div>
             <span className="font-bold text-[10px] uppercase">Unvisited</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-primary-blue border border-black"></div>
             <span className="font-bold text-[10px] uppercase">Visiting</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-[#4ADE80] border border-black"></div>
             <span className="font-bold text-[10px] uppercase">Done</span>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default memo(GraphCanvas);
