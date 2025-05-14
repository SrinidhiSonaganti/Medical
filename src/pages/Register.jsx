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
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      padding: '0 1rem'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        backgroundColor: 'white',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        padding: '2rem'
      }}>
        <h2 style={{ 
          fontSize: '1.875rem',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#3498db', // brand-primary
          marginBottom: '1.5rem'
        }}>Create Account</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="email" 
            style={{ 
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}
          >
            Email Address
          </label>
          <input
            id="email"
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              outline: 'none'
            }}
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="password"
            style={{ 
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}
          >
            Password
          </label>
          <input
            id="password"
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              outline: 'none'
            }}
            placeholder="Choose a strong password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="role"
            style={{ 
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.25rem'
            }}
          >
            Select Role
          </label>
          <select
            id="role"
            style={{
              width: '100%',
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              backgroundColor: 'white',
              outline: 'none'
            }}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">-- Select your role --</option>
            <option value="Doctor">Doctor</option>
            <option value="Patient">Patient</option>
          </select>
        </div>
        
        <button 
          style={{
            width: '100%',
            backgroundColor: '#3498db', // brand-primary
            color: 'white',
            fontWeight: '500',
            padding: '0.5rem 1rem',
            borderRadius: '0.375rem',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            marginBottom: '1rem'
          }}
          onClick={handleSignup}
          onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'} // darker on hover
          onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
          disabled={!email || !password || !role}
        >
          Create Account
        </button>
        
        <p style={{ 
          fontSize: '0.875rem',
          textAlign: 'center',
          color: '#4b5563',
          marginTop: '1rem'
        }}>
          Already have an account?{" "}
          <a 
            href="/login" 
            style={{ 
              color: '#3498db', // brand-primary
              fontWeight: '500',
              textDecoration: 'none'
            }}
            onMouseOver={(e) => e.target.style.textDecoration = 'underline'}
            onMouseOut={(e) => e.target.style.textDecoration = 'none'}
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;