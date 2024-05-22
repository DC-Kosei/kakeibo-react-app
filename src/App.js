import React, { useState, useEffect } from 'react';
import './index.css';
import TransactionForm from './TransactionForm';
import TransactionTable from './TransactionTable';
import TransactionGraph from './TransactionGraph';
import TransactionExporter from './TransactionExporter';
import EditTransactionForm from './EditTransactionForm';
import CurrentBalance from './CurrentBalance'; // 追加

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState(['食費', '交通費', '遊楽費']); // 初期カテゴリ
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [balance, setBalance] = useState(0); // 残高を管理

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    const storedCategories = JSON.parse(localStorage.getItem('categories'));
    if (storedTransactions) {
      setTransactions(storedTransactions);
    }
    if (storedCategories) {
      setCategories(storedCategories);
    }
    // 初回ロード時に残高を計算する
    calculateBalance(storedTransactions);
  }, []);

  // 残高を計算する関数
  const calculateBalance = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
    setBalance(totalIncome - totalExpense);
  };

  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    calculateBalance(updatedTransactions); // トランザクションが追加されたら残高を再計算
  };

  const deleteTransaction = (index) => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
    calculateBalance(newTransactions); // トランザクションが削除されたら残高を再計算
  };

  const editTransaction = (index, updatedTransaction) => {
    const newTransactions = [...transactions];
    newTransactions[index] = updatedTransaction;
    setTransactions(newTransactions);
    setEditingTransaction(null);
    localStorage.setItem('transactions', JSON.stringify(newTransactions));
    calculateBalance(newTransactions); // トランザクションが編集されたら残高を再計算
  };

  const addCategory = (category) => {
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  return (
    <div>
      <h1 className='title-frame'>家計簿管理アプリ</h1>
      {/* 現在の残高を表示 */}
      <CurrentBalance balance={balance} />
      <TransactionForm onAddTransaction={addTransaction} categories={categories} onAddCategory={addCategory} />
      <div style={{ marginBottom: '20px' }}></div>
      <TransactionExporter transactions={transactions} />
      <TransactionTable
        transactions={transactions}
        categories={categories}
        onDelete={deleteTransaction}
        onEdit={(index) => setEditingTransaction(transactions[index])}
        onTransactionChange={(updatedTransactions) => calculateBalance(updatedTransactions)} // トランザクションが変更されたら残高を再計算
      />
      {editingTransaction && (
        <EditTransactionForm
          transaction={editingTransaction}
          onUpdate={(updatedTransaction) => {
            const index = transactions.findIndex(t => t.id === editingTransaction.id);
            editTransaction(index, updatedTransaction);
          }}
          onCancel={() => setEditingTransaction(null)}
          categories={categories}
        />
      )}
      <TransactionGraph transactions={transactions} />
    </div>
  );
};

export default App;