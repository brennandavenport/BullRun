import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import SwipeLearn from "./pages/Swipe-Learn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Portfolio from "./pages/Portfolio";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";
import UserSetup from "./pages/UserSetup";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/setup" element={<UserSetup />} />
          
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

