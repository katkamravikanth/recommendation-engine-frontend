import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import Recommendations from "./components/Recommendations";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token to a boolean
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Recommendation Engine
            </Typography>
            {!isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/products">
                  Products
                </Button>
                <Button color="inherit" component={Link} to="/recommendations">
                  Recommendations
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        <Box mt={2}>
          <Routes>
            <Route
              path="/register"
              element={
                !isAuthenticated ? <Register /> : <Navigate to="/products" />
              }
            />
            <Route
              path="/login"
              element={
                !isAuthenticated ? <Login /> : <Navigate to="/products" />
              }
            />
            <Route
              path="/products"
              element={
                isAuthenticated ? <ProductList /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/recommendations"
              element={
                isAuthenticated ? (
                  <Recommendations userId={1} />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </Box>
      </div>
    </Router>
  );
};

export default App;
