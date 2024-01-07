import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const drawerWidth = 260;
const ALL = "УСІ";

function SideBar({
  categories,
  mobileOpen,
  handleDrawerToggle,
  onCategoryClick,
  selectedCategory,
}) {
  const handleClick = (categoryName) => {
    onCategoryClick(categoryName);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <Typography sx={{ paddingTop: "20px" }} variant="body1" align="center">
        КАТЕГОРІЇ:
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => handleClick(ALL)}
            sx={{
              backgroundColor: selectedCategory === ALL ? "yellow" : "inherit",
            }}
          >
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={ALL} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        {categories &&
          categories.map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                onClick={() => handleClick(category)}
                sx={{
                  backgroundColor:
                    selectedCategory === category ? "yellow" : "inherit",
                }}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={category && category.toUpperCase()} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            height: "auto",
            zIndex: "0",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default SideBar;
