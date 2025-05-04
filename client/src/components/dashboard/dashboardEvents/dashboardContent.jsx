import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Select, MenuItem, Divider, FormControl } from "@mui/material";
import EventCard from "./eventCard";
import axios from "axios";

const DashboardContent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hostName, setHostName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = {};
        if (hostName) params.hostName = hostName;
        if (date) params.date = date;

        const response = await axios.get("/api/manage/eventAll", { params });

        const now = new Date();

        // Filter events where date + time is in the future
        const filteredEvents = response.data.filter((event) => {
          const eventDateTime = new Date(`${event.date}T${event.time}`);
          return eventDateTime > now;
        });

        setEvents(filteredEvents);
      } catch (err) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [hostName, date]);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "black" }} align='left'>
        Dashboard
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2} alignItems='center' justifyContent='flex-end' mb={2} mt={2}>
        <Grid item xs={12} sm='auto'>
          <FormControl fullWidth>
            <Typography sx={{ fontSize: "14px", color: "black" }}>Date</Typography>
            <Select value={date} onChange={(e) => setDate(e.target.value)} displayEmpty size='small'>
              {events.map((loc, index) => (
                <MenuItem key={index} value={loc.date}>
                  {loc.date}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm='auto'>
          <FormControl fullWidth>
            <Typography sx={{ fontSize: "14px", color: "black" }}>Host</Typography>
            <Select value={hostName} onChange={(e) => setHostName(e.target.value)} displayEmpty size='small'>
              {events.map((loc, index) => (
                <MenuItem key={index} value={loc.hostName}>
                  {loc.hostName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {events?.map((event, idx) => (
        <EventCard
          title={event.eventTitle}
          date={event.date}
          time={event.time}
          location={event.location}
          host={event.hostName}
          description={event.description}
        />
      ))}
    </Box>
  );
};

export default DashboardContent;
