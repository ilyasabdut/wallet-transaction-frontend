import React from 'react';
import Widget from '../components/Widget'; 
import useBalanceData from '../hooks/useBalanceData';
import useTopUsersData from '../hooks/useTopUsersData';
import useTopTransactionsData from '../hooks/useTopTransactionsData';
import BarChart from '../components/BarChart'; 
import BarChartTransactions from '../components/BarChartTransactions'; 

const Dashboard = () => {
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const { balanceData, loading: balanceLoading, error: balanceError } = useBalanceData(apiUrl);
  const { topUsersData, loading: usersLoading, error: usersError } = useTopUsersData(apiUrl);
  const { topTransactionsData, loading: transactionLoading, error: transactionError } = useTopTransactionsData(apiUrl);
  const username = localStorage.getItem('username');
  // Handling loading and error states
  if (balanceLoading || usersLoading || transactionLoading) return <p>Loading...</p>;
  if (balanceError) return <p>Error: {balanceError}</p>;
  if (usersError) return <p>Error: {usersError}</p>;
  if (transactionError) return <p>Error: {transactionError}</p>;

  return (
    <div style={appStyles.container}>
      <h2>Hi, {username}</h2>
      <h2>Balance Overview</h2>
      <div style={appStyles.balanceSection}>
        {balanceData.map((item, index) => (
          <Widget
            key={index}
            title={item.currency}
            value={item.balance}
          />
        ))}
      </div>

      <h2>Top Users By Total Debit</h2>
      <div style={appStyles.topUsersSection}>
        {topUsersData.length > 0 ? (
          topUsersData.map((currencyData, index) => {
            const { currency, top_users } = currencyData;
            return (
              <div key={index} style={appStyles.currencySection}>
                <h3>{currency}</h3>
                <BarChart data={top_users} />
              </div>
            );
          })
        ) : (
          <p>No top users data available.</p>
        )}
      </div>

      <h2>Top Transactions</h2>
      <div style={appStyles.topUsersSection}>
      {topTransactionsData.length > 0 ? (
          topTransactionsData.map((currencyData, index) => {
            const { currency, top_transactions } = currencyData;
            return (
              <div key={index} style={appStyles.currencySection}>
                <h3>{currency}</h3>
                <BarChartTransactions data={top_transactions} />
              </div>
            );
          })
        ) : (
          <p>No top users data available.</p>
        )}
      </div>

    </div>
  );
};

const appStyles = {
  container: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  balanceSection: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
  },
  topUsersSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(600px, 1fr))',
    gap: '20px',
    marginTop: '20px',
  },
  currencySection: {
    marginBottom: '20px',
    width: '100%',
    maxWidth: '600px',
  },
};

export default Dashboard;
