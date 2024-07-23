import { useState, useEffect } from 'react';

const useTopTransactionsData = (apiUrl,username) => {
  const [topTransactionsData, setTopTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopTransactions = async (username) => {
      try {
        const response = await fetch(`${apiUrl}/api/transactions/top-transactions/${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setTopTransactions(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTransactions(username); // Assuming you have a username available
  }, [apiUrl,username]);

  return { topTransactionsData, loading, error };
};

export default useTopTransactionsData;