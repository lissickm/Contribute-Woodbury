import { put, takeLatest, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//worker saga: requests all volunteer roles for this specific event.
function* getVolunteerRoles(action) {
  try {
    let response = yield axios.get(`/api/volunteer/role/${action.payload}`);
    yield put({ type: 'SET_VOLUNTEER_ROLES', payload: response.data });
  } catch (error) {
    console.log('error in getVolunteerRoles', error);
  }
}

//requests all the volunteers that are signed up for this specific event
function* getSpecificVolunteers(action) {
  try{
    let response = yield axios.get(`/api/volunteer/eventVolunteers/${action.payload.id}/${action.payload.np_id}`)
    yield put({
      type: 'SET_SPECIFIC_VOLUNTEERS',
      payload: response.data
    })
  }
  catch (error) {
    console.log('error in getSpecificVolunteers', error)
  }
}

//adds a new volunteers for specific event
function* addVolunteers(action) {
  try {
    yield axios.post(`/api/volunteer/addVolunteers`, action.payload);
    yield put({
      type: 'GET_EVENT_DETAILS',
      payload: action.payload.event_id
    })
  }
  catch (error) {
    console.log('error in addVoluteers', error)
  }
}

//worker saga: request that new volunteer be added to the database and request for email data/calendar event to be sent out
function* volunteerSignUp(action) {
  try {
    yield axios.post(`/api/volunteer/signup`, action.payload);
    yield put({
      type: 'ADD_SIGNUP',
      payload: action.payload
    })
    yield put({
      type: 'CLEAR_VOLUNTEER'
    })
  } catch (error) {
    console.log('error in volunteerSignUp', error);
  }
}

function* getSpecificVolunteerRole(action) {
  try {
    let response = yield axios.get(`api/volunteer/specificrole/${action.payload}`)
    console.log('what is the response?', response);
    yield put ({
      type: 'SET_SPECIFIC_ROLES',
      payload: response.data[0]
    })
  } catch (error) {
    console.log('in getSpecificVolunteerRole error');
    
  }
}

function* deleteRole(action) {
  try {
    console.log('DELETE ROLE PAYLOAD:', action.payload);
    
    yield axios.delete(`/api/volunteer/deleteRole/${action.payload.role_id}`)
    yield put ({
      type: 'GET_EVENT_DETAILS',
      payload: action.payload.event_id
    })
  } catch (error) {
    console.log('in deleteRole saga error');
  }
}

//root saga
function* volunteerSaga() {
  yield takeEvery('GET_EVENT_DETAILS', getVolunteerRoles);
  yield takeEvery('GET_VOLUNTEER_ROLES', getVolunteerRoles);
  yield takeLatest('GET_SPECIFIC_VOLUNTEERS', getSpecificVolunteers);
  yield takeLatest('GET_SPECIFIC_VOLUNTEER_ROLE', getSpecificVolunteerRole)
  yield takeLatest('ADD_VOLUNTEERS', addVolunteers);
  yield takeLatest('VOLUNTEER_SIGNUP', volunteerSignUp);
  yield takeLatest('DELETE_ROLE', deleteRole);
}

export default volunteerSaga;