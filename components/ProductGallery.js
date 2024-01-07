import React from "react";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";

function ProductGallery({ products }) {
  return (
    <Grid container spacing={2} alignItems="stretch">
      {products.map((product) => (
        <Grid container item key={product.id} xs={12} sm={6} md={4}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}

export default ProductGallery;
