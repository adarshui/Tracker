// models/CommunicationMethod.js
const mongoose = require('mongoose');

const communicationMethodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  sequence: { type: Number, required: true },
  mandatory: { type: Boolean, default: false },
});

const CommunicationMethod = mongoose.model('CommunicationMethod', communicationMethodSchema);

module.exports = CommunicationMethod;
