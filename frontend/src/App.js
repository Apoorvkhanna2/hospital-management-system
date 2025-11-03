import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('patients');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form states
  const [patientForm, setPatientForm] = useState({
    name: '', age: '', gender: '', phone: '', email: '', address: ''
  });
  const [doctorForm, setDoctorForm] = useState({
    name: '', specialization: '', phone: '', email: '', experience: ''
  });
  const [appointmentForm, setAppointmentForm] = useState({
    patientId: '', doctorId: '', date: '', time: '', reason: ''
  });

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patients`);
      setPatients(response.data.data || []);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/doctors`);
      setDoctors(response.data.data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/appointments`);
      setAppointments(response.data.data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handlePatientSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/patients`, {
        name: patientForm.name,
        age: parseInt(patientForm.age),
        gender: patientForm.gender,
        contact: {
          phone: patientForm.phone,
          email: patientForm.email,
          address: patientForm.address
        }
      });
      setMessage('Patient added successfully!');
      setPatientForm({ name: '', age: '', gender: '', phone: '', email: '', address: '' });
      fetchPatients();
    } catch (error) {
      setMessage('Error adding patient');
    }
    setLoading(false);
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/doctors`, doctorForm);
      setMessage('Doctor added successfully!');
      setDoctorForm({ name: '', specialization: '', phone: '', email: '', experience: '' });
      fetchDoctors();
    } catch (error) {
      setMessage('Error adding doctor');
    }
    setLoading(false);
  };

  const handleAppointmentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/appointments`, appointmentForm);
      setMessage('Appointment scheduled successfully!');
      setAppointmentForm({ patientId: '', doctorId: '', date: '', time: '', reason: '' });
      fetchAppointments();
    } catch (error) {
      setMessage('Error scheduling appointment');
    }
    setLoading(false);
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="logo">
            <i className="fas fa-hospital"></i>
            <h1>MediCare Hospital</h1>
          </div>
          <nav className="nav-tabs">
            <button 
              className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <i className="fas fa-tachometer-alt"></i> Dashboard
            </button>
            <button 
              className={`tab ${activeTab === 'patients' ? 'active' : ''}`}
              onClick={() => setActiveTab('patients')}
            >
              <i className="fas fa-user-injured"></i> Patients
            </button>
            <button 
              className={`tab ${activeTab === 'doctors' ? 'active' : ''}`}
              onClick={() => setActiveTab('doctors')}
            >
              <i className="fas fa-user-md"></i> Doctors
            </button>
            <button 
              className={`tab ${activeTab === 'appointments' ? 'active' : ''}`}
              onClick={() => setActiveTab('appointments')}
            >
              <i className="fas fa-calendar-check"></i> Appointments
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {message && (
          <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
            {message}
            <button onClick={() => setMessage('')} className="close-btn">×</button>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <div className="stats-grid">
              <div className="stat-card primary">
                <i className="fas fa-user-injured"></i>
                <div className="stat-info">
                  <h3>{patients.length}</h3>
                  <p>Total Patients</p>
                </div>
              </div>
              <div className="stat-card success">
                <i className="fas fa-user-md"></i>
                <div className="stat-info">
                  <h3>{doctors.length}</h3>
                  <p>Total Doctors</p>
                </div>
              </div>
              <div className="stat-card warning">
                <i className="fas fa-calendar-check"></i>
                <div className="stat-info">
                  <h3>{appointments.length}</h3>
                  <p>Appointments</p>
                </div>
              </div>
              <div className="stat-card info">
                <i className="fas fa-stethoscope"></i>
                <div className="stat-info">
                  <h3>24/7</h3>
                  <p>Emergency</p>
                </div>
              </div>
            </div>

            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {patients.slice(0, 5).map(patient => (
                  <div key={patient._id} className="activity-item">
                    <i className="fas fa-user-plus"></i>
                    <span>New patient registered: {patient.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === 'patients' && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Patient Management</h2>
              <button className="btn-primary" onClick={() => document.getElementById('patientForm').scrollIntoView()}>
                <i className="fas fa-plus"></i> Add New Patient
              </button>
            </div>

            <div className="form-section">
              <form id="patientForm" onSubmit={handlePatientSubmit} className="modern-form">
                <h3>Add New Patient</h3>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={patientForm.name}
                    onChange={(e) => setPatientForm({...patientForm, name: e.target.value})}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Age"
                    value={patientForm.age}
                    onChange={(e) => setPatientForm({...patientForm, age: e.target.value})}
                    required
                  />
                  <select
                    value={patientForm.gender}
                    onChange={(e) => setPatientForm({...patientForm, gender: e.target.value})}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={patientForm.phone}
                    onChange={(e) => setPatientForm({...patientForm, phone: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={patientForm.email}
                    onChange={(e) => setPatientForm({...patientForm, email: e.target.value})}
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={patientForm.address}
                    onChange={(e) => setPatientForm({...patientForm, address: e.target.value})}
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-submit">
                  {loading ? 'Adding...' : 'Add Patient'}
                </button>
              </form>
            </div>

            <div className="data-section">
              <h3>Patients List</h3>
              <div className="cards-grid">
                {patients.map(patient => (
                  <div key={patient._id} className="data-card">
                    <div className="card-header">
                      <h4>{patient.name}</h4>
                      <span className={`status-badge ${patient.gender.toLowerCase()}`}>
                        {patient.gender}
                      </span>
                    </div>
                    <div className="card-body">
                      <p><i className="fas fa-birthday-cake"></i> Age: {patient.age}</p>
                      {patient.contact?.phone && (
                        <p><i className="fas fa-phone"></i> {patient.contact.phone}</p>
                      )}
                      {patient.contact?.email && (
                        <p><i className="fas fa-envelope"></i> {patient.contact.email}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Similar structure for Doctors and Appointments tabs */}
        {/* Doctors Tab */}
        {activeTab === 'doctors' && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Doctor Management</h2>
              <button className="btn-primary">
                <i className="fas fa-plus"></i> Add New Doctor
              </button>
            </div>
            {/* Add doctor form and list similar to patients */}
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === 'appointments' && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Appointment Management</h2>
              <button className="btn-primary">
                <i className="fas fa-plus"></i> Schedule Appointment
              </button>
            </div>
            {/* Add appointment form and list similar to patients */}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;