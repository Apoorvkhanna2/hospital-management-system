const express = require('express');
const router = express.Router();

let appointments = [];

router.get('/', (req, res) => {
  res.json({
    success: true,
    count: appointments.length,
    data: appointments
  });
});

router.post('/', (req, res) => {
  const appointment = {
    id: Date.now().toString(),
    ...req.body,
    status: 'Scheduled',
    createdAt: new Date().toISOString()
  };
  appointments.push(appointment);
  res.status(201).json({
    success: true,
    message: 'Appointment scheduled successfully',
    data: appointment
  });
});

module.exports = router;