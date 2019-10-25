import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// approves nonprofits
function* approveNonprofit (action) {
    try {
        yield axios.put(`/api/admin/approve/${action.payload}`);
        yield put({
            type: 'GET_NONPROFIT_REQUESTS'
        });
    } catch (error) {
        console.log('error in approveNonprofit PUT', error)
    }
}

//deletes declined nonprofit requests
function* declineNonprofit(action) {
    try {
        yield axios.delete(`/api/admin/decline/${action.payload}`);
        yield put({
            type: 'GET_NONPROFIT_REQUESTS'
        });
        yield put({ type: 'GET_ADMIN_DIRECTORY', });
    }
    catch(error) {
        console.log('error in declineNonprofit', error)
    }
}

//gets the nonprofit requests that are still pending
function* getNonprofitRequests() {
    try {
        let response = yield axios.get(`/api/admin/requests`);
        yield put({
            type: 'SET_REQUESTS',
            payload: response.data
        })
    }
    catch(error) {
        console.log('error on getNonprofits', error)
    }
}

//worker saga: requests all nonprofits from database, ordered by when they were last updated
function* getAdminDirectory() {
    try {
        let response = yield axios.get('/api/admin/directory');
        yield put({ type: 'SET_ADMIN_DIRECTORY', payload: response.data })
    } catch (error) {
        console.log('error in getNonprofitDirectory', error);
    }
}

//root saga
function* adminSaga () {
    yield takeLatest('APPROVE_NONPROFIT', approveNonprofit);
    yield takeLatest('DECLINE_NONPROFIT', declineNonprofit);
    yield takeLatest('GET_NONPROFIT_REQUESTS', getNonprofitRequests);
    yield takeLatest('GET_ADMIN_DIRECTORY', getAdminDirectory);
}

export default adminSaga;