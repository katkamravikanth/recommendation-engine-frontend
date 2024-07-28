import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import apiClient from "../api/axiosConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiClient.post("/login", {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      setMessage("Login successful");
      navigate("/products"); // Redirect to products page after login
      window.location.reload(); // Reload to update the state in App component
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage("Error: " + error.response.data.error);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        {message && <Typography color="error">{message}</Typography>}
      </Box>
    </Container>
  );
};

export default Login;
