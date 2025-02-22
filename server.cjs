// server.js
const express = require('express');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Parse JSON bodies
app.use(express.json());

// Twilio credentials from .env file
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const senderPhone = process.env.TWILIO_PHONE_NUMBER;

// Hard-coded recipient phone number in E.164 format
const recipientPhone = '+14074071234';

const client = twilio(accountSid, authToken);

app.post('/api/send-sms', (req, res) => {
  const { orderDetails } = req.body;
  if (!orderDetails) {
    return res.status(400).json({ error: 'Order details are required.' });
  }

  const messageBody = `Weekly Meal Order: ${orderDetails}`;

  client.messages
    .create({
      body: messageBody,
      from: senderPhone,
      to: recipientPhone,
    })
    .then((message) => {
      res.json({ success: true, message: `SMS sent! Message SID: ${message.sid}` });
    })
    .catch((error) => {
      console.error('Twilio error:', error);
      res.status(500).json({ success: false, error: error.message });
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
