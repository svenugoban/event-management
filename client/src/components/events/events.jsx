import React, { useState } from "react";
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
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleIcon from "@mui/icons-material/People";
import CreateEventForm from "./createEventForm";
import CloseIcon from "@mui/icons-material/Close";

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
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

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

      <Grid container spacing={2} mt={2}>
        {mockEvents.map((event, idx) => (
          <Grid item sm={12} lg={6} key={idx}>
            <Card>
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
                <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
                  <Button size='small' variant='contained' color='success' sx={{ textTransform: "none" }}>
                    Register Now
                  </Button>
                  <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    onClick={() => {
                      setOpenEdit(true);
                    }}
                    sx={{ textTransform: "none" }}
                  >
                    Edit Event
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openCreate}
        onClose={() => {
          setOpenCreate(false);
        }}
        fullWidth
      >
        <DialogTitle>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <DialogTitle>{"Create Event"}</DialogTitle>
            <IconButton
              aria-label='close'
              onClick={() => {
                setOpenCreate(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <CreateEventForm
            action={"create"}
            onClose={() => {
              setOpenCreate(false);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={() => {
          setOpenEdit(false);
        }}
        fullWidth
      >
        <DialogTitle>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <DialogTitle>{"Edit Event"}</DialogTitle>
            <IconButton
              aria-label='close'
              onClick={() => {
                setOpenEdit(false);
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <CreateEventForm
            action={"edit"}
            onClose={() => {
              setOpenEdit(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EventsPage;
