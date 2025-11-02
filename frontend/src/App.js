import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    contact: { phone: '', email: '', address: '' }
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/patients`);
      
      // Handle different response formats
      let patientsData = [];
      if (response.data && Array.isArray(response.data)) {
        patientsData = response.data;
      } else if (response.data && Array.isArray(response.data.data)) {
        patientsData = response.data.data;
      } else if (response.data && response.data.data) {
        patientsData = [response.data.data];
      }
      
      setPatients(patientsData);
      setMessage(`Loaded ${patientsData.length} patients`);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setMessage('Error connecting to backend. Make sure backend is running on port 5000.');
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/patients`, formData);
      setMessage('Patient created successfully!');
      fetchPatients();
      setFormData({
        name: '',
        age: '',
        gender: '',
        contact: { phone: '', email: '', address: '' }
      });
    } catch (error) {
      console.error('Error creating patient:', error);
      setMessage('Error creating patient');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('contact.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contact: { ...prev.contact, [contactField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hospital Management System</h1>
        <p>{message}</p>
      </header>

      <div className="container">
        <div className="form-section">
          <h2>Add New Patient</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              required
            />
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="contact.phone"
              placeholder="Phone"
              value={formData.contact.phone}
              onChange={handleChange}
            />
            <input
              type="email"
              name="contact.email"
              placeholder="Email"
              value={formData.contact.email}
              onChange={handleChange}
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Patient'}
            </button>
          </form>
        </div>

        <div className="patients-section">
          <h2>Patients List {loading && '(Loading...)'}</h2>
          <div className="patients-grid">
            {patients.length === 0 ? (
              <p>No patients found. Add a patient above.</p>
            ) : (
              patients.map(patient => (
                <div key={patient._id || patient.id} className="patient-card">
                  <h3>{patient.name}</h3>
                  <p>Age: {patient.age}</p>
                  <p>Gender: {patient.gender}</p>
                  {patient.contact && (
                    <>
                      {patient.contact.phone && <p>Phone: {patient.contact.phone}</p>}
                      {patient.contact.email && <p>Email: {patient.contact.email}</p>}
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;