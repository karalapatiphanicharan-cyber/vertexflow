import React, { useEffect, useMemo, memo, useCallback, useRef, useState } from 'react';
import { Trash2, Type } from 'lucide-react';
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
import { Modal } from '../common/Modal';
import { NeoButton } from '../common/NeoButton';

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
    isWeighted,
    renameNode,
    deleteNode
  } = useGraphStore();

  const { screenToFlowPosition } = useReactFlow();

  // Modal State
  const [isWeightModalOpen, setIsWeightModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [editingEdge, setEditingEdge] = useState<RFEdge | null>(null);
  const [editingNodeId, setEditingNodeId] = useState<string | null>(null);
  const [tempWeight, setTempWeight] = useState('1');
  const [tempName, setTempName] = useState('');

  // Context Menu State
  const [menu, setMenu] = useState<{ id: string; top: number; left: number; type: 'node' | 'edge' } | null>(null);

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
    setMenu(null);
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
      setEditingEdge(edge);
      setTempWeight(edge.label as string || '1');
      setIsWeightModalOpen(true);
    } else {
      deleteEdge(edge.id);
    }
  }, [isWeighted, deleteEdge]);

  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      setMenu({
        id: node.id,
        top: event.clientY,
        left: event.clientX,
        type: 'node'
      });
    },
    [setMenu]
  );

  const onEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: RFEdge) => {
      event.preventDefault();
      setMenu({
        id: edge.id,
        top: event.clientY,
        left: event.clientX,
        type: 'edge'
      });
    },
    [setMenu]
  );

  const handleSaveWeight = () => {
    if (editingEdge) {
      updateEdgeWeight(editingEdge.id, tempWeight);
    }
    setIsWeightModalOpen(false);
    setEditingEdge(null);
  };

  const handleSaveRename = () => {
    if (editingNodeId && tempName.trim()) {
      renameNode(editingNodeId, tempName.trim());
    }
    setIsRenameModalOpen(false);
    setEditingNodeId(null);
  };

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
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
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

        {menu && (
          <div
            style={{ top: menu.top, left: menu.left }}
            className="fixed z-50 bg-white border-4 border-black shadow-brutal p-1 min-w-[150px] animate-in fade-in zoom-in-95 duration-100"
          >
            {menu.type === 'node' ? (
              <>
                <button
                  onClick={() => {
                    const node = nodes.find(n => n.id === menu.id);
                    if (node) {
                      setEditingNodeId(node.id);
                      setTempName(node.data.label as string);
                      setIsRenameModalOpen(true);
                    }
                    setMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 font-black uppercase text-[10px] hover:bg-primary-yellow transition-colors flex items-center gap-2"
                >
                  <Type size={12} /> Rename
                </button>
                <button
                  onClick={() => {
                    deleteNode(menu.id);
                    setMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 font-black uppercase text-[10px] hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    const edge = edges.find(e => e.id === menu.id);
                    if (edge) {
                      setEditingEdge(edge);
                      setTempWeight(edge.label as string || '1');
                      setIsWeightModalOpen(true);
                    }
                    setMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 font-black uppercase text-[10px] hover:bg-primary-yellow transition-colors flex items-center gap-2"
                >
                  <Type size={12} /> Edit Weight
                </button>
                <button
                  onClick={() => {
                    deleteEdge(menu.id);
                    setMenu(null);
                  }}
                  className="w-full text-left px-3 py-2 font-black uppercase text-[10px] hover:bg-red-500 hover:text-white transition-colors flex items-center gap-2"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </>
            )}
          </div>
        )}
      </ReactFlow>

      <Modal
        isOpen={isWeightModalOpen}
        onClose={() => setIsWeightModalOpen(false)}
        title="Edit Edge Weight"
        footer={
          <>
            <NeoButton variant="secondary" onClick={() => setIsWeightModalOpen(false)}>Cancel</NeoButton>
            <NeoButton variant="blue" onClick={handleSaveWeight}>Save</NeoButton>
          </>
        }
      >
        <div className="space-y-4">
          <label className="text-sm font-black uppercase">Edge Weight (Numeric or Label)</label>
          <input
            autoFocus
            type="text"
            value={tempWeight}
            onChange={(e) => setTempWeight(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveWeight()}
            className="w-full border-4 border-black p-3 font-black text-lg outline-none focus:bg-gray-50"
          />
        </div>
      </Modal>

      <Modal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        title="Rename Node"
        footer={
          <>
            <NeoButton variant="secondary" onClick={() => setIsRenameModalOpen(false)}>Cancel</NeoButton>
            <NeoButton variant="blue" onClick={handleSaveRename}>Save</NeoButton>
          </>
        }
      >
        <div className="space-y-4">
          <label className="text-sm font-black uppercase">Node Label</label>
          <input
            autoFocus
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveRename()}
            className="w-full border-4 border-black p-3 font-black text-lg outline-none focus:bg-gray-50 uppercase"
          />
        </div>
      </Modal>
    </div>
  );
};

const GraphCanvas: React.FC<GraphCanvasProps> = (props) => (
  <ReactFlowProvider>
    <GraphCanvasInternal {...props} />
  </ReactFlowProvider>
);

export default memo(GraphCanvas);
