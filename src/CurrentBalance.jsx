import React, { useEffect } from 'react';
import './CurrentBalance.css';

const CurrentBalance = ({ balance }) => {
    useEffect(() => {
        if (balance < 0) {
            alert('残高不足です。');
            const confirmRedirect = window.confirm('レイクのページに移動しますか？');
            if (confirmRedirect) {
                window.open('https://lakealsa.com/', '_blank');
            }
        }
    }, [balance]);

    const balanceStyle = {
        color: balance < 0 ? 'red' : 'black'
    };

    return (
        <div className="current-balance" style={balanceStyle}>
            現在の残高: {balance}円
        </div>
    );
};

export default CurrentBalance;
