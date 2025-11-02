const express = require('express');
const router = express.Router();

// Temporary in-memory storage
let doctors = [];

// Get all doctors
router.get('/', (req, res) => {
  res.json(doctors);
});

// Create new doctor
router.post('/', (req, res) => {
  const doctor = {
    id: Date.now().toString(),
    ...req.body
  };
  doctors.push(doctor);
  res.status(201).json(doctor);
});

module.exports = router;
