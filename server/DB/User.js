const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Comment: {
    type: String,
    required: true,
  },
  Reply: {
    type: String,
    required: true,
  },
  Name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', userSchema);
