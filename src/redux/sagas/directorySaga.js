import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//worker saga: requests all approved nonprofits from the database and sends the list to the directory reducer
function* getDirectory() {
  try {
    let response = yield axios.get('/api/directory');
    yield put({ type: 'SET_DIRECTORY', payload: response.data});
  } catch (error) {
    console.log('error in getDirectory', error);
  }
}

function* search(action) {
  try {
    let response = yield axios.get(`/api/directory?q=${action.payload}`);
    yield put({
      type: 'SET_DIRECTORY',
      payload: response.data
    });
    yield put({ type: 'SET_ADMIN_DIRECTORY', payload: response.data });
  } catch (error) {
    console.log('error in search request', error);
  }
}

//root saga
function* directorySaga(){
  yield takeLatest('GET_DIRECTORY', getDirectory);
  yield takeLatest('SEARCH', search);
}

export default directorySaga;