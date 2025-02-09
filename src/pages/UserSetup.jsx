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
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
      className="signin-container"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#121212" // Dark background
    >
      <Card
        className="signin-card"
        sx={{
          width: 500,
          p: 3,
          borderRadius: 2,
          boxShadow: "0px 4px 10px rgba(0, 255, 127, 0.3)", // Soft green glow
          backgroundColor: "#1e1e1e", // Slightly lighter dark card
        }}
      >
        <CardContent>
          <Typography
            className="signin-title"
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "#c4ff68", fontWeight: "bold" }} // Light green for BullRun
          >
            Portfolio Preferences
          </Typography>
          <Typography
            className="signin-subtitle"
            variant="body1"
            align="center"
            sx={{ mb: 4, color: "#ffffff" }} // White text for contrast
          >
            Tell us about your investment preferences.
          </Typography>
          <form onSubmit={handleSubmit}>
            {/* Risk Factor */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel
                id="risk-factor-label"
                sx={{ color: "#bbbbbb" }} // Light gray label text
              >
                Risk Factor
              </InputLabel>
              <Select
                labelId="risk-factor-label"
                id="risk-factor"
                value={riskFactor}
                label="Risk Factor"
                onChange={(e) => setRiskFactor(e.target.value)}
                required
                sx={{
                  backgroundColor: "#2a2a2a", // Dark input background
                  borderRadius: "8px",
                  color: "white", // White text for input
                  "& .MuiSvgIcon-root": {
                    color: "#bbbbbb", // Light gray icon color
                  },
                }}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>

            {/* Minimum Market Cap */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel
                id="min-market-cap-label"
                sx={{ color: "#bbbbbb" }} // Light gray label text
              >
                Minimum Market Cap
              </InputLabel>
              <Select
                labelId="min-market-cap-label"
                id="min-market-cap"
                value={minMarketCap}
                label="Minimum Market Cap"
                onChange={(e) => setMinMarketCap(e.target.value)}
                required
                sx={{
                  backgroundColor: "#2a2a2a", // Dark input background
                  borderRadius: "8px",
                  color: "white", // White text for input
                  "& .MuiSvgIcon-root": {
                    color: "#bbbbbb", // Light gray icon color
                  },
                }}
              >
                <MenuItem value="0">0</MenuItem>
                <MenuItem value="50M">50M</MenuItem>
                <MenuItem value="300M">300M</MenuItem>
                <MenuItem value="2B">2B</MenuItem>
                <MenuItem value="10B">10B</MenuItem>
                <MenuItem value="200B">200B</MenuItem>
              </Select>
            </FormControl>

            {/* Time Frame */}
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel
                id="time-frame-label"
                sx={{ color: "#bbbbbb" }} // Light gray label text
              >
                Time Frame
              </InputLabel>
              <Select
                labelId="time-frame-label"
                id="time-frame"
                value={timeFrame}
                label="Time Frame"
                onChange={(e) => setTimeFrame(e.target.value)}
                required
                sx={{
                  backgroundColor: "#2a2a2a", // Dark input background
                  borderRadius: "8px",
                  color: "white", // White text for input
                  "& .MuiSvgIcon-root": {
                    color: "#bbbbbb", // Light gray icon color
                  },
                }}
              >
                <MenuItem value="Short term">Short-term</MenuItem>
                <MenuItem value="Long term">Long-term</MenuItem>
              </Select>
            </FormControl>

            {/* Sectors as Checkboxes */}
            <Typography
              variant="h6"
              sx={{ mt: 2, color: "#ffffff" }} // White text for contrast
            >
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
                      sx={{
                        color: "#c4ff68", // Light green checkbox
                        "&.Mui-checked": {
                          color: "#c4ff68", // Light green when checked
                        },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ color: "#ffffff" }}>{option.label}</Typography>
                  }
                />
              ))}
            </FormGroup>

            {/* Submit Button */}
            <Button
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
              Save Preferences
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}