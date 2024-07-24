import React from 'react';
import { Navigate } from 'react-router-dom';

//TODO fix this
const withAuth = (WrappedComponent) => {
  return (props) => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      return <Navigate to="/login" />;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;