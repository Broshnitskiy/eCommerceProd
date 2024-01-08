"use client";

import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Container,
} from "@mui/material";
import { useFormik } from "formik";
import { order } from "@/redux/order/orderSelectors";
import { orderSchema } from "@/helpers/orderSchema";
import toast from "react-hot-toast";

const OrderPage = () => {
  const cartItems = useSelector(order());
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
    },
    validationSchema: orderSchema,
    onSubmit: (values, { resetForm }) => {
      const orderData = {
        ...values,
        order: cartItems,
      };
      console.log("Order submitted:", orderData);
      // Place logic to send email and handle successful order here
      // For example, you can use a service to send an email
      // and show a success message to the user.

      toast("Data sent successfully", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      resetForm();
    },
  });

  const { values, errors, touched, handleChange, handleSubmit } = formik;

  return (
    <main style={{ paddingTop: "100px", paddingBottom: "60px" }}>
      {cartItems.length > 0 ? (
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  Customer Information
                </Typography>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    label="Phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 4 }}
                  >
                    Place Order
                  </Button>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper style={{ padding: "20px" }}>
                <Typography variant="h5" gutterBottom>
                  Order Summary
                </Typography>
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <Typography>{item.title}</Typography>
                    <Typography>Price: ${item.price}</Typography>
                    <Typography>Quantity: {item.quantity}</Typography>
                    <hr />
                  </div>
                ))}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      ) : (
        <>
          <Typography variant="h4" align="center" gutterBottom>
            Order is empty
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
};

export default OrderPage;
