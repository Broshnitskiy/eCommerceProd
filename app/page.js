"use client";

import React, { useState } from "react";
import {
  useGetAllProductsQuery,
  useGetProductByCategoryQuery,
} from "@/redux/product/productSlice";
import { useGetAllCategoriesQuery } from "@/redux/categories/categoriesSlice";

import ProductGallery from "@/components/ProductGallery";
import SideBar from "@/components/SideBar";
import SearchInput from "@/components/SearchInput";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import toast from "react-hot-toast";

const drawerWidth = 260;
const ALL = "ALL";
const PRODUCTS_PER_PAGE = 6;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(ALL);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: allCategoriesData,
    error: allCategoriesError,
    isLoading: allCategoriesLoading,
    isError: isCategoriesError,
  } = useGetAllCategoriesQuery();

  const {
    data: allProductsData,
    error: allProductsError,
    isLoading: allProductsLoading,
    isError: isProductsError,
  } = useGetAllProductsQuery();

  const {
    data: productByCategoryData,
    error: productByCategoryError,
    isLoading: productByCategoryLoading,
    isError: isproductByCategoryError,
  } = useGetProductByCategoryQuery(
    selectedCategory !== ALL ? selectedCategory : ""
  );

  if (isCategoriesError) {
    toast.error("There was an error loading the categories");
    console.log(allCategoriesError);
  }

  if (isProductsError) {
    toast.error("There was an error loading the products");
    console.log(allProductsError);
  }

  if (isproductByCategoryError) {
    toast.error("There was an error loading the product in category");
    console.log(productByCategoryError);
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setCurrentPage(1);
    setMobileOpen(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const renderData =
    selectedCategory === ALL ? allProductsData : productByCategoryData;

  const filteredRenderData = renderData?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const paginatedData = filteredRenderData?.slice(startIndex, endIndex);

  return (
    <main style={{ paddingTop: "50px" }}>
      {allCategoriesLoading || allProductsLoading ? (
        <CircularProgress
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
          }}
        />
      ) : (
        <Box sx={{ display: "flex" }}>
          <SideBar
            categories={allCategoriesData || []}
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            onCategoryClick={handleCategoryClick}
            selectedCategory={selectedCategory}
          />

          <Box
            component="div"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar sx={{ display: { sm: "none" } }}>
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>

            <SearchInput
              searchQuery={searchQuery}
              handleSearchChange={handleSearchChange}
            />

            <ProductGallery products={paginatedData || []} />
            {productByCategoryLoading && (
              <CircularProgress
                style={{
                  position: "fixed",
                  left: "50%",
                  top: "50%",
                }}
              />
            )}
            {searchQuery && paginatedData && paginatedData.length === 0 && (
              <Typography variant="h6" noWrap component="p">
                Nothing found
              </Typography>
            )}
            {filteredRenderData && filteredRenderData.length > 6 && (
              <Pagination
                count={Math.ceil(
                  (filteredRenderData?.length || 0) / PRODUCTS_PER_PAGE
                )}
                page={currentPage}
                onChange={handlePageChange}
                sx={{ mt: 4, display: "flex", justifyContent: "center" }}
                color="primary"
              />
            )}
          </Box>
        </Box>
      )}
    </main>
  );
}
