import React from 'react';
import '../styles/TransactionTable.css';

const TransactionTable = ({ transactionData, currentPage, pageSize, handlePageChange, handlePageSizeChange, search, handleSearchChange }) => {
  return (
    <div className="table-container">
      <div>
        <label htmlFor="search">Search:</label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Currency Name</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Sender</th>
            <th>Receiver</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.length > 0 ? (
            transactionData.map(tx => (
              <tr key={tx.tx_id}>
                <td>{tx.tx_id}</td>
                <td>{tx.currency_name}</td>
                <td>{tx.type}</td>
                <td>{tx.amount}</td>
                <td>{tx.from_username}</td>
                <td>{tx.to_username}</td>
                <td>{tx.notes}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No transactions data available.</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination-container">
        <div>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={transactionData.length < pageSize} // Disable if less data than pageSize
          >
            Next
          </button>
          <label htmlFor="pageSize">Page Size:</label>
          <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;