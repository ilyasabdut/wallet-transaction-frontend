import React, { useState, useEffect } from 'react';
import ModalTransactionForm from '../components/modal/ModalTransaction'; // Adjust the import path as needed
import { useLocation, useNavigate } from 'react-router-dom';

const Transaction = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    //TODO : Fix this
    // if (location.state?.openModal) {
    //     console.log(location.state);
    //   setIsModalOpen(true);
    // }
    const mockState = { openModal: true };
    console.log('Mock state:', mockState);
    if (mockState?.openModal) {
      setIsModalOpen(true);
    }
  }, [location]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Navigate to a different route or use state to remember the route
    navigate('/'); // Example: Navigate back to home or any other route
  };

  return (
    <div>
      <h1>Transaction Page</h1>
      <button onClick={openModal}>Open Form</button>
      <ModalTransactionForm
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default Transaction;