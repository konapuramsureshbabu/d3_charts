import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Container, Box, Card, CardContent } from "@mui/material";
import ChartDetailsLogo from "../assets/images/chartDetail-logo.png";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  logo: {
    height: "30px",
    marginBottom: "20px", // Added margin for space between logo and title
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",  // Align card content in the center
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Card shadow
    textAlign: "center", // Center the text inside the card
    marginTop: "50px", // Ensure card has space from the top of the page
  },
  button: {
    width: "70px", // Set button width to 70px
    marginTop: "20px", // Add margin on top of the button
  },
  errorText: {
    marginTop: "10px", // Space between error and other elements
  }
});

const Login = () => {
  const classes = useStyles();
  const navigate=useNavigate();
  // State to manage form values
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Static username and password
  const validUsername = "suresh";
  const validPassword = "suresh";

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation (this can be customized)
    if (username === "" || password === "") {
      setError("Username and Password cannot be empty.");
    } else if (username === validUsername && password === validPassword) {
        localStorage.setItem("isAuth","true")
        navigate("/charts")
      // If the username and password match the static values, login is successful
      setError(""); // Reset any previous errors
      toast.success("Login Sucessfully"); // You can replace this with your redirect or actual login logic
    } else {
      // Show error if credentials don't match
      setError("Invalid Username or Password.");
    }
  };


  return (
    <Container maxWidth="xs">
      {/* Main Box to center content */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Card className={classes.card}>
          {/* Logo */}
          <img src={ChartDetailsLogo} alt="Logo" className={classes.logo} />

          {/* Title */}
          <Typography variant="h5" color="#888888" gutterBottom>
            Login
          </Typography>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <TextField
              size="small"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password Input */}
            <TextField
              size="small"
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Error Message */}
            {error && <Typography color="error" className={classes.errorText}>{error}</Typography>}

            {/* Login Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Login
            </Button>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
