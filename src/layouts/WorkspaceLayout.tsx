import React from 'react';
import { Navbar } from '../components/common/Navbar';

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
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <Navbar showLogo={true} />
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-full lg:w-80 border-b-4 lg:border-b-0 lg:border-r-4 border-black overflow-y-auto bg-gray-50 max-h-[30vh] lg:max-h-none">
          {leftSidebar}
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 relative bg-[#f8f8f8] overflow-hidden min-h-[40vh]">
          {canvas}
        </main>

        {/* Right Panel */}
        <aside className="w-full lg:w-96 border-t-4 lg:border-t-0 lg:border-l-4 border-black overflow-y-auto bg-white max-h-[30vh] lg:max-h-none">
          {rightPanel}
        </aside>
      </div>
    </div>
  );
};
