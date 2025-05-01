import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config'; // Import auth and db from firebase config
import { doc, setDoc } from 'firebase/firestore'; // Firestore functions
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); // Role selection (Doctor or Patient)
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store role in Firestore (in 'users' collection)
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role, // Store the selected role
      });

      // Redirect to the role-based dashboard
      if (role === 'Doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h2>Register</h2>
      <input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br /><br />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="">Select Role</option>
        <option value="Doctor">Doctor</option>
        <option value="Patient">Patient</option>
      </select><br /><br />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Register;
