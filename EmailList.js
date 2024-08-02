import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchScheduledEmails, cancelScheduledEmail } from '../redux/actions/emailActions';

const EmailList = () => {
  const dispatch = useDispatch();
  const { emails, loading, error } = useSelector((state) => state.email);

  useEffect(() => {
    dispatch(fetchScheduledEmails());
  }, [dispatch]);

  const handleCancel = (id) => {
    dispatch(cancelScheduledEmail(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {emails.map((email) => (
        <li key={email.id}>
          {email.recipient} - {email.subject} - {email.scheduleTime}
          <button onClick={() => handleCancel(email.id)}>Cancel</button>
        </li>
      ))}
    </ul>
  );
};

export default EmailList;
