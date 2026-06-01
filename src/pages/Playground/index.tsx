import React from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { WorkspaceLayout } from '../../layouts/WorkspaceLayout';
import GraphCanvas from '../../components/graph/GraphCanvas';
import { GraphControls } from '../../components/controls/GraphControls';
import { RightPanel } from '../../components/dashboard/RightPanel';
import { AnimationControls } from '../../components/controls/AnimationControls';
import { useGraphStore } from '../../store/useGraphStore';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { Navbar } from '../../components/common/Navbar';

const Playground: React.FC = () => {
  const { nodes, edges, steps, currentStepIndex } = useGraphStore();
  useKeyboardShortcuts();

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 overflow-hidden">
        <ReactFlowProvider>
          <WorkspaceLayout
            leftSidebar={<GraphControls />}
            canvas={
              <>
                <GraphCanvas
                  nodes={nodes}
                  edges={edges}
                  steps={steps}
                  currentStepIndex={currentStepIndex}
                />
                <AnimationControls />
              </>
            }
            rightPanel={<RightPanel />}
          />
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default Playground;
