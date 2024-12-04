const mongoose = require('mongoose');

const CompanyValueSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 }
  });
  
  module.exports = mongoose.model('CompanyValue', CompanyValueSchema);