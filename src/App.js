import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import Topup from './pages/Topup';
import Login from './pages/Login';
import LogoutButton from './components/LogoutButton'; 

const App = () => {
  const accessToken = localStorage.getItem('access_token');

  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/transfer">Transfer</Link></li>
          <li><Link to="/topup">Topup</Link></li>
          <li><LogoutButton /></li>
        </ul>
      </nav>
      <Routes>
        {/* Redirect to login if not authenticated */}
        {!accessToken ? (
          <Route path="*" element={<Navigate to="/login" />} />
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/topup" element={<Topup />} />
          </>
        )}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;