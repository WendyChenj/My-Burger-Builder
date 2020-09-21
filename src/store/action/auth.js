import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    }
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData,
    }
};

export const authFail = ( error ) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogOut = () => {
    return {
        type: actionTypes.AUTH_LOG_OUT,
    }
}

export const expirationLogOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogOut());
        }, expirationTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCObQPJwCWBw16K6HheU1Bp8sDqJQUg_uM';
        
        if (!isSignUp) { url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCObQPJwCWBw16K6HheU1Bp8sDqJQUg_uM'; }

        axios.post(url, authData)
             .then ( response => {
                 console.log(response);
                 dispatch(authSuccess(response.data));
                 dispatch(expirationLogOut(response.data.expiresIn));
             })
             .catch( error => {
                 dispatch(authFail(error.response.data.error));
             });        
    }
}