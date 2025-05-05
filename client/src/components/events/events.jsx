import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  MenuItem,
  Card,
  CardContent,
  Select,
  Divider,
  FormControl,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import CreateEventForm from "./createEventForm";
import CustomDialog from "../../common/customDialog";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";

const EventsPage = () => {
  const user = useSelector((state) => state.auth.user);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hostName, setHostName] = useState("");
  const [date, setDate] = useState("");
  const [refresh, setRefresh] = useState(false);

  const isEventFuture = (date, time) => {
    const eventDateTime = new Date(`${date}T${time}`);
    const now = new Date();
    return eventDateTime > now;
  };

  const handleRegister = async (event) => {
    setRefresh(true); // Set refresh state before making the requests
    try {
      await axios.put(`/api/manage/event/${event?.id}/register`, {
        username: user.username,
        email: user.email,
      });
    } catch (error) {
      console.error("Registration failed", error);
    }
    setRefresh(false); // Set refresh state before making the requests
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = {};
        if (hostName) params.hostName = hostName;
        if (date) params.date = date;

        const response = await axios.get("/api/manage/eventAll", { params });
        setEvents(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [hostName, date, refresh]); // re-fetch when filters change

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
          <FormControl fullWidth>
            <Typography sx={{ fontSize: "14px", color: "black" }}>Date</Typography>
            <Select value={date} onChange={(e) => setDate(e.target.value)} displayEmpty size='small'>
              {events?.map((loc, index) => (
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
              {events?.map((loc, index) => (
                <MenuItem key={index} value={loc.hostName}>
                  {loc.hostName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm='auto' mt={2}>
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
        {events?.map((event, idx) => (
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
                {event.attendees?.map((attendee, index) => (
                  <Box display='flex' alignItems='center' mt={1}>
                    <FaUser fontSize='small' sx={{ mr: 1 }} />
                    <Typography key={index} sx={{ fontSize: "14px", color: "black" }}>
                      {attendee.username}
                    </Typography>
                  </Box>
                ))}
                <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
                  <Button
                    size='small'
                    variant='contained'
                    color='success'
                    sx={{ textTransform: "none" }}
                    disabled={!isEventFuture(event.date, event.time)}
                    onClick={() => {
                      handleRegister(event);
                    }}
                  >
                    {isEventFuture(event.date, event.time) ? "Register Now" : " Past Event"}
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setSelectedEvent(event); // Store the selected event
                      setOpenEdit(true); // Open the edit dialog
                    }}
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
          setRefresh={setRefresh}
          initialValuesEdit={[]}
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
          setRefresh={setRefresh}
          initialValuesEdit={selectedEvent} // Pass the selected event as initial values
        />
      </CustomDialog>
    </Box>
  );
};

export default EventsPage;
