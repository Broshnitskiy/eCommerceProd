import React from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

function SearchInput({ searchQuery, handleSearchChange }) {
  return (
    <Box sx={{ mt: 2, mb: 2 }}>
      <TextField
        label="Search"
        type="search"
        variant="outlined"
        autoComplete="off"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

export default SearchInput;
