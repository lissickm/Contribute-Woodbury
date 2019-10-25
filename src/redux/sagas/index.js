import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import directorySaga from './directorySaga';
import nonprofitSaga from './nonprofitSaga';
import calendarSaga from './calendarSaga';
import eventSaga from './eventSaga';
import adminSaga from './adminSaga';
import volunteerSaga from './volunteerSaga';
import uploadSaga from './uploadSaga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    directorySaga(),
    nonprofitSaga(),
    calendarSaga(),
    eventSaga(),
    adminSaga(),
    volunteerSaga(),
    uploadSaga(),
  ]);
}
