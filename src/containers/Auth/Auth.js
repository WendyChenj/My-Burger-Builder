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
                    placeholder=' '
                    onChange={ (event) => inputChangedHandler(event, formInputEle) }
                    required 
                />
                {/* <label>{ formInputEle.config.placeHolder }</label> */}
                {/* todo: check type: if it's email, then create the className to see if it is valid
                password: check the value length, only >0 <6 appear the wrong info */}

                {/* {formInputEle.config.type === 'email' ? 
                    <div>
                        {(formInputEle.value.length > 1 && formInputEle.isValid) ?
                            null
                            : 
                            <div>
                                <label>{ formInputEle.config.placeHolder }</label>
                                <p className='requirement'> Must be a valid Email Address</p>
                            </div>
                        }
                    </div>
                    :  
                    <div>
                        {(formInputEle.value.length >= 1 && formInputEle.value.length < 6) ? 
                            <div className='requirement'>Your password must contain at least 6 characters</div>
                            : null}
                    </div>
                } */}

                {formInputEle.value.length === 0 ?
                    <label className='no-value-label'>{ formInputEle.config.placeHolder }</label>
                    : 
                    <div>
                        <label className='value-label'>{ formInputEle.config.placeHolder }</label>
                        {formInputEle.isValid ? 
                            null : 
                            <div>
                        { formInputEle.config.type === 'email' ? 
                            <p className='requirement'>Must be a valid Email Address</p>
                            : <p className='requirement'>Your password must contain at least 6 characters</p>}
                    </div>
                            }
                        
                    </div>
                    
                }
                {/* <div className='requirement'>
                    { formInputEle.config.type === 'email' ? 'Must be a valid Email Address' 
                        : <p>Your password must contain at least 6 characters</p>
                    }
                </div> */}
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
            { isSignUp ? <p className='auth-title'>Sign up to MyBurger</p> : <p className='auth-title'>Sign in to MyBurger</p> }
            <form onSubmit={ signUpHandler } className='signin-form'>
                { signInForm }
                { error ? <p style={{color: 'red'}}>{error.message}, PLEASE CHECK!</p>: null }
                <button type='submit' disabled={!totalFormValid}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    { isSignUp ? 'SIGN UP': 'SIGN IN' }
                </button>
            </form>

            <div className='newUser-box'>
                { isSignUp ? 
                    <p className='newUser-auth-title'>Already have an account?</p> : <p className='newUser-auth-title'>No account yet? Create a new account!</p>
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