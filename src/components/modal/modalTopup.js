import React, { useState } from 'react';
import Modal from 'react-modal';
import useCurrencyData from '../../hooks/useCurrencyData';
import '../../styles/ModalForm.css';

Modal.setAppElement('#root'); // Ensure accessibility

const ModalTopup = ({ isOpen, onRequestClose }) => {
  const [amount, setAmount] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const [notes, setNotes] = useState('');
  const apiUrl = process.env.REACT_APP_BACKEND_URL || '/api';
  const { currencyData, loading: currencyLoading, error: currencyError } = useCurrencyData(apiUrl);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const username = localStorage.getItem('username');
  
  if (currencyLoading) return <p>Loading...</p>;
  if (currencyError) return <p>Error: {currencyError}</p>;

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      username_from: null,
      username_to: username,
      currency_id: Number(currencyId),
      amount: parseFloat(amount),
      type: 'credit',
      notes: notes,
    };

    try {
      const accessToken = localStorage.getItem('access_token');      
      const response = await fetch(`${apiUrl}/transactions/topup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Form submitted successfully:', result);
        //TODO use redux
        setMessage(result.message);
        setError('')
        onRequestClose();
      } else {
        console.error('Error submitting form:', result);
        setError(result.message || 'Error submitting form');
        setMessage('');
      }

      setCurrencyId('')
      setAmount('')
      setNotes('')

    } catch (error) {
      console.error('Network error:', error);
      setError('Network error. Please try again');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal Transaction Form"
      className="modal-content"
      overlayClassName="modal-overlay"
    >
      <h2>Topup</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        <select
          name="currency"
          value={currencyId}
          onChange={(e) => setCurrencyId(e.target.value)}
        >
          <option value="">Select Currency</option>
          {currencyData.map((currency) => (
            <option key={currency.id} value={currency.id}>
              {currency.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          min="0"
          step="any"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}

          <div className="button-group">
            <button type="submit">Submit</button>
            <button onClick={onRequestClose} className="close-button">Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalTopup;