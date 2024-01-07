import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function Footer() {
  return (
    <footer
      style={{ marginTop: "auto", backgroundColor: "#f4f4f4", padding: "20px" }}
    >
      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary" align="center">
          © {new Date().getFullYear()} Your eCommerce Store. All rights
          reserved.
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          style={{ marginTop: "10px" }}
        >
          Address: 123 Main St, City, Country
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          style={{ marginTop: "10px" }}
        >
          Email: info@example.com | Phone: +1 (123) 456-7890
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
