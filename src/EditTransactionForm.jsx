// EditTransactionForm.jsx
import React, { useState } from 'react';
import './EditTransactionForm.css';

const EditTransactionForm = ({ transaction, onUpdate, onCancel, categories }) => {
    const [title, setTitle] = useState(transaction.title);
    const [amount, setAmount] = useState(transaction.amount);
    const [type, setType] = useState(transaction.type);
    const [date, setDate] = useState(transaction.date);
    const [category, setCategory] = useState(transaction.category);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTransaction = {
            ...transaction,
            title,
            amount: parseFloat(amount),
            type,
            date: new Date(date).toISOString(),
            category,
        };
        onUpdate(updatedTransaction); // 更新関数を呼び出す
    };

    return (
        <form className="edit-transaction-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="タイトル" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="number" placeholder="金額" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="income">収入</option>
                <option value="expense">支出</option>
            </select>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((cat, index) => (
                    <option key={index} value={cat}>{cat}</option>
                ))}
            </select>
            <button type="submit">更新</button>
            <button type="button" onClick={onCancel}>キャンセル</button>
        </form>
    );
};

export default EditTransactionForm;
