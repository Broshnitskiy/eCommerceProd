"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, removeProduct } from "@/redux/order/orderSlice";
import {
  Button,
  CardActions,
  IconButton,
  Typography,
  Box,
  Paper,
  Container,
  useMediaQuery,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { order } from "@/redux/order/orderSelectors";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Basket() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(order());
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleIncreaseQuantity = (itemId) => {
    dispatch(increment(itemId));
  };

  const handleDecreaseQuantity = (itemId) => {
    dispatch(decrement(itemId));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeProduct(itemId));
    toast.success("Product removed");
  };

  const handleCheckout = () => {
    router.push("/order");
  };

  return (
    <main style={{ paddingTop: "100px", paddingBottom: "60px" }}>
      {cartItems.length > 0 ? (
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Shopping Basket
          </Typography>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {cartItems.map((item) => (
              <li key={item.id} style={{ marginBottom: "20px" }}>
                <Paper elevation={3}>
                  <Box
                    sx={{
                      ...(isMobile
                        ? { flexDirection: "column", alignItems: "stretch" }
                        : { display: "flex", alignItems: "center" }),
                      padding: "10px",
                    }}
                  >
                    <Box
                      component="div"
                      sx={{
                        width: 100,
                        height: "auto",
                        marginRight: isMobile ? "auto" : "50px",
                        marginLeft: isMobile ? "auto" : "0",
                        marginTop: isMobile ? "10px" : "0",
                        marginBottom: isMobile ? "10px" : "0",
                      }}
                    >
                      <Image
                        width={100}
                        height={100}
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6">{item.title}</Typography>
                      <Typography variant="body2">
                        Price: ${item.price}
                      </Typography>

                      <CardActions>
                        <Box
                          component="div"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginRight: "40px",
                          }}
                        >
                          <IconButton
                            onClick={() => handleDecreaseQuantity(item.id)}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography
                            variant="body2"
                            sx={{ textAlign: "center" }}
                          >
                            Quantity: {item.quantity}
                          </Typography>
                          <IconButton
                            onClick={() => handleIncreaseQuantity(item.id)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>

                        <IconButton onClick={() => handleRemoveItem(item.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Box>
                  </Box>
                </Paper>
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Checkout
          </Button>
        </Container>
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Basket is empty
          </Typography>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button color="secondary" onClick={() => router.push("/")}>
              Go back to products
            </Button>
          </div>
        </>
      )}
    </main>
  );
}
