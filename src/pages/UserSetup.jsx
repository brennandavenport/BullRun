import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PortfolioPreferences() {
  const [totalInvestments, setTotalInvestments] = useState("");
  const [totalLiquidity, setTotalLiquidity] = useState("");
  const [riskFactor, setRiskFactor] = useState("medium");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Test log

    // Prepare the data in the required JSON format
    const userProfile = {
      total_investments: totalInvestments,
      total_liquidity: totalLiquidity,
      risk_factor: riskFactor,
      user: localStorage.getItem("user"), // Replace this with the actual user ID from your authentication system
    };
    console.log("Token:", localStorage.getItem("access_token"));
    try {
      // Send a POST request to your Django backend
      const response = await fetch("http://localhost:8000/matches/userprofile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`},
        body: JSON.stringify(userProfile),
      });

      if (response.ok) {
        // Redirect to the dashboard or home page
        navigate("/portfolio");
      } else {
        console.error("Failed to save user profile");
      }
    } catch (err) {
      console.error("Error saving user profile:", err);
    }
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Card sx={{ width: 500, p: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Portfolio Preferences
          </Typography>
          <Typography variant="body1" align="center" sx={{ mb: 4 }}>
            Tell us about your investment preferences.
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Total Investments */}
            <TextField
              fullWidth
              label="Total Investments"
              type="number"
              value={totalInvestments}
              onChange={(e) => setTotalInvestments(e.target.value)}
              placeholder="Enter total investments"
              margin="normal"
              required
            />

            {/* Total Liquidity */}
            <TextField
              fullWidth
              label="Total Liquidity"
              type="number"
              value={totalLiquidity}
              onChange={(e) => setTotalLiquidity(e.target.value)}
              placeholder="Enter total liquidity"
              margin="normal"
              required
            />

            {/* Risk Factor */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="risk-factor-label">Risk Factor</InputLabel>
              <Select
                labelId="risk-factor-label"
                id="risk-factor"
                value={riskFactor}
                label="Risk Factor"
                onChange={(e) => setRiskFactor(e.target.value)}
                required
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            {/* Submit Button */}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
              Save Preferences
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}