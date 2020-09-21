import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/action/auth';
import './Auth.css';

class Auth extends React.Component {
    state = {
        user: {
            email: {
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
            },
            password: {
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
            },
        },
        isSignUp: true,
        totalFormValid: false,
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (!rules) {
            return true;
        };

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid; 
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isNumberic) {
            const pattern = /^\d{10}$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedUser = {
            ...this.state.user
        };

        updatedUser[inputIdentifier].value = event.target.value;
        updatedUser[inputIdentifier].isValid = this.checkValidity(event.target.value, updatedUser[inputIdentifier].validation);

        let formValidation = true;
        for (let formInput in updatedUser) { 
            formValidation = updatedUser[formInput].isValid && formValidation; 
        }

        this.setState({
            user: updatedUser,
            totalFormValid: formValidation,
        });
    }

    signUpHandler = (event) => {
        event.preventDefault();
        
        this.props.onAuthSignup(this.state.user.email.value, this.state.user.password.value, this.state.isSignUp);
    }

    switchSignModeHandler = () => {
        let newSignMode = !this.state.isSignUp;
        this.setState({
            ...this.state,
            isSignUp: newSignMode,
        });
    }

    render() {
        let signInForm = Object.keys(this.state.user).map(formInputEle => {
            return (
                <div className='userInput-box' key={this.state.user[formInputEle].config.type}>
                    <input type={this.state.user[formInputEle].config.type} 
                        value={this.state.user[formInputEle].value} 
                        onChange={(event) => this.inputChangedHandler(event, formInputEle)}
                        required />
                    <label>{this.state.user[formInputEle].config.placeHolder}</label>
                </div>
                
            );
            
        });

        return (
            <div className='signin-box'> 
                {this.props.isAuthenticate ? <Redirect to='/' /> : null}
                {this.state.isSignUp ? <p>Sign up to MyBurger</p> : <p>Sign in to MyBurger</p> }
                <form onSubmit={this.signUpHandler}>
                    {signInForm}
                    {this.props.error ? <p style={{color: 'red'}}>{this.props.error.message}, PLEASE CHECK!</p>: null}
                    <button type='submit'>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        {this.state.isSignUp ? 'SIGN UP': 'SIGN IN'}
                        </button>
                </form>
                <div className='newUser-box'>
                    { this.state.isSignUp ? 
                        <p>Already have an account?</p> : <p>No account yet? Create a new account!</p>
                    }
                    <button type='submit' style={{letterSpacing: 4}} onClick={this.switchSignModeHandler}>
                        { this.state.isSignUp ? 'SIGN IN': 'SIGN UP'}
                    </button>
                </div>
            </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticate: state.auth.token !== null,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthSignup: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);