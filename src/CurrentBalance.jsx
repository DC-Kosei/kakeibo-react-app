import React, { useEffect } from 'react';
import './CurrentBalance.css';

const CurrentBalance = ({ balance }) => {
    
    useEffect(()=>{
        if(balance <0){
            alert('残高がマイナスになりました！残高不足です。あなたは破産しました。');
        }
    });
    
    return (
        <div className="current-balance">
            現在の残高: {balance}円
        </div>
    );
};

export default CurrentBalance;
