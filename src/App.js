import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transaction from './pages/Transaction';

// Example pages

const App = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <Link to={{ pathname: "/transaction", state: { openModal: true } }}>Transaction</Link>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </Router>
  );
};

export default App;