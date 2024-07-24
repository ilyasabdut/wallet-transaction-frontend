// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import Topup from './pages/Topup';
import Login from './pages/Login';
import LogoutButton from './components/LogoutButton';
import './App.css';

const App = () => {
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <Router>
      <nav className="navbar">
        <ul className="nav-links">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/transfer">Transfer</Link></li>
          <li><Link to="/topup">Topup</Link></li>
        </ul>
        <LogoutButton className="logout-button" />
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/transfer" element={<Transfer />} />
        <Route path="/topup" element={<Topup />} />
      </Routes>
    </Router>
  );
};

export default App;