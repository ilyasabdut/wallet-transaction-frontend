import { useState, useEffect } from 'react';

const useTopUsersData = (apiUrl) => {
  const [topUsersData, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/transactions/top-users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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
  }, [apiUrl]);

  return { topUsersData, loading, error };
};

export default useTopUsersData;