import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NeoButton } from './NeoButton';

interface NavbarProps {
  showLogo?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showLogo = true }) => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b-4 border-black bg-white sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-4">
        {showLogo && <img src="/logo/vertexflow-logo.png" alt="VertexFlow Logo" className="h-8 md:h-10" />}
        <span className="text-xl md:text-2xl font-black uppercase tracking-tighter">VertexFlow</span>
      </Link>

      <div className="hidden lg:flex items-center gap-8 font-black uppercase text-xs tracking-widest">
        <Link to="/playground" className={`hover:text-primary-blue transition-colors ${location.pathname === '/playground' ? 'text-primary-blue' : ''}`}>Playground</Link>
        <Link to="/comparison" className={`hover:text-primary-blue transition-colors ${location.pathname === '/comparison' ? 'text-primary-blue' : ''}`}>Comparison</Link>
        <Link to="/learn" className={`hover:text-primary-blue transition-colors ${location.pathname === '/learn' ? 'text-primary-blue' : ''}`}>Learn</Link>
        <Link to="/challenges" className={`hover:text-primary-blue transition-colors ${location.pathname === '/challenges' ? 'text-primary-blue' : ''}`}>Challenges</Link>
        <Link to="/leetcode" className={`hover:text-primary-blue transition-colors ${location.pathname.startsWith('/leetcode') ? 'text-primary-blue' : ''}`}>LeetCode</Link>
      </div>

      <div>
        {isLanding ? (
          <Link to="/playground">
            <NeoButton variant="primary">Launch App</NeoButton>
          </Link>
        ) : (
          <div className="lg:hidden">
             {/* Simple mobile menu indicator or just keep it minimal */}
             <span className="font-black text-[10px] bg-black text-white px-2 py-1">MENU</span>
          </div>
        )}
      </div>
    </nav>
  );
};
