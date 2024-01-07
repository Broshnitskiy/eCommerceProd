"use client";

import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import Link from "next/link";

function ProductCard({ product }) {
  const [isButtonClick, setIsButtonClick] = useState(false);

  const handleClick = () => {
    setIsButtonClick(true);
  };

  return (
    <Card style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <CardActionArea>
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
            Категорія: {product.category}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions
        style={{ marginTop: "auto", justifyContent: "space-between" }}
      >
        <Typography component="p" variant="h5" color="tomato">
          Ціна: {product.price}
        </Typography>
        {!isButtonClick ? (
          <Button
            variant="contained"
            size="medium"
            color="success"
            onClick={handleClick}
          >
            ПРИДБАТИ
          </Button>
        ) : (
          <Link href="/basket">
            <Button
              variant="outlined"
              size="small"
              color="success"
              onClick={handleClick}
            >
              ПЕРЕЙТИ В КОРЗИНУ
            </Button>
          </Link>
        )}
      </CardActions>
    </Card>
  );
}

export default ProductCard;
