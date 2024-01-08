"use client";

import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/redux/order/orderSlice";
import { order } from "@/redux/order/orderSelectors";
import toast from "react-hot-toast";

function ProductCard({ product }) {
  const router = useRouter();
  const productsInOrder = useSelector(order());
  const dispatch = useDispatch();

  const isAdded = productsInOrder.find((p) => p.id === product.id);

  const handleClick = (product) => {
    dispatch(addProduct(product));
    toast.success("Product has added to basket");
  };

  return (
    <Card style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={() => router.push(`/${product.id}`)}>
        <Box component="div" style={{ height: "400px" }}>
          <CardMedia
            component="img"
            image={product.image}
            alt={product.title}
            style={{ objectFit: "contain" }}
            height="100%"
          />
        </Box>

        <CardContent
          style={{
            flexGrow: 1,
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {product.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Category: {product.category}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions
        style={{ marginTop: "auto", justifyContent: "space-between" }}
      >
        <Typography component="p" variant="h5" color="tomato">
          Price: ${product.price}
        </Typography>
        {!isAdded ? (
          <Button
            variant="contained"
            size="medium"
            color="success"
            onClick={() => {
              handleClick(product);
            }}
          >
            BUY
          </Button>
        ) : (
          <Link href="/basket">
            <Button variant="outlined" size="small" color="success">
              GO TO BASKET
            </Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
