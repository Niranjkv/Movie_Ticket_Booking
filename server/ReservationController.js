const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST /api/reservations
// Create a new reservation
router.post('/', async (req, res) => {
  try {
    const { movieId, seats } = req.body;

    // Check if the seats are available
    const isSeatsAvailable = await checkSeatAvailability(movieId, seats);
    if (!isSeatsAvailable) {
      return res.status(400).json({ error: 'Seats are not available' });
    }

    // Create a new reservation
    const reservation = new Reservation({
      movie: movieId,
      seats
    });

    // Save the reservation
    await reservation.save();

    res.json(reservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

// Helper function to check seat availability
async function checkSeatAvailability(movieId, seats) {
  // Your logic to check seat availability goes here
  // Return true if seats are available, false otherwise
  return true;
}

module.exports = router;
