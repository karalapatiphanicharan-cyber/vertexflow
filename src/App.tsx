import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Playground from './pages/Playground';
import LearnPage from './pages/Learn';
import ComparisonPage from './pages/Algorithms/Comparison';
import LeetCodeMode from './pages/Algorithms/LeetCode';
import ChallengesPage from './pages/Challenges';
import IslandsVisualization from './pages/Algorithms/Islands';
import BFSChallenge from './pages/Challenges/BFSChallenge';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/learn-hub" element={<LearnPage />} />
        <Route path="/comparison" element={<ComparisonPage />} />
        <Route path="/leetcode" element={<LeetCodeMode />} />
        <Route path="/leetcode/islands" element={<IslandsVisualization />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/challenges/bfs" element={<BFSChallenge />} />
      </Routes>
    </Router>
  );
};

export default App;
