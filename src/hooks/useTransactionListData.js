import { useState, useEffect } from 'react';

const useTransactionListData = (apiUrl,currentPage, pageSize, search) => {
  const [transactionListData, setTransactionListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');

        const response = await fetch(`${apiUrl}/api/transactions/list-transaction?username=${username}&page=${currentPage}&pageSize=${pageSize}&search=${search}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setTransactionListData(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBalance();
  }, [apiUrl,currentPage, pageSize, search]);

  return { transactionListData, loading, error };
};

export default useTransactionListData;