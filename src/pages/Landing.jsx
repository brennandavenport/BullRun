import { Button, Box, Typography } from "@mui/material"; // or any other UI library
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  const handleSignInClick = () => {
    // Navigate to the SignIn page
    navigate("/signin");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="background.default"
    >
      <Typography variant="h3" gutterBottom>
        Welcome to BullRun
      </Typography>
      <Button
        variant="contained"
        size="large"
        onClick={handleSignInClick}
        sx={{ mt: 3 }}
      >
        Sign In
      </Button>
    </Box>
  );
}

export default LandingPage;