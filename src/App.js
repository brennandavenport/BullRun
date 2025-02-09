import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import SwipeLearn from "./pages/SwipeLearn";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Portfolio from "./pages/Portfolio";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";
import UserSetup from "./pages/UserSetup";
import StockRecommendations from "./pages/StockRecommendations";
import Chat from "./pages/Chat";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/setup" element={<UserSetup />} />
          <Route path="/stocks" element={<StockRecommendations />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/StockRecommendations" element={<StockRecommendations />} />
          
          {/* Protected Routes */}
          <Route path="/portfolio" element={<ProtectedRoute element={<Portfolio />} />} />
          <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard />} />} />
          <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
          <Route path="/swipe-learn" element={<ProtectedRoute element={<SwipeLearn />} />} />
          {/* <Route path="/stocks" element={<ProtectedRoute element={<StockRecommendations />} />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

