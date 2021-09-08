import { combineReducers } from 'redux';
import authReducer from './authReducer';
import eventsReducer from './eventReducers';
import groupsReducer from './groupReducers';
import messageReducer from './messageReducer';
import peopleReducer from './peopleReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  messages: messageReducer,
  people: peopleReducer,
  groups: groupsReducer,
  events: eventsReducer,
});

export default rootReducer;
