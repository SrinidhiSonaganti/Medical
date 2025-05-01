// src/pages/DoctorDashboard.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/config'; // Firestore
import { collection, getDocs } from 'firebase/firestore'; // Firestore functions

function DoctorDashboard() {
  const [patients, setPatients] = useState([]);

  // Fetch patients from Firestore
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientsSnapshot = await getDocs(collection(db, 'patients'));
        const patientsList = patientsSnapshot.docs.map(doc => doc.data());
        setPatients(patientsList);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };
    
    fetchPatients();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Doctor Dashboard</h2>
      <p>Welcome, Doctor! Here’s your patient list:</p>
      <ul>
        {patients.map((patient, index) => (
          <li key={index}>
            <strong>{patient.name}</strong> - {patient.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DoctorDashboard;
