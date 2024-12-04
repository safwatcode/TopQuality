const express = require("express");
const multer = require("multer");
const Timeline = require("../models/timeline");
const TeamMember = require("../models/teamMember");
const CompanyValue = require("../models/companyValue");
const router = express.Router();



// Multer storage configuration for team member images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, "TeamMember" + Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// Timeline Routes
// Create Timeline Entry
router.post("/timeline", async (req, res) => {
  try {
    const { year, description, order } = req.body;
    if (!year || !description) {
      return res.status(400).json({ error: "Year and description are required" });
    }
    const newTimelineEntry = new Timeline({ year, description, order });
    await newTimelineEntry.save();
    res.status(201).json(newTimelineEntry);
  } catch (err) {
    res.status(500).json({ error: "Error saving timeline entry" });
  }
});

// Get All Timeline Entries
router.get("/timeline", async (req, res) => {
  try {
    const timelines = await Timeline.find().sort({ year: -1 });
    res.status(200).json(timelines);
  } catch (err) {
    res.status(500).json({ error: "Error fetching timeline entries" });
  }
});

// Update Timeline Entry
router.put("/timeline/:id", async (req, res) => {
  try {
    const { year, description, order } = req.body;
    const updatedEntry = await Timeline.findByIdAndUpdate(
      req.params.id,
      { year, description, order },
      { new: true }
    );
    res.status(200).json(updatedEntry);
  } catch (err) {
    res.status(500).json({ error: "Error updating timeline entry" });
  }
});

// Delete Timeline Entry
router.delete("/timeline/:id", async (req, res) => {
  try {
    await Timeline.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Timeline entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting timeline entry" });
  }
});

// Team Member Routes
// Create Team Member
router.post("/team", upload.single("image"), async (req, res) => {
  try {
    const { name, role, category, order } = req.body;
    const image = req.file ? req.file.filename : null;
    
    if (!name || !role || !category) {
      return res.status(400).json({ error: "Name, role, and category are required" });
    }
    
    const newTeamMember = new TeamMember({ 
      name, 
      role, 
      image, 
      category,
      order 
    });
    
    await newTeamMember.save();
    res.status(201).json(newTeamMember);
  } catch (err) {
    res.status(500).json({ error: "Error saving team member" });
  }
});

// Get All Team Members
router.get("/team", async (req, res) => {
  try {
    const teamMembers = await TeamMember.find().sort({ order: 1 });
    res.status(200).json(teamMembers);
  } catch (err) {
    res.status(500).json({ error: "Error fetching team members" });
  }
});

// Update Team Member
router.put("/team/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, role, category, order } = req.body;
    const updateData = { name, role, category, order };
    
    if (req.file) updateData.image = req.file.filename;

    const updatedTeamMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.status(200).json(updatedTeamMember);
  } catch (err) {
    res.status(500).json({ error: "Error updating team member" });
  }
});

// Delete Team Member
router.delete("/team/:id", async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting team member" });
  }
});

// Company Values Routes
// Create Company Value
router.post("/values", async (req, res) => {
  try {
    const { title, description, order } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: "Title and description are required" });
    }
    const newCompanyValue = new CompanyValue({ title, description, order });
    await newCompanyValue.save();
    res.status(201).json(newCompanyValue);
  } catch (err) {
    res.status(500).json({ error: "Error saving company value" });
  }
});

// Get All Company Values
router.get("/values", async (req, res) => {
  try {
    const values = await CompanyValue.find().sort({ order: 1 });
    res.status(200).json(values);
  } catch (err) {
    res.status(500).json({ error: "Error fetching company values" });
  }
});

// Update Company Value
router.put("/values/:id", async (req, res) => {
  try {
    const { title, description, order } = req.body;
    const updatedValue = await CompanyValue.findByIdAndUpdate(
      req.params.id,
      { title, description, order },
      { new: true }
    );
    res.status(200).json(updatedValue);
  } catch (err) {
    res.status(500).json({ error: "Error updating company value" });
  }
});

// Delete Company Value
router.delete("/values/:id", async (req, res) => {
  try {
    await CompanyValue.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Company value deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting company value" });
  }
});

module.exports = router;