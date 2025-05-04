import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const AttendEventCard = ({ date, title, location, datetime, month }) => (
  <Paper sx={{ p: 2, display: "flex", justifyContent: "space-between", mb: 2 }}>
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          backgroundColor: "#f0f0f0",
          borderRadius: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mr: 2,
        }}
      >
        <Typography sx={{ fontSize: "14px", color: "black" }}>{month}</Typography>
        <Typography sx={{ fontSize: "14px", color: "black" }}>{date}</Typography>
      </Box>
      <Box>
        <Typography sx={{ fontSize: "14px", color: "black", fontWeight: "bold" }}>{title}</Typography>
        <Typography sx={{ fontSize: "14px", color: "black", display: "flex", alignItems: "center" }}>
          <LocationOnIcon sx={{ fontSize: 16, mr: 0.5 }} /> {location}
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "black", display: "flex", alignItems: "center" }}>
          <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5 }} /> {datetime}
        </Typography>
      </Box>
    </Box>
  </Paper>
);

export default AttendEventCard;
