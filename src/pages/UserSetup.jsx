import { useState } from "react";
import {
  Box,
  Button,
  Typography,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function PortfolioPreferences() {
  // State variables for the API fields
  const [riskFactor, setRiskFactor] = useState("medium");
  const [minMarketCap, setMinMarketCap] = useState("");
  const [timeFrame, setTimeFrame] = useState("");
  const [sectors, setSectors] = useState([]);

  const navigate = useNavigate();

  const sectorOptions = [
    { value: "finance", label: "Finance" },
    { value: "tech", label: "Tech" },
    { value: "automotive", label: "Automotive" },
    { value: "materials", label: "Materials" },
    { value: "etf", label: "ETF" },
    { value: "healthcare", label: "Healthcare" },
    { value: "energy", label: "Energy" },
    // Add more options as needed
  ];

  // Handle checkbox changes for sectors
  const handleSectorChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      // Add the selected sector
      setSectors([...sectors, name]);
    } else {
      // Remove the unselected sector
      setSectors(sectors.filter((sector) => sector !== name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build the user profile JSON using the field names expected by the API.
    if (sectors.length === 0) {
        alert("Please select at least one sector.");
        return;
      }
    const userProfile = {
      total_investments: 0,
      total_liquidity: 10000,
      risk_factor: riskFactor,
      min_market_cap: minMarketCap,
      time_frame: timeFrame,
      sectors: sectors, // Include sector in the payload
      user: localStorage.getItem("user"), // Ensure this value represents an integer user ID in your system.
    };

    try {
      const response = await fetch("http://localhost:8000/matches/userprofile/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify(userProfile),
      });

      if (response.ok) {
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

            {/* Minimum Market Cap (Enum of 6 options) */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="min-market-cap-label">Minimum Market Cap</InputLabel>
              <Select
                labelId="min-market-cap-label"
                id="min-market-cap"
                value={minMarketCap}
                label="Minimum Market Cap"
                onChange={(e) => setMinMarketCap(e.target.value)}
                required
              >
                
                {/* Replace these values with the specific market cap thresholds you need */}
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="50M">50M</MenuItem>
                <MenuItem value="300M">300M</MenuItem>
                <MenuItem value="2B">2B</MenuItem>
                <MenuItem value="10B">10B</MenuItem>
                <MenuItem value="200B">200B</MenuItem>
              </Select>
            </FormControl>

            {/* Time Frame (Enum of 2 options) */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel id="time-frame-label">Time Frame</InputLabel>
              <Select
                labelId="time-frame-label"
                id="time-frame"
                value={timeFrame}
                label="Time Frame"
                onChange={(e) => setTimeFrame(e.target.value)}
                required
              >
                {/* Adjust these options as necessary */}
                <MenuItem value="Short term">Short-term</MenuItem>
                <MenuItem value="Long term">Long-term</MenuItem>
              </Select>
            </FormControl>

            {/* Sectors as Checkboxes */}
            <Typography variant="h6" sx={{ mt: 2 }}>
              Select Sectors
            </Typography>
            <FormGroup>
              {sectorOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      name={option.value}
                      checked={sectors.includes(option.value)}
                      onChange={handleSectorChange}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>

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