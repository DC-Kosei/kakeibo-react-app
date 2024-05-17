// TransactionGraph.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TransactionGraph = ({ transactions }) => {
    const monthlyCategoryData = transactions.reduce((acc, transaction) => {
        if (!transaction.date) return acc; // Skip transactions without a date

        const date = new Date(transaction.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const key = `${year}-${month}`;
        const { category, type, amount } = transaction;

        if (!acc[key]) {
            acc[key] = { month: `${year}-${month}`, categories: {} };
        }
        if (!acc[key].categories[category]) {
            acc[key].categories[category] = { category, income: 0, expense: 0 };
        }
        if (type === 'income') {
            acc[key].categories[category].income += amount;
        } else {
            acc[key].categories[category].expense += amount;
        }
        return acc;
    }, {});

    const sortedData = Object.entries(monthlyCategoryData).flatMap(([month, data]) => {
        return Object.entries(data.categories).map(([category, values]) => ({
            month,
            category,
            ...values,
        }));
    }).sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA - dateB;
    });

    return (
        <div>
            <h2>月ごとのカテゴリ収支グラフ</h2>
            <BarChart width={1000} height={500} data={sortedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={CustomTooltip} />
                <Legend />
                <Bar dataKey="income" stackId="a" fill="#8884d8" name="収入" />
                <Bar dataKey="expense" stackId="a" fill="#82ca9d" name="支出" />
            </BarChart>
        </div>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const { month, category, income, expense } = payload[0].payload;
        return (
            <div className="custom-tooltip">
                <p>{`月: ${month}`}</p>
                <p>{`カテゴリ: ${category}`}</p>
                <p>{`収入: ¥${income}`}</p>
                <p>{`支出: ¥${expense}`}</p>
            </div>
        );
    }

    return null;
};

export default TransactionGraph;
