import './App.css';

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from './components/Landing'
import Leaderboard from './components/Leaderboard';
import Settings from './components/Settings';
import SwipeLearn from './components/Swipe-Learn';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/swipe-learn" element={<SwipeLearn />} />
      </Routes>
    </Router>
  );
};

export default App;
