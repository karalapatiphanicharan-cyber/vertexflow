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

      <div className="hidden lg:flex items-center gap-12 font-black uppercase text-xs tracking-[0.2em]">
        <Link to="/playground" className={`hover:text-primary-blue transition-colors border-b-4 ${location.pathname === '/playground' ? 'border-primary-blue' : 'border-transparent'}`}>Playground</Link>
        <Link to="/comparison" className={`hover:text-primary-blue transition-colors border-b-4 ${location.pathname === '/comparison' ? 'border-primary-blue' : 'border-transparent'}`}>Comparison</Link>
        <Link to="/learn-hub" className={`hover:text-primary-blue transition-colors border-b-4 ${location.pathname === '/learn-hub' ? 'border-primary-blue' : 'border-transparent'}`}>Learn Hub</Link>
      </div>

      <div>
        {isLanding ? (
          <Link to="/playground">
            <NeoButton variant="primary">Get Started</NeoButton>
          </Link>
        ) : (
           <Link to="/" className="text-[10px] font-black uppercase border-b-2 border-black hover:text-primary-blue hover:border-primary-blue transition-all">
              Home
           </Link>
        )}
      </div>
    </nav>
  );
};
