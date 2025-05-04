import React, { useEffect, useState } from "react";
import { Box, Avatar, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import AttendEventCard from "./attendEventsCard";

const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/manage/eventAll");

        const filteredEvents = response.data.filter((event) =>
          event.attendees?.some((attendee) => attendee.username === user.username)
        );

        setEvents(filteredEvents);
      } catch (err) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user.username]);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "black" }} align='left'>
        User Profile
      </Typography>
      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <Avatar alt='Profile' src='/images/person.png' sx={{ width: 80, height: 80, mr: 3 }} />
        <Box>
          <Typography variant='h6'>{user.username}</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{user.email}</Typography>
          <Typography sx={{ fontSize: "14px", color: "black" }}>{events?.length} Events</Typography>
        </Box>
      </Box>
      <Typography sx={{ fontSize: "18px", fontWeight: "bold", color: "black" }} align='left'>
        Events User Attendending
      </Typography>
      <Box mt={1}>
        {events.map((event, idx) => (
          <AttendEventCard
            date={new Date(event.date).getDate()}
            title={event.eventTitle}
            location={event.location}
            datetime={
              <>
                {new Date(event.date).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                })}{" "}
                {event.time}
              </>
            }
            month={new Date(event.date).toLocaleString("default", { month: "long" })}
          />
        ))}
      </Box>
    </Box>
  );
};

export default UserProfile;
