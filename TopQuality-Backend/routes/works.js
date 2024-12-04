const express = require("express");
const multer = require("multer");
const Work = require("../models/work");

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, "Work" + Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Create a new work
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.filename : null;
    if (!title || !description || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newWork = new Work({ title, description, image });
    await newWork.save();
    res.status(201).json(newWork);
  } catch (err) {
    res.status(500).json({ error: "Error saving the work" });
  }
});

// Read all works
router.get("/", async (req, res) => {
  try {
    const works = await Work.find();
    res.status(200).json(works);
  } catch (err) {
    res.status(500).json({ error: "Error fetching works" });
  }
});

// Update a work
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };
    if (req.file) updateData.image = req.file.filename;

    const updatedWork = await Work.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json(updatedWork);
  } catch (err) {
    res.status(500).json({ error: "Error updating the work" });
  }
});

// Update a work
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = { title, description };
    if (req.file) updateData.image = req.file.filename;

    const updatedWork = await Work.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json(updatedWork);
  } catch (err) {
    res.status(500).json({ error: "Error updating the work" } + err.message);
  }
});
// Delete a work
router.delete("/:id", async (req, res) => {
  try {
    await Work.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Work deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting the work" });
  }
});

module.exports = router;
