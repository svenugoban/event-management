import React from "react";
import { Box, Avatar, Typography, Paper, Divider } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const EventCard = ({ date, title, location, datetime }) => (
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
        <Typography sx={{ fontSize: "14px", color: "black" }}>APR</Typography>
        <Typography variant='h6'>{date}</Typography>
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

const UserProfile = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "black" }} align='left'>
          User Profile
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Avatar src='https://randomuser.me/api/portraits/women/44.jpg' sx={{ width: 80, height: 80, mr: 3 }} />
          <Box>
            <Typography variant='h6'>Sarah Anderson</Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>@Sarahanderson</Typography>
            <Typography sx={{ fontSize: "14px", color: "black" }}>12 Events</Typography>
          </Box>
        </Box>
        <Typography sx={{ fontSize: "18px", fontWeight: "bold", color: "black" }} align='left'>
          Events User Attendending
        </Typography>
        <EventCard
          date='15'
          title='Marketing Workshop 2025'
          location='Hatch Working Space, Colombo'
          datetime='Apr 20, 2025 – 10.00 AM'
        />
        <EventCard
          date='15'
          title='Marketing Workshop 2025'
          location='Hatch Working Space, Colombo'
          datetime='Apr 20, 2025 – 10.00 AM'
        />
        <EventCard
          date='15'
          title='Marketing Workshop 2025'
          location='Hatch Working Space, Colombo'
          datetime='Apr 20, 2025 – 10.00 AM'
        />
      </Box>
    </Box>
  );
};

export default UserProfile;
