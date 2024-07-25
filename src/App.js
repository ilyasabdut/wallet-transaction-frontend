import React from 'react';
import { HashRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import LogoutButton from './components/LogoutButton';
import './App.css';

const App = () => {
  const accessToken = localStorage.getItem('access_token');
  const basename = process.env.NODE_ENV === 'production' ? '/wallet-transaction-frontend' : '/';
  console.log(basename);
  console.log(process.env.NODE_ENV);
  console.log(process.env.REACT_APP_BACKEND_URL);

  return (
    // <Router basename={basename}>
    <Router>

    {/* Conditionally render based on accessToken */}
      {!accessToken ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          <nav className="navbar">
            <ul className="nav-links">
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
            <LogoutButton className="logout-button" />
          </nav>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      )}
    </Router>
  );
};

export default App;