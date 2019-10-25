import { combineReducers } from "redux";

const admin = (state = [], action) => {
    switch(action.type) {
        case 'SET_REQUESTS' :
            return action.payload;
        default :
            return state;
    }
}

const adminDirectory = (state = [], action) => {
    switch (action.type) {
        case 'SET_ADMIN_DIRECTORY':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    admin,
    adminDirectory,
});