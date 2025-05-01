import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config'; // Import auth and db from firebase config
import { doc, getDoc } from 'firebase/firestore'; // Firestore functions
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Log in user with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch the user's role from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userRole = userDoc.data().role;

        // Redirect based on user role
        if (userRole === 'Doctor') {
          navigate('/doctor-dashboard');
        } else {
          navigate('/patient-dashboard');
        }
      } else {
        alert("No role found for this user!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
