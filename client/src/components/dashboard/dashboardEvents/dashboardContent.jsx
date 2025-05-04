import React from "react";
import { Box, Typography, Grid, Select, MenuItem, Divider } from "@mui/material";
import EventCard from "./eventCard";

const DashboardContent = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "black" }} align='left'>
        Dashboard
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2} alignItems='center' justifyContent='flex-end' mb={2} mt={2}>
        <Grid item xs={12} sm='auto'>
          <Select size='small' displayEmpty defaultValue='' fullWidth>
            <MenuItem value=''>Date</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm='auto'>
          <Select size='small' displayEmpty defaultValue='' fullWidth>
            <MenuItem value=''>Host</MenuItem>
          </Select>
        </Grid>
      </Grid>

      <EventCard
        title='Tech Conference 2025'
        date='Apr 15, 2025 – 09.00 AM'
        location='Hatch Working Space, Colombo'
        host='Jhon Smith'
        description='Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit'
      />

      <EventCard
        title='Marketing Workshop 2025'
        date='Apr 20, 2025 – 10.00 AM'
        location='Hatch Working Space, Colombo'
        host='Jhon Smith'
        description='Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit...'
      />
    </Box>
  );
};

export default DashboardContent;
