const pool = require("../config/db");

class Event {
  static async create(eventData) {
    const { eventTitle, date, time, location, description, hostName } = eventData;
  
    const [result] = await pool.query(
      `INSERT INTO event (eventTitle, date, time, location, description, hostName)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [eventTitle, date, time, location, description, hostName]
    );
  
    return result.insertId;
  }
  
  static async update(id, updatedData) {
    const { eventTitle, date, time, location, description, hostName } = updatedData;
  
    const [result] = await pool.query(
      `UPDATE event SET eventTitle = ?, date = ?, time = ?, location = ?, description = ?, hostName = ?
       WHERE id = ?`,
      [eventTitle, date, time, location, description, hostName, id]
    );
  
    return result;
  }

  
  static async getAll(filters = {}) {
    let query = "SELECT * FROM event";
    const conditions = [];
    const values = [];
  
    if (filters.hostName) {
      conditions.push("hostName = ?");
      values.push(filters.hostName);
    }
  
    if (filters.date) {
      conditions.push("date = ?");
      values.push(filters.date);
    }
  
    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }
  
    query += " ORDER BY created_at DESC";
  
    const [rows] = await pool.query(query, values);
  
    return rows?.map((row) => ({
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
