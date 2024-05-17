import React, { useState } from 'react';
import './TransactionTable.css';

const TransactionTable = ({ transactions, onDelete, onEdit }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    const sortTransactions = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedTransactions = [...transactions].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            if (sortConfig.direction === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        }
        return 0;
    });

    const formatDate = (dateString) => {
        if (!dateString) return '日付なし';
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        return `${year}年${month}月${day}日`;
    };

    const handleDelete = (index) => {
        onDelete(index);
    };

    const handleEdit = (index) => {
        onEdit(index);
    };

    return (
        <table className="transaction-table">
            <thead>
                <tr>
                    <th onClick={() => sortTransactions('date')}>日付</th>
                    <th onClick={() => sortTransactions('title')}>タイトル</th>
                    <th onClick={() => sortTransactions('amount')}>金額</th>
                    <th onClick={() => sortTransactions('category')}>カテゴリ</th>
                    <th onClick={() => sortTransactions('type')}>種類</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                {sortedTransactions.map((transaction, index) => (
                    <tr key={index}>
                        <td>{formatDate(transaction.date)}</td>
                        <td>{transaction.title}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.category}</td>
                        <td>{transaction.type === 'income' ? '収入' : '支出'}</td>
                        <td>
                            <button onClick={() => handleDelete(index)}>削除</button>
                            <button onClick={() => handleEdit(index)}>編集</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TransactionTable;
