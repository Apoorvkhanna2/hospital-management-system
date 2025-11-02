const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let appointments = [];

// Get all appointments
router.get('/', (req, res) => {
  res.json(appointments);
});

// Create new appointment
router.post('/', (req, res) => {
  const appointment = {
    id: Date.now().toString(),
    ...req.body
  };
  appointments.push(appointment);
  res.status(201).json(appointment);
});

module.exports = router;
