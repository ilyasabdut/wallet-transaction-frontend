import { useState, useEffect } from 'react';

const useCurrencyData = (apiUrl) => {
  const [currencyData, setCurrencyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const response = await fetch(`${apiUrl}/masterdata/currencies`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setCurrencyData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [apiUrl]);

  return { currencyData, loading, error };
};

export default useCurrencyData;