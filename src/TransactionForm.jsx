import React, { useState, useEffect } from 'react';
import './TransactionForm.css';

const TransactionForm = ({ onAddTransaction, categories, onAddCategory }) => {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('income');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState(categories[0] || '');
    const [newCategory, setNewCategory] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const storedTitle = localStorage.getItem('transactionTitle');
        const storedAmount = localStorage.getItem('transactionAmount');
        const storedType = localStorage.getItem('transactionType');
        const storedDate = localStorage.getItem('transactionDate');
        if (storedTitle) setTitle(storedTitle);
        if (storedAmount) setAmount(storedAmount);
        if (storedType) setType(storedType);
        if (storedDate) setDate(storedDate);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount || !date || !category) {
            setError('タイトル、金額、日付、カテゴリを入力してください');
            return;
        }
        const transaction = {
            title,
            amount: parseFloat(amount),
            type,
            date: new Date(date).toISOString(),
            category,
        };
        onAddTransaction(transaction);
        setTitle('');
        setAmount('');
        setDate('');
        setCategory(categories[0] || '');
        setError('');
        localStorage.setItem('transactionTitle', '');
        localStorage.setItem('transactionAmount', '');
        localStorage.setItem('transactionType', 'income');
        localStorage.setItem('transactionDate', '');
    };

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategory && !categories.includes(newCategory)) {
            onAddCategory(newCategory);
            setCategory(newCategory);
            setNewCategory('');
        }
    };

    return (
        <>
            {error && <p className="error">{error}</p>}
            <form className="transaction-form" onSubmit={handleSubmit}>
                <input type="text" placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="number" placeholder="金額" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="income">収入</option>
                    <option value="expense">支出</option>
                </select>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">カテゴリを選択</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="新しいカテゴリ"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button type="button" onClick={handleAddCategory}>カテゴリ追加</button>
                <button type="submit">追加</button>
            </form>
        </>
    );
};

export default TransactionForm;
