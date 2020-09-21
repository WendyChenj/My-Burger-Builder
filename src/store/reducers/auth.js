import * as actionTypes from '../action/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: 
            return {
                ...state,
                loading: true,
                error: null,
            };
        case actionTypes.AUTH_SUCCESS: 
            return {
                ...state,
                token: action.authData.idToken,
                userId: action.authData.localId,
                error: null,
                loading: false,
            };
        case actionTypes.AUTH_FAIL: 
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case actionTypes.AUTH_LOG_OUT: 
            return {
                ...state,
                token: null,
                userId: null,
            }
        default:
            return state;
    }
}

export default reducer;