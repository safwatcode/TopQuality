const express = require("express");
const router = express.Router();

// Hardcoded admin credentials (for simplicity)
const admins = [
  { username: "admin1", password: "admin1" },
  { username: "admin2", password: "admin2" },
  { username: "admin3", password: "admin3" },
];

// Login endpoint
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match an admin
  const admin = admins.find(
    (admin) => admin.username === username && admin.password === password
  );

  if (admin) {
    res.status(200).json({ message: "Login successful", username });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

module.exports = router;
