// src/pages/Login.jsx
import React, { useState } from 'react';
import { loginWithEmail, signupWithEmail, loginWithGoogle } from '../firebase/functions';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithEmail(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignup = async () => {
    try {
      await signupWithEmail(email, password);
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '10%' }}>
      <h2>MedAI Login</h2>
      <input
        placeholder="Email"
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
      <button onClick={handleSignup}>Signup</button>
      <br /><br />
      <button onClick={handleGoogle}>Login with Google</button>
    </div>
  );
}

export default Login;
