import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase/config';

// Import components and pages
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
    isLoading: true
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user role from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setAuthState({
              isAuthenticated: true,
              user: user,
              role: userData.role,
              isLoading: false
            });
          } else {
            setAuthState({
              isAuthenticated: false,
              user: null,
              role: null,
              isLoading: false
            });
          }
        } catch (error) {
          console.error("Error fetching user role:", error);
          setAuthState({
            isAuthenticated: false,
            user: null,
            role: null,
            isLoading: false
          });
        }
      } else {
        setAuthState({
          isAuthenticated: false,
          user: null,
          role: null,
          isLoading: false
        });
      }
    });

    return () => unsubscribe();
  }, []);

  // Loading state
  if (authState.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Automatic redirection logic
  if (authState.isAuthenticated) {
    if (authState.role === 'patient') {
      return <Navigate to="/patient-dashboard" replace />;
    } else if (authState.role === 'doctor') {
      return <Navigate to="/doctor-dashboard" replace />;
    }
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route 
            path="/doctor-dashboard" 
            element={
              authState.isAuthenticated && authState.role === 'doctor' ? (
                <DoctorDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          <Route 
            path="/patient-dashboard" 
            element={
              authState.isAuthenticated && authState.role === 'patient' ? (
                <PatientDashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            } 
          />

          {/* Default Redirect */}
          <Route 
            path="/" 
            element={<Navigate to="/login" replace />} 
          />

          {/* Catch-all route */}
          <Route 
            path="*" 
            element={<Navigate to="/login" replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;