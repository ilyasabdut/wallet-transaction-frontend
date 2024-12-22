import { useState, useEffect } from 'react';

const useTopTransactionsData = (apiUrl,isModalOpenTransfer,isModalOpenTopup) => {
  const [topTransactionsData, setTopTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopTransactions = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');
        const response = await fetch(`${apiUrl}/transactions/top-transactions?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
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

    fetchTopTransactions();
  }, [apiUrl,isModalOpenTransfer,isModalOpenTopup]);

  return { topTransactionsData, loading, error };
};

export default useTopTransactionsData;