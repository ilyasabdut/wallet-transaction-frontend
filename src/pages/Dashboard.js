import React, { useState } from 'react';
import Widget from '../components/Widget';
import useBalanceData from '../hooks/useBalanceData';
import useTopUsersData from '../hooks/useTopUsersData';
import useTopTransactionsData from '../hooks/useTopTransactionsData';
import useTransactionListData from '../hooks/useTransactionListData';
import BarChart from '../components/BarChart';
import BarChartTransactions from '../components/BarChartTransactions';
import ModalTransferForm from '../components/modal/ModalTransfer';
import ModalTopup from '../components/modal/modalTopup';
import TransactionTable from '../components/TransactionTable';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const apiUrl = process.env.REACT_APP_BACKEND_URL;
    const { balanceData, loading: balanceLoading, error: balanceError } = useBalanceData(apiUrl);
    const { topUsersData, loading: usersLoading, error: usersError } = useTopUsersData(apiUrl);
    const { topTransactionsData, loading: transactionLoading, error: transactionError } = useTopTransactionsData(apiUrl);

    // Pagination and search state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState('');
    
    const { transactionListData, loading: listTransactionLoading, error: listTransactionError } = useTransactionListData(apiUrl, currentPage, pageSize, search);

    const [isModalOpenTransfer, setIsModalOpenTransfer] = useState(false);
    const [isModalOpenTopup, setIsModalOpenTopup] = useState(false);

    const openModalTransfer = () => setIsModalOpenTransfer(true);
    const closeModalTransfer = () => setIsModalOpenTransfer(false);

    const openModalTopup = () => setIsModalOpenTopup(true);
    const closeModalTopup = () => setIsModalOpenTopup(false);

    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');

    // Handling loading and error states
    if (balanceLoading || usersLoading || transactionLoading || listTransactionLoading) return <p>Loading...</p>;
    if (balanceError) return <p>Error: {balanceError}</p>;
    if (usersError) return <p>Error: {usersError}</p>;
    if (transactionError) return <p>Error: {transactionError}</p>;
    if (listTransactionError) return <p>Error: {listTransactionError}</p>;

    // Handlers for pagination and search
    const handlePageChange = (newPage) => setCurrentPage(newPage);
    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setCurrentPage(1); // Reset to page 1 on page size change
    };
    const handleSearchChange = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1); // Reset to page 1 on search change
    };

    return (
        <div className='container'>
            <h2>Hi, {username}</h2>
            <h2>Balance Overview</h2>
            <div className="button-group">
                <div className='button'>
                    <button onClick={openModalTransfer} className="transfer-button">
                        Transfer
                    </button>
                    <ModalTransferForm
                        isOpen={isModalOpenTransfer}
                        onRequestClose={closeModalTransfer}
                    />
                </div>
                <div className='button'>
                    <button onClick={openModalTopup} className="topup-button">
                        Topup
                    </button>
                    <ModalTopup
                        isOpen={isModalOpenTopup}
                        onRequestClose={closeModalTopup}
                    />
                </div>
            </div>
            <div className='balance-section'>
                {balanceData.map((item, index) => (
                    <Widget
                        key={index}
                        title={item.currency}
                        value={parseFloat(item.balance)}
                    />
                ))}
            </div>

            <h2>Top Transactions</h2>
            <div className='top-users-section'>
                {
                    topTransactionsData.length > 0 ?
                        topTransactionsData.map((currencyData, index) => {
                            const { currency, top_transactions } = currencyData;
                            return Object.keys(top_transactions).length > 0 ? (
                                <div key={index} className='currency-section'>
                                    <h3>{currency}</h3>
                                    <BarChartTransactions data={top_transactions} />
                                </div>
                            ) : null;
                        }) : (
                            <p>No transactions data available.</p>
                        )
                }
            </div>

            <h2>List Transactions</h2>
            <TransactionTable
                transactionData={transactionListData}
                currentPage={currentPage}
                pageSize={pageSize}
                handlePageChange={handlePageChange}
                handlePageSizeChange={handlePageSizeChange}
                search={search}
                handleSearchChange={handleSearchChange}
            />

            <div>
                {role === 'Admin' && (
                    <>
                        <h2>Top Users By Total Debit</h2>
                        <div className='top-users-section'>
                            {topUsersData.length > 0 ? (
                                topUsersData.map((currencyData, index) => {
                                    const { currency, top_users } = currencyData;
                                    return (
                                        <div key={index} className='currency-section'>
                                            <h3>{currency}</h3>
                                            <BarChart data={top_users} />
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No top users data available.</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;