const validator = require("validator");
const pool = require("../config/db");
const User = require("../models/userModel");

// password validation rules set
const validatePassword = (password) => {
  const minLength = 8;
  const maxLength = 20;
  const hasUpperCase = /[A-Z]/;
  const hasLowerCase = /[a-z]/;
  const hasDigit = /\d/;
  const hasSpecialChar = /[!@#$%^&*]/;

  if (password.length < minLength || password.length > maxLength) {
    return "Password must be between 8 and 20 characters long";
  }

  if (!hasUpperCase.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!hasLowerCase.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!hasDigit.test(password)) {
    return "Password must contain at least one digit";
  }

  if (!hasSpecialChar.test(password)) {
    return "Password must contain at least one special character";
  }

  return null; // Password is valid
};

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please enter all required fields" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const passwordValidationMessage = validatePassword(password);
    if (passwordValidationMessage) {
      return res.status(400).json({ message: passwordValidationMessage });
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Check if the user already exists
      const [existingUsers] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);

      if (existingUsers.length > 0) {
        return res.status(400).json({ msg: "User already exists" });
      }

      const userId = await User.register(connection, {
        username,
        email,
        password,
      });

      await connection.commit();
      res.status(201).json({ msg: "User registered successfully", userId });
    } catch (err) {
      await connection.rollback();
      console.error("Registration Error:", err);
      res.status(500).json({ msg: "Server error", error: err });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Unexpected Error:", err);
    res.status(500).json({ message: "Unexpected server error", error: err });
  }
};

module.exports = {
  registerUser,
};
