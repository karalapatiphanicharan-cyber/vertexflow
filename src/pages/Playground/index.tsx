import React from 'react';
import { WorkspaceLayout } from '../../layouts/WorkspaceLayout';
import GraphCanvas from '../../components/graph/GraphCanvas';
import { GraphControls } from '../../components/controls/GraphControls';
import { RightPanel } from '../../components/dashboard/RightPanel';
import { AnimationControls } from '../../components/controls/AnimationControls';
import { useGraphStore } from '../../store/useGraphStore';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

const Playground: React.FC = () => {
  const { nodes, edges, steps, currentStepIndex, setNodes, setEdges } = useGraphStore();
  useKeyboardShortcuts();

  return (
    <WorkspaceLayout
      leftSidebar={<GraphControls />}
      canvas={
        <>
          <GraphCanvas
            nodes={nodes}
            edges={edges}
            steps={steps}
            currentStepIndex={currentStepIndex}
            onNodesChange={(changes: any) => {
              // React Flow handles internal state, but we might want to sync back if needed
              // For now, Playground relies on manual controls mostly
            }}
          />
          <AnimationControls />
        </>
      }
      rightPanel={<RightPanel />}
    />
  );
};

export default Playground;
