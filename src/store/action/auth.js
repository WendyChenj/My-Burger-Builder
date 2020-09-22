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
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expirationDate");
    return {
        type: actionTypes.AUTH_LOG_OUT,
    }
}

export const expirationLogOut = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogOut());
        }, parseInt(expirationTime) * 1000);
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
                 localStorage.setItem("token", response.data.idToken);
                 localStorage.setItem("userId", response.data.localId);
                 localStorage.setItem("expirationDate", new Date( parseInt(Date.now()) + parseInt(response.data.expiresIn) * 1000 ));
                 dispatch(authSuccess(response.data));
                 dispatch(expirationLogOut(response.data.expiresIn));
             })
             .catch( error => {
                 dispatch(authFail(error.response.data.error));
             });        
    }
}

export const checkAuthStatus = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.log("[test] no token");
            dispatch(authLogOut());
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate < new Date()) {
                dispatch(authLogOut());
            } else {
                const authData = {
                    idToken: localStorage.getItem("token"),
                    localId: localStorage.getItem("userId"),
                }
                dispatch(authSuccess(authData));
                dispatch(expirationLogOut(new Date(expirationDate).getMilliseconds() - Date.now()));
            } 
        }
    }
}