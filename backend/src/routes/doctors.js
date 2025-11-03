const express = require('express');
const router = express.Router();

let doctors = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    phone: '+1-555-0101',
    email: 's.johnson@hospital.com',
    experience: '15 years'
  },
  {
    id: '2', 
    name: 'Dr. Michael Chen',
    specialization: 'Neurology',
    phone: '+1-555-0102',
    email: 'm.chen@hospital.com',
    experience: '12 years'
  }
];

router.get('/', (req, res) => {
  res.json({
    success: true,
    count: doctors.length,
    data: doctors
  });
});

router.post('/', (req, res) => {
  const doctor = {
    id: Date.now().toString(),
    ...req.body
  };
  doctors.push(doctor);
  res.status(201).json({
    success: true,
    message: 'Doctor added successfully',
    data: doctor
  });
});

module.exports = router;