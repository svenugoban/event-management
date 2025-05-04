const Event = require("../models/eventModel");



// Create a new event
const createEvent = async (req, res) => {
  try {
    const eventId = await Event.create(req.body);
    res.status(201).json({ message: "Event created successfully", eventId });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const { hostName, date } = req.query; // optional filters
    const events = await Event.getAll({ hostName, date });
    res.status(200).json(events);
  } catch (error) {
    console.error("Error retrieving events:", error);
    res.status(500).json({ error: "Failed to retrieve events" });
  }
};


// Get a single event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.getById(id);

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    console.error("Error retrieving event:", error);
    res.status(500).json({ error: "Failed to retrieve event" });
  }
};

// Update an event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.update(id, req.body);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: "Failed to update event" });
  }
};

// Delete an event
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.delete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
