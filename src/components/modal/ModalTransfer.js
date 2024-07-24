import React, { useState } from 'react';
import Modal from 'react-modal';
import useCurrencyData from '../../hooks/useCurrencyData';

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

      if (response.ok) {
        setIsUsernameValid(true);
      } else {
        setIsUsernameValid(false);
        alert('Username does not exist');
      }
    } catch (error) {
      console.error('Error checking username:', error);
      alert('Error checking username. Please try again.');
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
        onRequestClose(); // Close the modal after successful submission
      } else {
        console.error('Error submitting form:', result);
        alert(result.message);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Modal Transaction Form"
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          maxWidth: '500px', // Optional: limits modal width
          width: '100%',
        },
      }}
    >
      <h2>Transfer</h2>
      <form onSubmit={handleSubmit}>
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
        >
          Check
        </button>
        <br />
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
        <br />
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
        <br />
        <textarea
          name="notes"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={!isUsernameValid}
        />
        <br />
        <button type="submit" disabled={!isUsernameValid}>Submit</button>
      </form>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ModalTransferForm;