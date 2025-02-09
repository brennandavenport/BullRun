import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState(""); // Renamed confirmPassword to password2 for consistency
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !password2 || !name) {
      setError("All fields are required");
      return;
    }
    
    if (password !== password2) {
      setError("Passwords do not match");
      return;
    }

    setError(""); // Reset error state
    
    console.log("Logging in with", {name, email, password });
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
        setError(data.detail || "Registration failed, try again");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("An error occurred. Please try again.");
    }
  };

  const handleSignInClick = () => {
    // Redirect to the SignIn page
    navigate("/signin");
  };

  return (
    <Box
      className="signup-container"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#121212" // Dark background
    >
      <Card
        className="signup-card"
        sx={{
          width: 400,
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 255, 127, 0.3)", // Soft green glow
          backgroundColor: "#1e1e1e", // Slightly lighter dark card
        }}
      >
        <CardContent>
          <Typography
            className="signup-title"
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#c4ff68", fontWeight: "bold" }} // Light green for BullRun
          >
            BullRun
          </Typography>
          <Typography
            className="signup-subtitle"
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "#ffffff" }} // White text for contrast
          >
            Sign Up
          </Typography>
          {error && (
            <Typography
              className="signup-error"
              color="error"
              align="center"
              sx={{ mb: 2, color: "#ff4c4c" }} // Red error message
            >
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              className="signup-input"
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              margin="normal"
              required
              sx={{
                backgroundColor: "#2a2a2a", // Dark input background
                borderRadius: "8px",
                "& .MuiInputBase-input": {
                  color: "white", // White text for input
                },
                "& .MuiInputLabel-root": {
                  color: "#bbbbbb", // Light gray label text
                },
              }}
            />
            <TextField
              className="signup-input"
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              margin="normal"
              required
              sx={{
                backgroundColor: "#2a2a2a", // Dark input background
                borderRadius: "8px",
                "& .MuiInputBase-input": {
                  color: "white", // White text for input
                },
                "& .MuiInputLabel-root": {
                  color: "#bbbbbb", // Light gray label text
                },
              }}
            />
            <TextField
              className="signup-input"
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              margin="normal"
              required
              sx={{
                backgroundColor: "#2a2a2a", // Dark input background
                borderRadius: "8px",
                "& .MuiInputBase-input": {
                  color: "white", // White text for input
                },
                "& .MuiInputLabel-root": {
                  color: "#bbbbbb", // Light gray label text
                },
              }}
            />
            <TextField
              className="signup-input"
              fullWidth
              label="Confirm Password"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm your password"
              margin="normal"
              required
              sx={{
                backgroundColor: "#2a2a2a", // Dark input background
                borderRadius: "8px",
                "& .MuiInputBase-input": {
                  color: "white", // White text for input
                },
                "& .MuiInputLabel-root": {
                  color: "#bbbbbb", // Light gray label text
                },
              }}
            />
            <Button
              className="signup-button"
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#c4ff68", // Light green button
                color: "#121212", // Dark text
                fontWeight: "bold",
                borderRadius: "8px",
                height: "50px",
                "&:hover": {
                  backgroundColor: "#00cc66", // Slightly darker green on hover
                },
              }}
            >
              Sign Up
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleSignInClick}
              sx={{
                height: "50px",
                color: "#c4ff68", // Light green text
                borderColor: "#00ff7f", // Light green border
                "&:hover": {
                  borderColor: "#00cc66", // Slightly darker green on hover
                },
              }}
            >
              Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
