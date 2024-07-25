const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookingSchema = new mongoose.Schema({
  user_id: {
    type: String,
    default: () => uuidv4(),
    required: true
  },
  user_name: {
    type: String,
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  user_phone: {
    type: String,
    required: true
  },
  retreat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Retreat',
    required: false
  },
  retreat_title: {
    type: String,
    required: true
  },
  retreat_location: {
    type: String,
    required: true
  },
  retreat_price: {
    type: Number,
    required: true
  },
  retreat_duration: {
    type: Number,
    required: true
  },
  booking_date: {
    type: Date,
    required: true
  },
  payment_details: {
    type: String,
    required: true
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
