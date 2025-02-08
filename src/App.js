import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Leaderboard from "./components/Leaderboard";
import Settings from "./components/Settings";
import SwipeLearn from "./components/Swipe-Learn";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Portfolio from "./components/Portfolio";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected Routes */}
          <Route path="/portfolio" element={<ProtectedRoute element={<Portfolio />} />} />
          <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
          <Route path="/swipe-learn" element={<ProtectedRoute element={<SwipeLearn />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

