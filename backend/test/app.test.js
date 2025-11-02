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
