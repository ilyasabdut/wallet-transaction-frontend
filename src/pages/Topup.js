import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalTopupForm from '../components/modal/modalTopup';
const Topup = () => {
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
      <h1>Topup Page</h1>
      <button onClick={openModal}>Open Form</button>
      <ModalTopupForm
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      />
    </div>
  );
};

export default Topup;