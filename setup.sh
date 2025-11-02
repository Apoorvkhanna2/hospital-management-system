#!/bin/bash

echo "Setting up Hospital Management System..."
echo "========================================"

# Create frontend directory structure
echo "Creating frontend directory structure..."
mkdir -p frontend/public frontend/src

# Create backend directory structure
echo "Creating backend directory structure..."
mkdir -p backend/src/models backend/src/routes backend/test

# Create frontend public files
echo "Creating frontend public files..."
cat > frontend/public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Hospital Management System"
    />
    <title>Hospital Management System</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF

# Create frontend src files
echo "Creating frontend src files..."
cat > frontend/src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

cat > frontend/src/index.css << 'EOF'
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

* {
  box-sizing: border-box;
}
EOF

# Create nginx config
echo "Creating nginx configuration..."
cat > frontend/nginx.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
    
    # Proxy API requests to backend
    location /api {
        proxy_pass http://backend:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }
}
EOF

# Create missing backend route files
echo "Creating backend route files..."

cat > backend/src/routes/doctors.js << 'EOF'
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
EOF

cat > backend/src/routes/appointments.js << 'EOF'
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
EOF

cat > backend/src/routes/auth.js << 'EOF'
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
EOF

# Create test file
echo "Creating test files..."
cat > backend/test/app.test.js << 'EOF'
const request = require('supertest');
const app = require('../src/server');

describe('Hospital Management System API', () => {
  it('should return health status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'OK');
  });

  it('should create a new patient', async () => {
    const patientData = {
      name: 'John Doe',
      age: 30,
      gender: 'Male',
      contact: {
        phone: '1234567890',
        email: 'john@example.com'
      }
    };
    
    const res = await request(app)
      .post('/api/patients')
      .send(patientData);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', 'John Doe');
  });
});
EOF

echo "========================================"
echo "Setup completed successfully!"
echo "Now run: docker-compose up --build"
echo "The application will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:5000"