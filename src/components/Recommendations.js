import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import apiClient from "../api/axiosConfig";

const Recommendations = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRecommendations = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("JWT Token not found");
        return;
      }

      try {
        const response = await apiClient.get(`/recommendations/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Recommendations
        </Typography>
        <List>
          {recommendations.map((product) => (
            <ListItem key={product.id} alignItems="flex-start">
              <ListItemText
                primary={product.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Description: {product.description}
                    </Typography>
                    <br />
                    Price: ${product.price}
                    <br />
                    Brand: {product.brand}
                    <br />
                    Size: {product.size}
                    <br />
                    Color: {product.color}
                    <br />
                    Category: {product.category.name}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
        {message && <Typography color="error">{message}</Typography>}
      </Box>
    </Container>
  );
};

export default Recommendations;
