import { useState, useEffect } from 'react';

const useBalanceData = (apiUrl) => {
  const [balanceData, setBalanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/transactions/balance`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
  }, [apiUrl]);

  return { balanceData, loading, error };
};

export default useBalanceData;