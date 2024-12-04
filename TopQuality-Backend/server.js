const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const workRoutes = require("./routes/works");
const serviceRoutes = require("./routes/services");
const aboutRoutes = require("./routes/about");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded images
app.use("/api/works", workRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/auth", authRoutes);

// Database Connection
mongoose
  .connect("mongodb://localhost:27017/portfolio")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
