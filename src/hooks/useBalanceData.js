import { useState, useEffect } from 'react';

const useBalanceData = (apiUrl,isModalOpenTransfer,isModalOpenTopup) => {
  const [balanceData, setBalanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');

        const response = await fetch(`${apiUrl}/api/transactions/balance?username=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setBalanceData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [apiUrl,isModalOpenTransfer,isModalOpenTopup]);

  return { balanceData, loading, error };
};

export default useBalanceData;