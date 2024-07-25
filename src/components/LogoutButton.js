// components/LogoutButton.js
import React from 'react';

const LogoutButton = ({ className }) => {

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('decoded');
    localStorage.removeItem('username');
    window.location.reload();
  };

  return (
    <button onClick={handleLogout} className={className}>
      Logout
    </button>
  );
};

export default LogoutButton;