import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  // State variables for form fields
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !password2) {
      setError("Email and password are required");
      return;
    } else if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    setError("");
    console.log("Logging in with", { email, password });
    try {
      // Send a POST request to your Django backend
      const response = await fetch("http://localhost:8000/auth/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Access token:", data.data?.tokens?.access);
        localStorage.setItem("access_token", data.data.tokens.access);
        localStorage.setItem("refresh_token", data.data.tokens.refresh);
        localStorage.setItem("user", data.data.id); // Correctly access the user ID

        // Redirect to the home page or dashboard
        navigate("/setup");
      } else {
        // Handle errors from the backend
        setError(data.detail || "Invalid credentials, try again");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("An error occurred. Please try again.");
    }

    //navigate("/setup");
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ width: 400, p: 3, borderRadius: 2, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h4" align="center" gutterBottom>
              BullRun
            </Typography>
            <Typography variant="h5" align="center" gutterBottom>
              Sign In
            </Typography>
            {error && (
              <Typography color="error" align="center" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Name"
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                margin="normal"
                required
              />
              <TextField
                fullWidth
                label="Enter Password again"
                type="password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Enter your password"
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}