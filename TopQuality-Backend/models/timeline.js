const mongoose = require('mongoose');

const TimelineSchema = new mongoose.Schema({
  year: { type: Number, required: true },
  description: { type: String, required: true },
  order: { type: Number, default: 0 },
});

module.exports = mongoose.model("Timeline", TimelineSchema);
