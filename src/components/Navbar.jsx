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
    <nav style={{ padding: '10px', backgroundColor: '#007bff', color: 'white' }}>
      <h3>MedAI</h3>
      <div style={{ float: 'right' }}>
        {user ? (
          // If user is logged in, show Logout button
          <>
            <span>Welcome, {user.email}</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
              Logout
            </button>
          </>
        ) : (
          // If user is not logged in, show Login button
          <button onClick={() => navigate('/')} style={{ marginLeft: '10px' }}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
