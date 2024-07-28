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

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("JWT Token not found");
        return;
      }

      try {
        const response = await apiClient.get("/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Product List
        </Typography>
        <List>
          {products.map((product) => (
            <ListItem key={product.id}>
              <ListItemText
                primary={product.name}
                secondary={`Price: $${product.price}`}
              />
            </ListItem>
          ))}
        </List>
        {message && <Typography color="error">{message}</Typography>}
      </Box>
    </Container>
  );
};

export default ProductList;
