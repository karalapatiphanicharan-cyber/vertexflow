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
        <aside className="w-full lg:w-[320px] xl:w-[380px] border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-white z-20 h-auto lg:h-full shrink-0">
          {leftSidebar}
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 relative bg-gray-50 overflow-hidden h-[50vh] lg:h-full z-0">
          {canvas}
        </main>

        {/* Right Panel */}
        <aside className="w-full lg:w-[380px] xl:w-[450px] border-t-4 lg:border-t-0 lg:border-l-4 border-black bg-white z-20 overflow-y-auto custom-scrollbar h-auto lg:h-full shrink-0">
          {rightPanel}
        </aside>
      </div>
    </div>
  );
};
