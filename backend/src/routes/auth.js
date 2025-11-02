const express = require('express');
const router = express.Router();

// Simple authentication (for demo purposes)
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple demo authentication
  if (username === 'admin' && password === 'admin') {
    res.json({
      success: true,
      message: 'Login successful',
      user: { username: 'admin', role: 'admin' }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

module.exports = router;
