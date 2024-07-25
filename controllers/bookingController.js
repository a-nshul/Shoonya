const Booking = require('../models/BookingModel');
const Retreat = require('../models/RetreatModel');

const createBooking = async (req, res) => {
  try {
    const {
      user_name,
      user_email,
      user_phone,
      retreat_id,
      retreat_title,
      retreat_location,
      retreat_price,
      retreat_duration,
      booking_date,
      payment_details
    } = req.body;

    // Find the retreat by ID
    const retreat = await Retreat.findById(retreat_id);
    if (!retreat) {
      return res.status(404).json({ error: 'Retreat not found' });
    }

    // Check if the user has already booked the retreat
    const existingBooking = await Booking.findOne({ user_id: req.body.user_id });
    if (existingBooking) {
      return res.status(400).json({ error: 'Retreat already booked by this user' });
    }

    // Create a new booking
    const newBooking = await Booking.create({
      user_name,
      user_email,
      user_phone,
      retreat_id,
      retreat_title,
      retreat_location,
      retreat_price,
      retreat_duration,
      booking_date,
      payment_details
    });
    const populatedBooking = await Booking.findById(newBooking._id).populate('retreat_id');
    res.status(201).json({ populatedBooking, message: 'Booking created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createBooking };
