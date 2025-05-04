import { Box, Typography, Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";

const EventCard = ({ title, date, time, location, host, description }) => (
  <Box
    sx={{
      border: "1px solid #ddd",
      p: 2,
      borderRadius: 2,
      mt: 2,
      backgroundColor: "#fff",
    }}
  >
    <Typography fontWeight='bold' fontSize='16px'>
      {title}
    </Typography>

    <Box mt={1}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} mt={1}>
        <CalendarTodayIcon fontSize='small' />
        <Typography sx={{ fontSize: "14px", color: "black" }}>
          {new Date(date).toLocaleDateString("en-CA", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}{" "}
          {time}
        </Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} mt={1}>
        <LocationOnIcon fontSize='small' />
        <Typography sx={{ fontSize: "14px", color: "black" }}>{location}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }} mt={1}>
        <PersonIcon fontSize='small' />
        <Typography sx={{ fontSize: "14px", color: "black" }}>Hosted by {host}</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }} mt={1}>
        <DescriptionIcon fontSize='small' />
        <Typography
          sx={{
            fontSize: "14px",
            color: "black",
            whiteSpace: "normal",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            width: "100%",
          }}
        >
          {description}
        </Typography>
      </Box>

      <Button variant='contained' size='small' sx={{ bgcolor: "green", mb: 1, mt: 1, textTransform: "none" }}>
        Upcoming
      </Button>
    </Box>
  </Box>
);

export default EventCard;
