const express = require("express");
const router = express.Router();
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerAttendee
} = require("../controllers/eventController");

router.post("/event", createEvent);
router.get("/eventAll", getAllEvents);
router.get("/event/:id", getEventById);
router.put("/event/:id", updateEvent);
router.delete("/event/:id", deleteEvent);
router.put("/event/:id/register", registerAttendee);

module.exports = router;
