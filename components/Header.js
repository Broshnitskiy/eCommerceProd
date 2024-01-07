"use client";

import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            eCommerceProd
          </Link>
        </Typography>
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "inherit",
            marginRight: "30px",
          }}
        >
          Home
        </Link>
        <Link
          href="/basket"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <IconButton color="inherit">
            <ShoppingCartIcon />
            <span
              style={{
                marginLeft: "5px",
                color: "yellowgreen",
                fontSize: "16px",
              }}
            >
              25
            </span>
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
