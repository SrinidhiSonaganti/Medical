// src/pages/PatientDashboard.jsx
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase/config'; // Firestore and Firebase Authentication
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions

function PatientDashboard() {
  const [patientData, setPatientData] = useState(null);

  // Fetch patient data from Firestore based on authenticated user
  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const userDoc = await getDoc(doc(db, 'patients', auth.currentUser.uid));
        if (userDoc.exists()) {
          setPatientData(userDoc.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    if (auth.currentUser) {
      fetchPatientData();
    }
  }, []);

  if (!patientData) {
    return <p>Loading your data...</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Patient Dashboard</h2>
      <p>Welcome, {patientData.name}!</p>
      <h3>Your Details</h3>
      <p><strong>Email:</strong> {patientData.email}</p>
      <p><strong>Age:</strong> {patientData.age}</p>
      <p><strong>Medical History:</strong> {patientData.medicalHistory}</p>
    </div>
  );
}

export default PatientDashboard;
