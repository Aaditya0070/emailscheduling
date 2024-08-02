const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const cron = require('node-cron');
const { Email } = require('./models/email');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://adisuperb67:<123malekithri917@cluster0.qsozmb2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-password'
  }
});

app.post('/api/schedule-email', async (req, res) => {
  const { recipient, subject, body, attachments, scheduleTime, recurrence } = req.body;
  const email = new Email({ recipient, subject, body, attachments, scheduleTime, recurrence, status: 'scheduled' });
  await email.save();

  // Schedule email sending
  scheduleEmail(email);

  res.json({ success: true, message: 'Email scheduled successfully', emailId: email._id });
});

app.get('/api/scheduled-emails', async (req, res) => {
  const emails = await Email.find();
  res.json({ emails });
});

app.get('/api/scheduled-emails/:id', async (req, res) => {
  const email = await Email.findById(req.params.id);
  res.json({ email });
});

app.delete('/api/scheduled-emails/:id', async (req, res) => {
  await Email.findByIdAndUpdate(req.params.id, { status: 'cancelled' });
  res.json({ success: true, message: 'Email cancelled successfully' });
});

function scheduleEmail(email) {
  const scheduleTime = new Date(email.scheduleTime);
  const cronTime = `${scheduleTime.getSeconds()} ${scheduleTime.getMinutes()} ${scheduleTime.getHours()} ${scheduleTime.getDate()} ${scheduleTime.getMonth() + 1} *`;
  cron.schedule(cronTime, async () => {
    if (email.status === 'scheduled') {
      await transporter.sendMail({
        from: 'your-email@gmail.com',
        to: email.recipient,
        subject: email.subject,
        text: email.body,
        attachments: email.attachments.map(att => ({ path: att }))
      });
      email.status = 'sent';
      await email.save();
    }
  });
}

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
