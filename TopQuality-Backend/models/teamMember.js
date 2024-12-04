const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String },
    category: { type: String, enum: ['CEO', 'Technician', 'IT'], required: true }
  });
  module.exports = mongoose.model('TeamMember', TeamMemberSchema);
  