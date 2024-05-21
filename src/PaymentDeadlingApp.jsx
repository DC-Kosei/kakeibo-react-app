import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentDeadlineForm from './PaymentDeadlineForm';

const PaymentDeadlineApp = () => {
    const [deadlines, setDeadlines] = useState([]);

    useEffect(() => {
        const storedDeadlines = JSON.parse(localStorage.getItem('paymentDeadlines')) || [];
        setDeadlines(storedDeadlines);
    }, []);

    const setPaymentDeadline = async (deadline) => {
        try {
            await axios.post('http://localhost:5000/set-payment-deadline', { deadline });
            alert('支払期限の通知を設定しました！');
            const updatedDeadlines = [...deadlines, { ...deadline, status: 'Sent' }];
            setDeadlines(updatedDeadlines);
            localStorage.setItem('paymentDeadlines', JSON.stringify(updatedDeadlines));
        } catch (error) {
            alert('通知の送信に失敗しました。詳細をコンソールで確認してください。');
            console.error('Failed to set payment deadline notification:', error);
            const updatedDeadlines = [...deadlines, { ...deadline, status: 'Failed' }];
            setDeadlines(updatedDeadlines);
            localStorage.setItem('paymentDeadlines', JSON.stringify(updatedDeadlines));
        }
    };

    return (
        <div>
            <h1>支払期限管理</h1>
            <PaymentDeadlineForm onSubmit={setPaymentDeadline} />
            <ul>
                {deadlines.map((deadline, index) => (
                    <li key={index}>
                        {deadline.date} - {deadline.content} {deadline.status === 'Sent' ? '[送信済]' : '[未送信]'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PaymentDeadlineApp;
