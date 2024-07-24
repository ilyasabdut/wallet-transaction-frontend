import React, { useState, useEffect } from 'react';
import ModalTransferForm from '../components/modal/ModalTransfer'; 
import { useLocation, useNavigate } from 'react-router-dom';

const Transfer = () => {
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
    navigate('/');
  };

  return (
    <div>
      <h1>Transfer Page</h1>
      <button onClick={openModal}>Open Form</button>
      <ModalTransferForm
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default Transfer;