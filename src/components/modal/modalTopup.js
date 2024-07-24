import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Ensure accessibility

const ModalTopupForm = ({ isOpen, onRequestClose }) => {
  const [amount, setAmount] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const [notes, setNotes] = useState('');
  const [currencies, setCurrencies] = useState([]);
  const [username] = useState('john_doe'); 
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  // Fetch currencies on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/masterdata/currencies`);
        const result = await response.json();
        if (response.ok) {
          setCurrencies(result.data); // Adjust according to your response structure
        } else {
          console.error('Error fetching currencies:', result);
        }
      } catch (error) {
        console.error('Network error fetching currencies:', error);
      }
    };

    fetchCurrencies();
  }, [apiUrl]);

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
      const response = await fetch(`${apiUrl}/api/transactions/topup`, {
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
      <h2>Topup</h2>
      <form onSubmit={handleSubmit}>
        <select
          name="currency"
          value={currencyId}
          onChange={(e) => setCurrencyId(e.target.value)}
        >
          <option value="">Select Currency</option>
          {currencies.map((currency) => (
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
        />
        <br />
        <textarea
          name="notes"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ModalTopupForm;