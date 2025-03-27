import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Card,  IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ChartDetailsLogo from "../assets/images/d3_png.png";
import { makeStyles } from "@mui/styles";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  logo: {
    height: "30px",
    marginBottom: "20px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 1)",
    textAlign: "center",
    marginTop: "20px",
  },
  button: {
    width: "70px",
    marginTop: "20px",
  },
  errorText: {
    marginTop: "10px",
  },
});

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility

  const validUsername = "suresh";
  const validPassword = "suresh";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Username and Password cannot be empty.");
    } else if (username === validUsername && password === validPassword) {
      localStorage.setItem("isAuth", "true");
      navigate("/charts");
      setError("");
      toast.success("Login Successfully");
    } else {
      setError("Invalid Username or Password.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <Card className={classes.card}>
          <img src={ChartDetailsLogo} alt="Logo" className={classes.logo} />
          <Typography variant="h5" color="#888888" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              size="small"
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              size="small"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {error && <Typography color="error" className={classes.errorText}>{error}</Typography>}
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Login
            </Button>
          </form>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
