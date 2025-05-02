import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, Typography, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { FaUser } from "react-icons/fa";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link, useLocation } from "react-router-dom";
import "./side-bar.css";
import CloseIcon from "@mui/icons-material/Close";

const expandedWidth = 255; // Full width for larger screens

const Sidebar = ({ setIsSidebarCollapsed }) => {
  const location = useLocation(); // Get the current route
  const isActive = (path) => location.pathname === path; // Check if the route matches

  return (
    <Drawer
      variant='permanent'
      anchor='left'
      sx={{
        padding: "5px",
        width: expandedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          margin: "10px",
          padding: "5px",
          width: expandedWidth,
          boxSizing: "border-box",
          backgroundColor: "rgba(255, 255, 255, 0.98)", // Slight transparency
        },
      }}
    >
      <Box p={2}>
        {window.innerWidth < 1024 && (
          <>
            <IconButton onClick={() => setIsSidebarCollapsed?.(true)}>
              <CloseIcon />
            </IconButton>
            <br />
          </>
        )}
        <img src='/images/logo.png' alt='event' className='sidebar-logo' />
      </Box>
      <List>
        <ListItem
          button
          component={Link}
          to='/dashboard'
          onClick={() => window.innerWidth < 1024 && setIsSidebarCollapsed?.(true)}
          sx={{
            backgroundColor: isActive("/dashboard") ? "#e3f2fd" : "transparent",
            color: isActive("/dashboard") ? "#1976d2" : "inherit",
          }}
        >
          <ListItemIcon>
            <DashboardIcon fontSize='small' sx={{ color: isActive("/dashboard") ? "#1976d2" : "inherit" }} />
          </ListItemIcon>
          <ListItemText primary='Dashboard' className='sidebar-text' />
        </ListItem>
        <ListItem
          button
          component={Link}
          to='/events'
          onClick={() => window.innerWidth < 1024 && setIsSidebarCollapsed?.(true)}
          sx={{
            backgroundColor: isActive("/events") ? "#e3f2fd" : "transparent",
            color: isActive("/events") ? "#1976d2" : "inherit",
          }}
        >
          <ListItemIcon>
            <VerifiedUserIcon fontSize='small' sx={{ color: isActive("/daily-logs") ? "#1976d2" : "inherit" }} />
          </ListItemIcon>
          <ListItemText primary='Events' className='sidebar-text' />
        </ListItem>
        <ListItem
          button
          component={Link}
          to='/even'
          onClick={() => window.innerWidth < 1024 && setIsSidebarCollapsed?.(true)}
          sx={{
            backgroundColor: isActive("/even") ? "#e3f2fd" : "transparent",
            color: isActive("/even") ? "#1976d2" : "inherit",
          }}
        >
          <ListItemIcon>
            <FaUser fontSize='small' sx={{ color: isActive("/daily-logs") ? "#1976d2" : "inherit" }} />
          </ListItemIcon>
          <ListItemText primary='User profile' className='sidebar-text' />
        </ListItem>
        <Typography ml={2} mt={45}></Typography>
        <ListItem
          button
          component={Link}
          to='/logout'
          onClick={() => window.innerWidth < 1024 && setIsSidebarCollapsed?.(true)}
          sx={{
            backgroundColor: isActive("/logout") ? "#e3f2fd" : "transparent",
            color: isActive("/logout") ? "#1976d2" : "inherit",
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon
              fontSize='small'
              style={{
                fontSize: "20px",
                color: isActive("/logout") ? "#1976d2" : "inherit",
              }}
            />
          </ListItemIcon>
          <ListItemText primary='Log Out' className='sidebar-text' />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
