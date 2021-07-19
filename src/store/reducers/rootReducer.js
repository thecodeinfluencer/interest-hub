import { combineReducers } from 'redux';

import authReducer from './authReducer';
import forumsReducer from './forumsReducer';
import messageReducer from './messageReducer';
import peopleReducer from './peopleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  forums: forumsReducer,
  messages: messageReducer,
  people: peopleReducer,
});

export default rootReducer;
