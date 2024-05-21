import React, { useState } from 'react';

const PaymentDeadlineForm = ({ onSubmit }) => {
    const [deadline, setDeadline] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const now = new Date();
        const selectedDate = new Date(deadline);
        if (selectedDate < now) {
            alert('過去の日程は設定できません。');
            return;
        }
        onSubmit({ date: deadline, content });
        setDeadline('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>支払期限：</label>
                <input
                    type="datetime-local"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>内容：</label>
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">設定</button>
        </form>
    );
};

export default PaymentDeadlineForm;
