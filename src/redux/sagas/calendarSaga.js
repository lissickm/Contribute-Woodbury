import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//worker saga: requests all events that are no older than 30 days
function* getCalendar() {
  try {
    let response = yield axios.get('/api/event/calendar');
    yield put({ type: 'SET_CALENDAR', payload: response.data });
  } catch (error) {
    console.log('error in get calander', error)
  }
}

//root saga
function* calendarSaga() {
  yield takeLatest('GET_CALENDAR', getCalendar);
}

export default calendarSaga;