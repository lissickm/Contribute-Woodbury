import { combineReducers } from 'redux';

const eventDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_EVENT_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  eventDetails,
});