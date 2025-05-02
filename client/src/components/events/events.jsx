import React from "react";
import { Box, Typography, Button, Grid, MenuItem, Card, CardContent, Select } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";

const mockEvents = [
  {
    title: "Marketing Workshop 2025",
    date: "Apr 20, 2025 - 10.00 AM",
    location: "Hatch Working Space, Colombo",
    host: "Jhon Smith",
    attendees: 48,
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat.",
  },
  {
    title: "Marketing Workshop 2025",
    date: "Apr 20, 2025 - 10.00 AM",
    location: "Hatch Working Space, Colombo",
    host: "Jhon Smith",
    attendees: 48,
    description:
      "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit, Sed Do Eiusmod Tempor Incididunt Ut Labore Et Dolore Magna Aliqua. Ut Enim Ad Minim Veniam, Quis Nostrud Exercitation Ullamco Laboris Nisi Ut Aliquip Ex Ea Commodo Consequat.",
  },
];

const EventsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "black" }} align='left'>
        Events
      </Typography>

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
        <Grid item xs={12} sm='auto'>
          {" "}
          <Button variant='contained'>+ Create Event</Button>
        </Grid>
      </Grid>

      <Grid container spacing={2} mt={2}>
        {mockEvents.map((event, idx) => (
          <Grid item sm={12} lg={6} key={idx}>
            <Card>
              <Box position='relative' mb={4}>
                <Button
                  size='small'
                  variant='contained'
                  color='success'
                  sx={{ position: "absolute", top: 10, right: 10 }}
                >
                  Register Now
                </Button>
              </Box>
              <CardContent>
                <Typography fontWeight='bold'>{event.title}</Typography>
                <Box display='flex' alignItems='center' mt={1}>
                  <CalendarTodayIcon fontSize='small' sx={{ mr: 1 }} />
                  <Typography sx={{ fontSize: "14px", color: "black" }}>{event.date}</Typography>
                </Box>
                <Box display='flex' alignItems='center' mt={1}>
                  <LocationOnIcon fontSize='small' sx={{ mr: 1 }} />
                  <Typography sx={{ fontSize: "14px", color: "black" }}>{event.location}</Typography>
                </Box>
                <Box display='flex' alignItems='center' mt={1}>
                  <PersonIcon fontSize='small' sx={{ mr: 1 }} />
                  <Typography sx={{ fontSize: "14px", color: "black" }}>Hosted By {event.host}</Typography>
                </Box>
                <Box display='flex' alignItems='center' mt={1}>
                  <DescriptionIcon fontSize='small' sx={{ mr: 1 }} />
                  <Typography sx={{ fontSize: "14px", color: "black" }} fontWeight='bold'>
                    About Event
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: "14px", color: "black" }} mt={1}>
                  {event.description}
                </Typography>
                <Box display='flex' alignItems='center' mt={2}>
                  <PeopleIcon fontSize='small' sx={{ mr: 1 }} />
                  <Typography sx={{ fontSize: "14px", color: "black" }}>Attendees ({event.attendees})</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default EventsPage;
