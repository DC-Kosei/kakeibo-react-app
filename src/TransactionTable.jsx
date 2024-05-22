// TransactionTable.js
import React, { useState } from 'react';
import EditTransactionForm from './EditTransactionForm';
import './TransactionTable.css';

const TransactionTable = ({ transactions, categories, onDelete, onEdit }) => {
    const [editIndex, setEditIndex] = useState(null);
    const [sortBy, setSortBy] = useState('date'); // 初期ソートキーは日付
    const [sortDirection, setSortDirection] = useState('asc'); // 初期ソート方向は昇順
    const [searchTerm, setSearchTerm] = useState(''); // 検索用の状態

    const handleEdit = (index) => {
        setEditIndex(index);
    };

    const handleUpdate = (updatedTransaction) => {
        onEdit(editIndex, updatedTransaction);
        setEditIndex(null);
    };

    const handleCancel = () => {
        setEditIndex(null);
    };

    const handleToggleSort = (key) => {
        // 現在のソートキーとトグルする
        if (sortBy === key) {
            // ソートキーが同じ場合は方向をトグル
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            // 新しいソートキーに切り替える
            setSortBy(key);
            setSortDirection('asc'); // 初期化
        }
    };

    const handleDelete = (index) => {
        const confirmDelete = window.confirm('本当に削除してもよろしいですか？');
        if (confirmDelete) {
            onDelete(index);
        }
    };

    // ソート関数
    const sortFunction = (a, b) => {
        const sortOrder = sortDirection === 'asc' ? 1 : -1;
        // 数値の場合は直接比較、文字列の場合はロケールで比較
        const compareResult = a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
        return compareResult * sortOrder;
    };

    const sortedTransactions = [...transactions].sort(sortFunction);

    // タイトル検索によるフィルタリング
    const filteredTransactions = sortedTransactions.filter(transaction => transaction.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <>
            {/* 検索用の入力フィールド */}
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
                    {filteredTransactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.date.split('T')[0]}</td>
                            <td>{transaction.title}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.category}</td>
                            <td>{transaction.type === 'income' ? '収入' : '支出'}</td>
                            <td>
                                <button onClick={() => handleEdit(index)}>編集</button>
                                <button onClick={() => handleDelete(index)}>削除</button>
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
