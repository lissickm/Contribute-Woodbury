import { combineReducers } from "redux";

const uploadedImage = ((state=[], action) => {
    switch(action.type) {
        case 'SET_UPLOADED_FILE' :
            return action.payload
        default :
            return state;
    }
})

export default combineReducers({
    uploadedImage,
})