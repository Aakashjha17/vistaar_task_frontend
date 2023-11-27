import React, { useState, useEffect } from 'react';
import { fetchActiveCustomer, fetchTransactionsByAccount } from '../../api';
import './Dashboard.css';

const CustomerTable = () => {
    const [customers, setCustomers] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await fetchActiveCustomer();
                const data = await response.data.data;
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchCustomers();
    }, []);

    const fetchTransactions = async (accountId) => {
        try {
            const response = await fetchTransactionsByAccount({ account_id: accountId });
            const data = response.data.data;
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const handleAccountClick = (accountId) => {
        setSelectedAccountId(accountId);
        fetchTransactions(accountId);
    };

    return (
        <div>
            <h2>Active Customers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Accounts</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.address}</td>
                            <td>
                                {customer.accounts.map((account) => (
                                    <div key={account}>
                                        <button onClick={() => handleAccountClick(account)}>
                                            {account}
                                        </button>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedAccountId && (
                <div>
                    <h3>Transactions for Account ID: {selectedAccountId}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Amount</th>
                                <th>Transaction Code</th>
                                <th>Symbol</th>
                                <th>Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((account) =>
                                account.transactions.map((transaction) => (
                                    <tr key={transaction._id}>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.transaction_code}</td>
                                        <td>{transaction.symbol}</td>
                                        <td>{transaction.price}</td>
                                        <td>{transaction.total}</td>
                                    </tr>
                                ))
                            )}

                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CustomerTable;
