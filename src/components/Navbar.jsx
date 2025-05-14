import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/config'; // Import auth from firebase config
import { signOut } from 'firebase/auth'; // Import signOut from Firebase
import { useNavigate } from 'react-router-dom'; // To navigate after logout

function Navbar() {
  const [user, setUser] = useState(null); // State to track user
  const navigate = useNavigate();

  useEffect(() => {
    // Listen to the authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // Set the user state when auth state changes
    });
    return () => unsubscribe(); // Clean up the subscription when component unmounts
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate('/'); // Redirect to the login page after logout
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <nav style={{
      padding: '1rem 2rem',
      backgroundColor: '#3498db', // brand-primary
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h3 style={{
          margin: 0,
          fontSize: '1.5rem',
          fontWeight: 'bold',
          letterSpacing: '0.5px'
        }}>
          MedAI
        </h3>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {user ? (
          // If user is logged in, show welcome message and logout button
          <>
            <span style={{ 
              marginRight: '1rem',
              fontSize: '0.9rem'
            }}>
              Welcome, <strong>{user.email}</strong>
            </span>
            <button 
              onClick={handleLogout} 
              style={{
                backgroundColor: 'transparent',
                border: '1px solid white',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                cursor: 'pointer',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#3498db';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              Logout
            </button>
          </>
        ) : (
          // If user is not logged in, show Login button
          <button 
            onClick={() => navigate('/')} 
            style={{
              backgroundColor: 'white',
              color: '#3498db',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '0.25rem',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'rgba(255,255,255,0.9)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'white';
            }}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;