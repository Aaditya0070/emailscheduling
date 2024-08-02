const initialState = {
    emails: [],
    email: null,
    loading: true,
    error: null
  };
  
  export const emailReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SCHEDULE_EMAIL_SUCCESS':
        return { ...state, loading: false };
      case 'FETCH_SCHEDULED_EMAILS_SUCCESS':
        return { ...state, emails: action.payload.emails, loading: false };
      case 'FETCH_SCHEDULED_EMAIL_SUCCESS':
        return { ...state, email: action.payload.email, loading: false };
      case 'CANCEL_SCHEDULED_EMAIL_SUCCESS':
        return { ...state, loading: false };
      case 'SCHEDULE_EMAIL_FAIL':
      case 'FETCH_SCHEDULED_EMAILS_FAIL':
      case 'FETCH_SCHEDULED_EMAIL_FAIL':
      case 'CANCEL_SCHEDULED_EMAIL_FAIL':
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  