import axios from 'axios';

export const scheduleEmail = (emailData) => async( dispatch ) => {
  try {
    const res = await axios.post('http://localhost:3000/api/schedule-email', emailData);
    dispatch({ type: 'SCHEDULE_EMAIL_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'SCHEDULE_EMAIL_FAIL', payload: error.response.data });
  }
};

export const fetchScheduledEmails = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:3000/api/scheduled-emails');
    dispatch({ type: 'FETCH_SCHEDULED_EMAILS_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_SCHEDULED_EMAILS_FAIL', payload: error.response.data });
  }
};

export const fetchScheduledEmail = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3000/api/scheduled-emails/${id}`);
    dispatch({ type: 'FETCH_SCHEDULED_EMAIL_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'FETCH_SCHEDULED_EMAIL_FAIL', payload: error.response.data });
  }
};

export const cancelScheduledEmail = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`http://localhost:3000/api/scheduled-emails/${id}`);
    dispatch({ type: 'CANCEL_SCHEDULED_EMAIL_SUCCESS', payload: res.data });
  } catch (error) {
    dispatch({ type: 'CANCEL_SCHEDULED_EMAIL_FAIL', payload: error.response.data });
  }
};





