const mongoose = require('mongoose');

const RetreatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Number,
    default: Date.now,  
    required: true
  },
  location: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  tag: {
    type: [String],
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Retreat', RetreatSchema);
