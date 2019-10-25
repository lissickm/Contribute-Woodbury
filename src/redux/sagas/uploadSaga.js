import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* imageUpload(action) {
    try {
        let response = yield axios.post('/api/upload', action.payload)
        console.log('uploaded image URL is:', response.data);
        yield put({
            type: 'SET_UPLOADED_FILE',
            payload: response.data
        })
    } catch (error) {
        console.log('error in imageUpload saga:', error);
    }
}


//root saga
function* uploadSaga() {
    yield takeLatest('IMAGE_UPLOAD', imageUpload);
}

export default uploadSaga;