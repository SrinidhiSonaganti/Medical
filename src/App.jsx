import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';  // Import Navbar component
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';

function App() {
  return (
    <Router>
      <Navbar /> {/* Display Navbar on all pages */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
