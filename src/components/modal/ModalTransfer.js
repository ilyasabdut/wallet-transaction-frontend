import React, { useState } from 'react';
import Modal from 'react-modal';
import useCurrencyData from '../../hooks/useCurrencyData';
import '../../styles/ModalForm.css';

Modal.setAppElement('#root'); // Ensure accessibility

const ModalTransferForm = ({ isOpen, onRequestClose }) => {
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [username, setUsername] = useState('');
  const [amount, setAmount] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const [notes, setNotes] = useState('');
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const { currencyData, loading: currencyLoading, error: currencyError } = useCurrencyData(apiUrl);
  const [usernameFrom] = useState('john_doe'); 
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  if (currencyLoading) return <p>Loading...</p>;
  if (currencyError) return <p>Error: {currencyError}</p>;

  // Handle username validation
  const handleUsernameCheck = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');
      const response = await fetch(`${apiUrl}/api/users/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setIsUsernameValid(true);
        setMessage(result.message || 'Username exist');
        setError('');

      } else {
        setIsUsernameValid(false);
        setMessage('');
        setError(result.message || 'Username does not exist');
      }
    } catch (error) {
      console.error('Error checking username:', error);
      setError('Error checking username. Please try again.');
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      username_from: usernameFrom,
      username_to: username,
      currency_id: Number(currencyId),
      amount: parseFloat(amount),
      type: 'credit',
      notes: notes,
    };

    try {
      const response = await fetch(`${apiUrl}/api/transactions/transfer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Form submitted successfully:', result);
        onRequestClose(); 
      } else {
        console.error('Error submitting form:', result);
        setError(result.message || 'Error submitting form');
      }
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
      <h2>Transfer</h2>
      <form onSubmit={handleSubmit} className="modal-form">
        <input
          type="text"
          name="username"
          placeholder="Send To"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          type="button"
          onClick={handleUsernameCheck}
          disabled={!username}
          className="check-button"
        >
          Check
        </button>
        <select
          name="currency"
          value={currencyId}
          onChange={(e) => setCurrencyId(e.target.value)}
          disabled={!isUsernameValid}
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
          disabled={!isUsernameValid}
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={!isUsernameValid}
        />
          {error && <p className="error">{error}</p>}
          {message && <p className="message">{message}</p>}
          <div className="button-group">
            <button type="submit" disabled={!isUsernameValid}>Submit</button>
            <button onClick={onRequestClose} className="close-button">Close</button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalTransferForm;