import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid, MenuItem, Card, CardContent, Select, Divider } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import CreateEventForm from "./createEventForm";
import CustomDialog from "../../common/customDialog";
import axios from "axios";

const EventsPage = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("/api/manage/eventAll");
        setEvents(response.data); // Assumes the response is an array of events
      } catch (err) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading events...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "24px", fontWeight: "bold", color: "black" }} align='left'>
        Events
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
        <Grid item xs={12} sm='auto'>
          <Button
            sx={{ textTransform: "none" }}
            variant='contained'
            onClick={() => {
              setOpenCreate(true);
            }}
          >
            + Create Event
          </Button>
        </Grid>
      </Grid>

      <Box>
        {events.map((event, idx) => (
          <Box mt={2}>
            <Card>
              <CardContent>
                <Box display='flex' alignItems='center' mt={1}>
                  <Typography fontWeight='bold'>{event.eventTitle}</Typography>
                </Box>
                <Box display='flex' alignItems='center' mt={1}>
                  <CalendarTodayIcon fontSize='small' sx={{ mr: 1 }} />
                  <Typography sx={{ fontSize: "14px", color: "black" }}>
                    {new Date(event.date).toLocaleDateString("en-CA", {
                      year: "numeric",
                      month: "long",
                      day: "2-digit",
                    })}{" "}
                    {event.time}
                  </Typography>
                </Box>
                <Box display='flex' alignItems='center' mt={1}>
                  <LocationOnIcon fontSize='small' sx={{ mr: 1 }} />
                  <Typography sx={{ fontSize: "14px", color: "black" }}>{event.location}</Typography>
                </Box>
                <Box display='flex' alignItems='center' mt={1}>
                  <PersonIcon fontSize='small' sx={{ mr: 1 }} />
                  <Typography sx={{ fontSize: "14px", color: "black" }}>
                    Hosted By {event.hostName?.name || event.hostName}
                  </Typography>
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
                  <Typography sx={{ fontSize: "14px", color: "black" }}>
                    Attendees: {Array.isArray(event.attendees) ? event.attendees.length : 0}
                  </Typography>
                </Box>
                <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
                  <Button size='small' variant='contained' color='success' sx={{ textTransform: "none" }}>
                    Register Now
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    onClick={() => setOpenEdit(true)}
                    sx={{ textTransform: "none" }}
                  >
                    Edit Event
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <CustomDialog
        isOpen={openCreate}
        onClose={() => {
          setOpenCreate(false);
        }}
        title={"Create Event"}
      >
        <CreateEventForm
          action={"create"}
          onClose={() => {
            setOpenCreate(false);
          }}
        />
      </CustomDialog>

      <CustomDialog
        isOpen={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
        title={"Edit Event"}
      >
        <CreateEventForm
          action={"edit"}
          onClose={() => {
            setOpenEdit(false);
          }}
        />
      </CustomDialog>
    </Box>
  );
};

export default EventsPage;
