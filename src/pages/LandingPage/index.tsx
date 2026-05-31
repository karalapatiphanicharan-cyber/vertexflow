import React from 'react';
import { Navbar } from '../../components/common/Navbar';
import { Hero } from './Hero';
import { Features } from './Features';
import { SupportedAlgorithms } from './SupportedAlgorithms';
import { RealWorldApps } from './RealWorldApps';
import { FAQ } from './FAQ';
import { Footer } from '../../components/common/Footer';
import { ProductScreenshots } from './ProductScreenshots';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <SupportedAlgorithms />
      <ProductScreenshots />
      <RealWorldApps />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
