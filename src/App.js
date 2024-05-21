import React, { useState, useEffect } from 'react';
import './index.css';
import TransactionForm from './TransactionForm';
import TransactionTable from './TransactionTable';
import TransactionGraph from './TransactionGraph';
import TransactionExporter from './TransactionExporter';
import PaymentDeadlineApp from './PaymentDeadlingApp';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState(['食費', '交通費', '遊楽費']); // 初期カテゴリ

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    if (storedTransactions) {
      setTransactions(storedTransactions);
    }
    if (storedCategories) {
      setCategories(storedCategories);
    }
  }, []);

  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const deleteTransaction = (index) => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const editTransaction = (index, updatedTransaction) => {
    const newTransactions = [...transactions];
    newTransactions[index] = updatedTransaction;
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
  };

  const addCategory = (category) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  return (
    <div>
      
      <h1 className='title-frame'>家計簿管理アプリ</h1>
      <PaymentDeadlineApp/>


      <TransactionForm onAddTransaction={addTransaction} categories={categories} onAddCategory={addCategory} />
      <div style={{ marginBottom: '20px' }}></div>
      <TransactionExporter transactions={transactions} />
      <TransactionTable transactions={transactions} onDelete={deleteTransaction} onEdit={editTransaction} />
      <TransactionGraph transactions={transactions} />
    </div>
  );
};

export default App;
