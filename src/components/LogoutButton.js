import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the access token from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('decoded'); // Optional: Remove other related items
    localStorage.removeItem('username'); // Optional: Remove other related items

    // Redirect to login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;