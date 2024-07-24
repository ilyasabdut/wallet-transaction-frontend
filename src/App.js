import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transfer from './pages/Transfer';
import Topup from './pages/Topup';

// Example pages

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to={{ pathname: "/transfer", state: { openModal: true } }}>Transfer</Link></li>
          <Link to={{ pathname: "/topup", state: { openModal: true } }}>Topup</Link>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/Transfer" element={<Transfer />} />
        <Route path="/Topup" element={<Topup />} />
      </Routes>
    </Router>
  );
};

export default App;