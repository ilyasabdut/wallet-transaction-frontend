import React from 'react';
import Widget from '../components/Widget'; // Assuming Widget is for balance
import useBalanceData from '../hooks/useBalanceData';
import useTopUsersData from '../hooks/useTopUsersData';
import useTopTransactionsData from '../hooks/useTopTransactionsData';
import BarChart from '../components/BarChart'; // Assuming Table is a component to render tables
import BarChartTransactions from '../components/BarChartTransactions'; // Assuming Table is a component to render tables

const Dashboard = () => {
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const { balanceData, loading: balanceLoading, error: balanceError } = useBalanceData(apiUrl);
  const { topUsersData, loading: usersLoading, error: usersError } = useTopUsersData(apiUrl);
  const { topTransactionsData, loading: transactionLoading, error: transactionError } = useTopTransactionsData(apiUrl,'john_doe');

  // Handling loading and error states
  if (balanceLoading || usersLoading || transactionLoading) return <p>Loading...</p>;
  if (balanceError) return <p>Error: {balanceError}</p>;
  if (usersError) return <p>Error: {usersError}</p>;
  if (transactionError) return <p>Error: {transactionError}</p>;

  return (
    <div style={appStyles.container}>

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

        {/* TODO Add name later */}
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
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
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

// const appStyles = {
//     container: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '20px',
//       padding: '20px',
//     },
//     widgetsSection: {
//       display: 'flex',
//       flexWrap: 'wrap',
//       gap: '10px',
//     },
//     topUsersSection: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//       gap: '20px',
//       marginTop: '20px',
//     },
//     currencySection: {
//       marginBottom: '20px',
//       width: '100%',
//       maxWidth: '600px',
//     },
//   };
  