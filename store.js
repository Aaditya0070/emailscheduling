import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { emailReducer } from './reducer/emailReducer';

const rootReducer = combineReducers({
  email: emailReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
