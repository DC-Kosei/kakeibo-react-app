const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN || '###'; // チャンネルアクセストークンを環境変数から取得

app.post('/set-payment-deadline', async (req, res) => {
    const { deadline } = req.body;

    if (!deadline || !deadline.date || !deadline.content) {
        return res.status(400).send('Invalid request data');
    }

    try {
        await sendLineNotification(deadline);
        res.status(200).send('Notification sent');
    } catch (error) {
        console.error('Failed to send notification:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to send notification');
    }
});

const sendLineNotification = async (deadline) => {
    const message = `支払い期限が近づいています！期限は${deadline.date}です。内容: ${deadline.content}`;

    await axios.post('https://api.line.me/v2/bot/message/push', {
        to: '###', // あなたのLINEユーザーID
        messages: [
            {
                type: 'text',
                text: message,
            },
        ],
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        },
    });
};

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
