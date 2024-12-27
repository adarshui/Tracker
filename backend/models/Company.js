// models/Company.js
const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  linkedInProfile: String,
  emails: [String],
  phoneNumbers: [String], // Correct field name
  comments: String,
  communicationPeriodicity: { type: Number, default: 14 }, // Default 2 weeks
  communications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Communication' }], // Reference to communications
});

module.exports = mongoose.model('Company', companySchema);
