import React from 'react';

interface WorkspaceLayoutProps {
  leftSidebar: React.ReactNode;
  canvas: React.ReactNode;
  rightPanel: React.ReactNode;
}

export const WorkspaceLayout: React.FC<WorkspaceLayoutProps> = ({
  leftSidebar,
  canvas,
  rightPanel
}) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-white selection:bg-primary-yellow selection:text-black">
      <div className="flex-1 flex overflow-hidden flex-col lg:flex-row">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-80 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white z-20 h-auto lg:h-full">
          {leftSidebar}
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 relative bg-gray-50 overflow-hidden h-[50vh] lg:h-full">
          {canvas}
        </main>

        {/* Right Panel */}
        <aside className="w-full lg:w-[400px] border-t-4 lg:border-t-0 lg:border-l-4 border-black bg-white z-20 overflow-y-auto custom-scrollbar h-auto lg:h-full">
          {rightPanel}
        </aside>
      </div>
    </div>
  );
};
