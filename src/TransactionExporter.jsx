import React from 'react';
import { CSVLink } from 'react-csv';

const TransactionExporter = ({ transactions, graphRef }) => {
    

    const csvHeaders = [
        { label: 'Date', key: 'date' },
        { label: 'Title', key: 'title' },
        { label: 'Amount', key: 'amount' },
        { label: 'Category', key: 'category' },
        { label: 'Type', key: 'type' },
    ];

    const csvData = transactions.map(({ date, title, amount, category, type }) => ({
        date,
        title,
        amount,
        category,
        type: type === 'income' ? 'Income' : 'Expense',
    }));

    return (
        <div>
            <CSVLink data={csvData} headers={csvHeaders} filename={'収入・支出データ.csv'}>
                <button>Export to CSV</button>
            </CSVLink>
        </div>
    );
};

export default TransactionExporter;
