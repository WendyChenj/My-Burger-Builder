import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actionCreator from '../../../store/action/order';

import Address from '../../../components/FormData/Address/Address';
import BurgerIngredient from '../../../components/Burger/BurgerIngredients/BurgerIngredient';
import './ContactData.css';



class ContactData extends React.Component {
    state = {
        customers: {

            name: {
                first_name: {
                    value: '',
                    required: true,
                    valid: false,
                },
                last_name: {
                    value: '',
                    required: true,
                    valid: false,
                },
                totalValid: false,
            },

            email: {
                value: '',
                config: {
                    type: 'email',
                    label: 'email',
                },
                required: true,
                totalValid: false,
            },

            phoneNumber: {
                value: '',
                config: {
                    type: 'email',
                    label: 'email',
                },
                required: true,
                totalValid: false,
            },

            street: {
                streetAddress: {
                    value: '',
                    required: true,
                    valid: false,
                },

                streetAddress_line2: {
                    value: '',
                    required: false,
                    valid: true,
                },

                city: {
                    value: '',
                    required: true,
                    valid: false,
                },

                state: {
                    value: '',
                    required: true,
                    valid: false,
                },

                postal_code: {
                    value: '',
                    required: true,
                    valid: false,
                },

                country: {
                    value: '',
                    required: true,
                    valid: false,
                },
                totalValid: false,
            },

            deliveryMethod: {
                value: '',
                options: ["", 'fastest', 'regular'],
                required: true,
                totalValid: false,
            },

            billing_address: {
                streetAddress: {
                    value: '',
                    required: true,
                    valid: false,
                },

                streetAddress_line2: {
                    value: '',
                    required: false,
                    valid: true,
                },

                city: {
                    value: '',
                    required: true,
                    valid: false,
                },

                state: {
                    value: '',
                    required: true,
                    valid: false,
                },

                postal_code: {
                    value: '',
                    required: true,
                    valid: false,
                },

                country: {
                    value: '',
                    required: true,
                    valid: false,
                },
                selectedOption: 'Yes',
                totalValid: false,
            },

            special_instructions: {
                value: '',
                required: false,
                totalValid: true,
            }
        },
        formIsValid: false,   
    }

    checkValidity = (value, required) => {
        let isValid = false;

        if(required) {
            // trim() removes the white space from both ends of a string
            isValid = value.trim() !== '';
        }
        return isValid;
    }

    validate = (inputIdentifier, newCustomer) => {
        let totalFormValid = true;
        switch (inputIdentifier) {
            case 'name': {
                return (totalFormValid && (newCustomer.name.first_name.valid) && (newCustomer.name.last_name.valid));
            }
            case 'street': {
                return (totalFormValid && (newCustomer.street.streetAddress.valid) && (newCustomer.street.streetAddress_line2.valid)
                && (newCustomer.street.city.valid) && (newCustomer.street.state.valid) && (newCustomer.street.postal_code.valid) 
                && (newCustomer.street.country.valid));
            }
            case 'billing_street': {
                return (totalFormValid && (newCustomer.street.streetAddress.valid) && (newCustomer.street.streetAddress_line2.valid)
                && (newCustomer.street.city.valid) && (newCustomer.street.state.valid) && (newCustomer.street.postal_code.valid) 
                && (newCustomer.street.country.valid));
            }
            default: {
                return totalFormValid;
            }
        }
    }

    changedInputHandler = (event, inputIdentifier, secondIdentifier = null) => {
        let newCustomer = {};
        newCustomer = {...this.state.customers};

        if (secondIdentifier) {
            if (secondIdentifier === 'selectedOption') {
                newCustomer.billing_address.selectedOption = event.target.value;
                if(newCustomer.billing_address.selectedOption === "Yes") {
                    newCustomer.billing_address = {...newCustomer.street, totalValid: newCustomer.billing_address.totalValid, selectedOption: "Yes"}
                } else {
                    newCustomer.billing_address = {...this.state.billing_address, selectedOption: "No"}
                }
            } else {
                let identifier = newCustomer[inputIdentifier][secondIdentifier];
                identifier.value = event.target.value;
                if (!identifier.valid) {
                    identifier.valid = this.checkValidity(event.target.value, this.state.customers[inputIdentifier][secondIdentifier].required);
                }

                if (inputIdentifier === 'street') {
                    newCustomer.billing_address = {...newCustomer.street, selectedOption: 'Yes'}
                }
            }
        } else {
            let identifier = newCustomer[inputIdentifier];
            identifier.value = event.target.value;
            if (!identifier.totalValid) {
                identifier.totalValid = this.checkValidity(event.target.value, this.state.customers[inputIdentifier].required);
            }
        }

        if (secondIdentifier) {
            newCustomer[inputIdentifier].totalValid = this.validate(inputIdentifier, newCustomer);
        } 

        let formValidCheck = true;
        for (let eachInfo in this.state.customers) {
            formValidCheck = (formValidCheck && eachInfo.totalValid);
        }
        
        this.setState({customers: newCustomer, formIsValid: formValidCheck});
    }

    proceedToPayHandler = (event) => {
        event.preventDefault();

        let customerInfo = {name: {first_name: null, last_name: null},
                            street: {streetAddress: null, streetAddress_line2: null, city: null, state: null, postal_code: null, country: null},
                            billing_address: {streetAddress: null, streetAddress_line2: null, city: null, state: null, postal_code: null, country: null},
                            email: null,
                            phoneNumber: null,
                            deliveryMethod: null,
                           };

        for (let info in customerInfo) {
            if (info === 'name' || info === 'street' || info === 'billing_address') {
                for (let subinfo in customerInfo[info]) {
                    customerInfo[info][subinfo] = this.state.customers[info][subinfo].value;
                }
            } else {
                customerInfo[info] = this.state.customers[info].value;
            }
        }

        const orderData = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customers: customerInfo,
        };

        this.props.proceedToPay(orderData, this.props.token);
    }

    render() {

        let burgerInfo = (
            <div className='orderInfo'>
                <p className='order-info-header'>Ingredients:</p>
                <div className='order-info-ingredients'>
                    <p>Salad: x{this.props.ingredients['salad']}</p>
                    <p>Cheese: x{this.props.ingredients['cheese']}</p>
                    <p>Bacon: x{this.props.ingredients['bacon']}</p>
                    <p>Meat: x{this.props.ingredients['meat']}</p>
                </div>
                <p className='order-info-header'>Total Price: ${this.props.totalPrice}</p>
            </div>
        );

        let redirectPurchased = this.props.purchased ? <Redirect to='/' /> : null;

        return (
            <div className='form-all'>
                {redirectPurchased}
                <ul className='page-section'>
                    <li id='cid_1' className='form-input-wide'>
                        <div className='form-header-group header-large'>
                            <h2 className='form-header'>
                                Burger Order Form
                            </h2>
                        </div>
                    </li>

                    <li id='cid_2' className='order-display'>
                        <label className='display-label'>My Burger</label>
                        <div className='burger-order-information'>
                            <div className='burger-picture-border'>
                                <div className='burger-picture'>
                                  <BurgerIngredient type="bread-top" />
                                  {Object.keys(this.props.ingredients).map(igKey => {
                                   // the number of each ingredient --> the length of an array
                                   return [ ...Array(parseInt(this.props.ingredients[ igKey ]))].map(
                                    (_, index) => {
                                        return <BurgerIngredient key={igKey + index} type={igKey} />
                                    });
                                   })}
                                   <BurgerIngredient type="bread-bottom" />
                                </div>

                                <div>
                                    {burgerInfo}
                                </div>
                            </div>
                        </div>
                    </li>

                    <li className='contact-form' id='cid_3'>
                        <label className='display-label contact-label'>Contact Information</label>
                        <form onSubmit={this.proceedToPayHandler} className='contact-form-inputs'>
                            <div className='contact-form-line'>
                                <label className='contact-info-header'>Full Name</label>
                                <div className='contact-form-input-wide'>
                                    <div style={{ marginRight: '10%'}}>
                                        <span className='form-sub-label-container'>
                                            <input type='text' name='fullName-first' className='form-box' value={this.state.customers.name.first_name.value} onChange={(event) => this.changedInputHandler(event, 'name', 'first_name')} required/>
                                            <label className='form-sub-label'>First Name</label>
                                        </span>
                                    </div>
                                    <div>
                                        <span className='form-sub-label-container'>
                                            <input type='text' name='fullName-last' className='form-box' value={this.state.customers.name.last_name.value} onChange={(event) => this.changedInputHandler(event, 'name', 'last_name')} required/>
                                            <label className='form-sub-label'>Last Name</label>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='contact-form-line'>
                                <label className='contact-info-header'>Email</label>
                                <div className='contact-form-input-wide'>
                                    <div style={{ marginRight: '10%'}}>
                                        <span className='form-sub-label-container'>
                                            <input type='email' name='email' className='form-box' placeholder='ex: example@example.com' value={this.state.customers.email.value} onChange={(event) => this.changedInputHandler(event, 'email')}/>
                                            <label className='form-sub-label'>example@example.com</label>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className='contact-form-line'>
                                <label className='contact-info-header'>Contact Number</label>
                                <div className='contact-form-input-wide'>
                                    <div style={{ marginRight: '10%'}}>
                                        <span className='form-sub-label-container'>
                                            <input type='tel' name='telephone' className='form-box' placeholder='(000)-000-0000' value={this.state.customers.phoneNumber.value} onChange={(event) => this.changedInputHandler(event, 'phoneNumber')}/>
                                            <label className='form-sub-label'>Phone Number</label>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Address title = 'Billing Address'
                                streetValue={this.state.customers.street.streetAddress.value} streetChanged={(event) => this.changedInputHandler(event, 'street', 'streetAddress')}
                                street2Value={this.state.customers.street.streetAddress_line2.value} street2Changed={(event) => this.changedInputHandler(event, 'street', 'streetAddress_line2')}
                                cityValue={this.state.customers.street.city.value} cityChanged={(event) => this.changedInputHandler(event, 'street', 'city')}
                                stateValue={this.state.customers.street.state.value} stateChanged={(event) => this.changedInputHandler(event, 'street', 'state')}
                                countryValue={this.state.customers.street.country.value} countryChanged={(event) => this.changedInputHandler(event, 'street', 'country')}
                                codeValue={this.state.customers.street.postal_code.value} codeChanged={(event) => this.changedInputHandler(event, 'street', 'postal_code')}
                            /> 

                            <div className='contact-form-line'>
                                <label className='contact-info-header'>Is shipping address same as billing address?</label>
                                <div>
                                    <div className='form-radio-sub-container' style={{ paddingBottom: '4px'}}>
                                        <input type='radio' className='form-radio' value="Yes" 
                                               checked={this.state.customers.billing_address.selectedOption === "Yes"} onChange={(event) => this.changedInputHandler(event, 'billing_address', 'selectedOption')} />
                                        <label className='form-sub-label'>Yes</label>     
                                    </div>

                                    <div className='form-radio-sub-container'>
                                        <input type='radio' className='form-radio' value="No"
                                               checked={this.state.customers.billing_address.selectedOption === "No"} onChange={(event) => this.changedInputHandler(event, 'billing_address', 'selectedOption')} /> 
                                        <label className='form-sub-label'>No</label>  
                                    </div>  
                                </div>
                                {this.state.customers.billing_address.selectedOption === 'No' ? 
                                <Address title = 'Shipping Address'
                                streetValue={this.state.customers.billing_address.streetAddress.value} streetChanged={(event) => this.changedInputHandler(event, 'billing_address', 'streetAddress')}
                                street2Value={this.state.customers.billing_address.streetAddress_line2.value} street2Changed={(event) => this.changedInputHandler(event, 'billing_address', 'streetAddress_line2')}
                                cityValue={this.state.customers.billing_address.city.value} cityChanged={(event) => this.changedInputHandler(event, 'billing_address', 'city')}
                                stateValue={this.state.customers.billing_address.state.value} stateChanged={(event) => this.changedInputHandler(event, 'billing_address', 'state')}
                                countryValue={this.state.customers.billing_address.country.value} countryChanged={(event) => this.changedInputHandler(event, 'billing_address', 'country')}
                                codeValue={this.state.customers.billing_address.postal_code.value} codeChanged={(event) => this.changedInputHandler(event, 'billing_address', 'postal_code')}
                                />: null}
                            </div>

                            <div className='contact-form-line'>
                                <label className='contact-info-header'>Delivery Methods</label>
                                <div>
                                    <select id='form-select' value={this.state.customers.deliveryMethod.value} onChange={(event) => this.changedInputHandler(event, 'deliveryMethod')}>
                                        <option value='' >--Please select a delivery method--</option>
                                        <option value='fastest' >fastest</option>
                                        <option value='regular' >regular</option>
                                    </select>
                                </div>
                            </div>

                            <div className='contact-form-line'>
                                <label className='contact-info-header'>Special Instructions</label>
                                <div className='contact-form-input-wide'>
                                    <textarea className='form-textarea'/>
                                </div>
                            </div>

                            <div className='contact-form-line'>
                                <label className='contact-info-header'>Payment Methods</label>
                                <div>
                                    <div className='form-radio-sub-container' style={{ paddingBottom: '4px'}}>
                                        <input type='radio' id='payment-card' name='payment' className='form-radio' />
                                        <label className='form-sub-label'>Debit or Credit Card</label>
                                    </div>

                                    <div className='form-radio-sub-container'>
                                        <input type='radio' id='payment-paypal' name='payment' className='form-radio' />
                                        <label className='form-sub-label'>Paypal</label>
                                    </div>      
                                </div>
                            </div>

                            <div className='form-button-wrapper'>
                               <button className='form-button' type="submit">Proceed to Pay</button>
                            </div> 
                        </form>
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
    token: state.auth.token,
});

const mapDispatchToProps = dispatch => {
    return {
        proceedToPay: ( orderData, token ) => dispatch(actionCreator.proceedToPay(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);