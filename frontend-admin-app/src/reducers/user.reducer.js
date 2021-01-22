import { userConstants } from "../actions/constants"

const initialState = {
    error: '',
    message: '',
    loading: false
}

export default (state=initialState, action) => {
    console.log('request', action.type);
    switch(action.type) {
        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;

        case userConstants.USER_REGISTER_SUCCESS: 
             state = {
                 ...state,
                 loading: false,
                 message: action.payload.message
             }
             break;
        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
        
    }

    return state;
}