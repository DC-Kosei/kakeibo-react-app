import React, { useState, useEffect } from 'react';
import CurrentBalance from './CurrentBalance';
import TransactionForm from './TransactionForm';
import TransactionTable from './TransactionTable';
import TransactionGraph from './TransactionGraph';
import TransactionExporter from './TransactionExporter';
import './App.css';
import EditTransactionForm from './EditTransactionForm';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [categories, setCategories] = useState(['食費', '交通費', '娯楽', 'その他']);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      setTransactions(JSON.parse(storedTransactions));
    }
  }, []);

  const addTransaction = (transaction) => {
    const newTransactions = [...transactions, transaction];
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
    calculateBalance(newTransactions);
  };

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
    calculateBalance(newTransactions);
  };

  const editTransaction = (id, updatedTransaction) => {
    const newTransactions = transactions.map((transaction) =>
      transaction.id === id ? updatedTransaction : transaction
    );
    setTransactions(newTransactions);
    setEditingTransaction(null);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
    calculateBalance(newTransactions);
  };

  const addCategory = (category) => {
    setCategories([...categories, category]);
  };

  const calculateBalance = (transactions) => {
    const balance = transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
    setBalance(balance);
  };

  return (
    <div>
      <h1 className='title-frame'>家計簿管理アプリ</h1>
      <CurrentBalance balance={balance} />
      <TransactionForm onAddTransaction={addTransaction} categories={categories} onAddCategory={addCategory} />
      <div style={{ marginBottom: '20px' }}></div>
      <TransactionExporter transactions={transactions} />
      <TransactionTable
        transactions={transactions}
        categories={categories}
        onDelete={deleteTransaction}
        onEdit={(id, updatedTransaction) => editTransaction(id, updatedTransaction)}
      />
      {editingTransaction && (
        <EditTransactionForm
          transaction={editingTransaction}
          onUpdate={(updatedTransaction) => editTransaction(updatedTransaction.id, updatedTransaction)}
          onCancel={() => setEditingTransaction(null)}
          categories={categories}
        />
      )}
      <TransactionGraph transactions={transactions} />
    </div>
  );
};

export default App;
