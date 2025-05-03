const pool = require("../config/db");

class Event {
  static async create(eventData) {
    const { eventTitle, date, time, location, description, hostName, attendees = [] } = eventData;
    const [result] = await pool.query(
      `INSERT INTO event (eventTitle, date, time, location, description, hostName, attendees)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [eventTitle, date, time, location, description, hostName, JSON.stringify(attendees)]
    );
    return result.insertId;
  }

  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM event ORDER BY created_at DESC");
    return rows.map((row) => ({
      ...row,
      attendees: typeof row.attendees === "string" ? JSON.parse(row.attendees) : row.attendees,
    }));
  }
  

  static async getById(id) {
    const [rows] = await pool.query("SELECT * FROM event WHERE id = ?", [id]);
    if (rows.length === 0) return null;
  
    return {
      ...rows[0],
      attendees: typeof rows[0].attendees === "string" ? JSON.parse(rows[0].attendees) : rows[0].attendees,
    };
  }
  

  static async update(id, updatedData) {
    const { eventTitle, date, time, location, description, hostName, attendees = [] } = updatedData;
    const [result] = await pool.query(
      `UPDATE event SET eventTitle = ?, date = ?, time = ?, location = ?, description = ?, hostName = ?, attendees = ?
       WHERE id = ?`,
      [eventTitle, date, time, location, description, hostName, JSON.stringify(attendees), id]
    );
    return result;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM event WHERE id = ?", [id]);
    return result;
  }
}

module.exports = Event;
