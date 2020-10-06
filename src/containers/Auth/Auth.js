import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { auth } from '../../store/action/auth';
import './Auth.css';

import { checkValidity } from '../../utility/utility';

const Auth = () => {

    // todo: error warning when totalFormValid is false

    const [ email, setEmail ] = useState({
        value: '',
        config: {
            type: 'email',
            placeHolder: 'Email'
        },
        validation: {
            required: true,
            isEmail: true,
        },
        isValid: false,
    });

    const [ password, setPassword ] = useState({
        value: '',
        config: {
            type: 'password',
            placeHolder: 'Password',
        },
        validation: {
            required: true,
            minLength: 6,
        },
        isValid: false,
    });

    const [ isSignUp, setIsSignUp ] = useState(true);
    const [ totalFormValid, setTotalFormValid ] = useState(false);

    const { error, isAuthenticate, building } = useSelector( state => ({
        error: state.auth.error,
        isAuthenticate: state.auth.token !== null,
        building: state.burgerBuilder.building,
    }));

    const dispatch = useDispatch();

    const inputChangedHandler = (event, inputIdentifier) => {

        switch (inputIdentifier) {
            case email: 
               setEmail({...email, value: event.target.value, isValid: checkValidity(event.target.value, email.validation)});
               break;
            case password: 
               setPassword({...password, value: event.target.value, isValid: checkValidity(event.target.value, password.validation)});
               break;
            default:
               break;
        }

        setTotalFormValid(email.isValid && password.isValid);
    }

    const signUpHandler = (event) => {
        event.preventDefault();
        dispatch( auth(email.value, password.value, isSignUp) );
    };

    const switchSignModeHandler = () => {
        let newSignMode = !isSignUp;
        setIsSignUp(newSignMode);
    }

    const signInForm = [ email, password ].map( formInputEle => {
        return (
            <div className='userInput-box' key={ formInputEle.config.type }>
                <input type={ formInputEle.config.type } 
                    value={ formInputEle.value } 
                    onChange={ (event) => inputChangedHandler(event, formInputEle) }
                    required 
                />
                <label>{ formInputEle.config.placeHolder }</label>
            </div>   
        );
    });

    let redirectAuth = null;

    if (building && isAuthenticate) {
        redirectAuth = <Redirect to='/checkout' />
    } else if (isAuthenticate) {
        redirectAuth = <Redirect to='/' />
    } 

    return (
        <div className='signin-box'> 
            { redirectAuth }
            { isSignUp ? <p>Sign up to MyBurger</p> : <p>Sign in to MyBurger</p> }
            <form onSubmit={ signUpHandler } className='signin-form'>
                { signInForm }
                { error ? <p style={{color: 'red'}}>{error.message}, PLEASE CHECK!</p>: null }
                <button type='submit'>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    { isSignUp ? 'SIGN UP': 'SIGN IN' }
                </button>
            </form>

            <div className='newUser-box'>
                { isSignUp ? 
                    <p>Already have an account?</p> : <p>No account yet? Create a new account!</p>
                }

                <div className='newUser-button'>
                <button type='submit' style={{letterSpacing: 4}} onClick={switchSignModeHandler}>
                    { isSignUp ? 'SIGN IN': 'SIGN UP' }
                </button>
                </div>
            </div>
        </div> 
    );
}

export default Auth;