import React, { useState } from 'react';
import EditTransactionForm from './EditTransactionForm';
import './TransactionTable.css';

const TransactionTable = ({ transactions, categories, onDelete, onEdit }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [sortBy, setSortBy] = useState('date');
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');

    const handleEdit = (id) => {
        const index = transactions.findIndex(transaction => transaction.id === id);
        if (index !== -1) {
            setEditIndex(index);
        }
    };

    const handleUpdate = (updatedTransaction) => {
        onEdit(updatedTransaction.id, updatedTransaction);
        setEditIndex(null);
    };

    const handleCancel = () => {
        setEditIndex(null);
    };

    const handleToggleSort = (key) => {
        if (sortBy === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(key);
            setSortDirection('asc');
        }
    };

    const handleDelete = (id) => {
        setTimeout(() => {
            const confirmDelete = window.confirm('本当に削除してもよろしいですか？');
            if (confirmDelete) {
                onDelete(id);
            }
        }, 100);
    };

    const sortFunction = (a, b) => {
        const sortOrder = sortDirection === 'asc' ? 1 : -1;
        const compareResult = a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
        return compareResult * sortOrder;
    };

    const sortedTransactions = [...transactions].sort(sortFunction);

    const filteredTransactions = sortedTransactions.filter(transaction => transaction.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('ja-JP', options);
    };

    return (
        <>
            <input type="text" placeholder="タイトル検索" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

            <table className="transaction-table">
                <thead>
                    <tr>
                        <th onClick={() => handleToggleSort('date')}>日付</th>
                        <th onClick={() => handleToggleSort('title')}>タイトル</th>
                        <th onClick={() => handleToggleSort('amount')}>金額</th>
                        <th onClick={() => handleToggleSort('category')}>カテゴリ</th>
                        <th onClick={() => handleToggleSort('type')}>種類</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{formatDate(transaction.date)}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.amount}円</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.type === 'income' ? '収入' : '支出'}</td>
                            <td>
                                <button onClick={() => handleEdit(transaction.id)}>編集</button>
                                <button onClick={() => handleDelete(transaction.id)}>削除</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editIndex !== null && (
                <EditTransactionForm
                    transaction={transactions[editIndex]}
                    categories={categories}
                    onUpdate={handleUpdate}
                    onCancel={handleCancel}
                />
            )}
        </>
    );
};

export default TransactionTable;
