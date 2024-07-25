// components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ className }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('decoded');
    localStorage.removeItem('username');
    window.location.reload();
    navigate('/login');

  };

  return (
    <button onClick={handleLogout} className={className}>
      Logout
    </button>
  );
};

export default LogoutButton;