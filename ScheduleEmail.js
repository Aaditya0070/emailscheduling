import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { scheduleEmail } from '../redux/actions/emailActions';

const ScheduleEmail = () => {
  const [formData, setFormData] = useState({
    recipient: '',
    subject: '',
    body: '',
    attachments: [],
    scheduleTime: '',
    recurrence: {
      type: '',
      details: {}
    }
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(scheduleEmail(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="recipient" value={formData.recipient} onChange={handleChange} placeholder="Recipient" required />
      <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
      <textarea name="body" value={formData.body} onChange={handleChange} placeholder="Body" required></textarea>
      <input type="datetime-local" name="scheduleTime" value={formData.scheduleTime} onChange={handleChange} required />
      <button type="submit">Schedule Email</button>
    </form>
  );
};

export default ScheduleEmail;
