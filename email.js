const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  recipient: String,
  subject: String,
  body: String,
  attachments: [String],
  scheduleTime: Date,
  recurrence: {
    type: { type: String },
    details: Object
  },
  status: String
});

const Email = mongoose.model('Email', emailSchema);
module.exports = { Email };
