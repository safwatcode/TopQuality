const express = require("express");
const multer = require("multer");
const Service = require("../models/service");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, "Service" + Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Create a new service
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!title || !description || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newService = new Service({ title, description, image });
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(500).json({ error: "Error saving the service" });
  }
});

// Read all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (err) {
    res.status(500).json({ error: "Error fetching services" });
  }
});

// Update a service
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };
    if (req.file) updateData.image = req.file.filename;

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json(updatedService);
  } catch (err) {
    res.status(500).json({ error: "Error updating the service" });
  }
});

// Delete a service
router.delete("/:id", async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting the service" });
  }
});

module.exports = router;
