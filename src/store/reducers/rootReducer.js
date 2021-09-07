import { combineReducers } from 'redux';
import authReducer from './authReducer';
import messageReducer from './messageReducer';
import peopleReducer from './peopleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  messages: messageReducer,
  people: peopleReducer,
});

export default rootReducer;
