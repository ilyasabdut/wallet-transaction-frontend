import { useState, useEffect } from 'react';

const useTopUsersData = (apiUrl,isModalOpenTransfer,isModalOpenTopup) => {
  const [topUsersData, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const accessToken = localStorage.getItem('access_token');

        const response = await fetch(`${apiUrl}/transactions/top-users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setTopUsers(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, [apiUrl,isModalOpenTransfer,isModalOpenTopup]);

  return { topUsersData, loading, error };
};

export default useTopUsersData;