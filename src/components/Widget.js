import React from 'react';
import PropTypes from 'prop-types';

// Define a basic Widget component
const Widget = ({ title, value }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.value}>{value}</p>
    </div>
  );
};

// Define prop types for the component
Widget.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

// Inline styles for the component
const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    width: '200px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    margin: '0 0 8px',
    fontSize: '18px',
    color: '#333',
  },
  value: {
    margin: '0 0 8px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#555',
  },
};

export default Widget;