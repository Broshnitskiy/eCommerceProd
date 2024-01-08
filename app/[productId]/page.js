"use client";

import { useGetProductByIdQuery } from "@/redux/product/productSlice";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "@/redux/order/orderSlice";
import { order } from "@/redux/order/orderSelectors";

import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

export default function Product() {
  const params = useParams();
  const router = useRouter();
  const productsInOrder = useSelector(order());
  const dispatch = useDispatch();

  const {
    data: productByIdData,
    error: productByIdError,
    isLoading: productByIdLoading,
    isError,
  } = useGetProductByIdQuery(params.productId);

  const isAdded =
    productByIdData && productsInOrder.find((p) => p.id === productByIdData.id);

  const handleClick = (product) => {
    dispatch(addProduct(product));
    toast.success("Product has added to basket");
  };

  if (productByIdLoading) {
    return (
      <main
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
          }}
        />
      </main>
    );
  }

  if (isError) {
    return (
      <main
        style={{
          paddingTop: "120px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h5" color="error">
          There was an error loading the product
        </Typography>
        <Typography variant="h5" color="error">
          {productByIdError}
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          style={{ marginTop: 10 }}
        >
          Назад
        </Button>
      </main>
    );
  }

  return (
    <main style={{ paddingTop: "120px", paddingBottom: "50px" }}>
      <Container maxWidth="md" style={{ marginTop: 20 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          style={{ marginTop: 10 }}
        >
          Назад
        </Button>
        {productByIdData && (
          <Paper
            elevation={3}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Image
              src={productByIdData.image}
              alt={productByIdData.title}
              width={250}
              height={250}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                padding: 20,
              }}
            />

            <Grid item xs={12} md={6} style={{ padding: 20 }}>
              <Typography variant="h4" style={{ marginBottom: 10 }}>
                {productByIdData.title}
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ marginBottom: 10, color: "grey" }}
              >
                Категорія: {productByIdData.category}
              </Typography>
              <Rating
                value={productByIdData.rating.rate}
                precision={0.1}
                readOnly
              />
              <Typography variant="body1" style={{ marginTop: 10 }}>
                {productByIdData.description}
              </Typography>
              <Typography variant="h5" style={{ marginTop: 20 }}>
                Ціна: $ {productByIdData.price}
              </Typography>
              {!isAdded ? (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 20 }}
                  onClick={() => {
                    handleClick(productByIdData);
                  }}
                >
                  Придбати
                </Button>
              ) : (
                <Link href="/basket">
                  <Button
                    variant="outlined"
                    size="small"
                    color="success"
                    style={{ marginTop: 20 }}
                  >
                    GO TO BASKET
                  </Button>
                </Link>
              )}
            </Grid>
          </Paper>
        )}
      </Container>
    </main>
  );
}
