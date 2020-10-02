import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { proceedToPay } from '../../../store/action/order';

import Address from '../../../components/FormData/Address/Address';
// import BurgerIngredient from '../../../components/Burger/BurgerIngredients/BurgerIngredient';
import Burger from '../../../components/Burger/Burger';
import BurgerInfo from '../../../components/FormData/BurgerInfo/BurgerInfo';

import './ContactData.css';

import { checkValidity } from '../../../utility/utility';

const ContactData = () => {
    const [ name, setName ] = useState({
        params: {
            first_name: {
                value: '',
                config: {
                    type: 'first_name',
                    placeHolder: 'First Name',
                },
                validation: {
                    required: true,
                },
                isValid: false
            },

            last_name: {
                value: '',
                config: {
                    type: 'last_name',
                    placeHolder: 'Last Name',
                },
                validation: {
                    required: true,
                },
                isValid: false
            }
        },
        isValid: false
    });

    const [ email, setEmail ] = useState({
        value: '',
        config: {
            type: 'email',
            placeHolder: 'Email',
        },
        validation: {
            required: true,
            isEmail: true,
        },
        isValid: false,
    });

    const [ phoneNumber, setPhoneNumber ] = useState({
        value: '',
        config: {
            type: 'phone_number',
            placeHolder: 'Phone Number',
        },
        validation: {
            required: true,
            isNumeric: true,
        },
        isValid: false,
    });

    const [ street, setStreet ] = useState({
        params: {
            streetAddress: {
                value: '',
                config: {
                    type: 'street_address',
                    placeHolder: 'Street Address 1',
                },
                validation: {
                    required: true,
                },
                isValid: false,
            },
            streetAddress2: {
                value: '',
                config: {
                    type: 'street_address_2',
                    placeHolder: 'Street Address 2 [optional]',
                },
                validation: {},
                isValid: true,
            },
            state: {
                value: '',
                config: {
                    type: 'state',
                    placeHolder: 'State',
                },
                validation: {
                    required: true,
                },
                isValid: false,
            },
            city: {
                value: '',
                config: {
                    type: 'city',
                    placeHolder: 'City',
                },
                validation: {
                    required: true,
                },
                isValid: false,
            },
            postalCode: {
                value: '',
                config: {
                    type: 'postal_code',
                    placeHolder: 'Postal Code',
                },
                validation: {
                    required: true,
                    postalCodeLength: true,
                },
                isValid: false,
            },
            country: {
                value: '',
                config: {
                    type: 'country',
                    placeHolder: 'Country',
                },
                validation: {
                    required: true,
                },
                isValid: false,
            },
        },
        isValid: false
    });

    const [ billingAddress, setBillingAddress ] = useState({
        params: {
            streetAddress: {
                value: '',
                config: {
                    type: 'street_address',
                    placeHolder: 'Street Address 1',
                },
                validation: {
                    required: true,
                },
                isValid: false,
            },
            streetAddress2: {
                value: '',
                config: {
                    type: 'street_address_2',
                    placeHolder: 'Street Address 2 [optional]',
                },
                validation: {},
                isValid: true,
            },
            state: {
                value: '',
                config: {
                    type: 'state',
                    placeHolder: 'State',
                },
                validation: {
                    required: true,
                },
                isValid: false,
            },
            city: {
                value: '',
                config: {
                    type: 'city',
                    placeHolder: 'City',
                },
                validation: {
                    required: true,
                },
                isValid: false,
            },
            postalCode: {
                value: '',
                config: {
                    type: 'postal_code',
                    placeHolder: 'Postal Code',
                },
                validation: {
                    required: true,
                    postalCodeLength: true,
                },
                isValid: false,
            },
            country: {
                value: '',
                config: {
                    type: 'country',
                    placeHolder: 'Country',
                },
                validation: {
                    required: true,
                },
                isValid: false,
            },
        },
        selectedOption: 'Yes',
        isValid: false
    });

    const [ deliveryMethod, setDeliveryMethod ] = useState({
        value: '',
        config: {
            type: 'deliveryMethod',
        },
        validation: {
            required: true,
        },
        options: ['', 'fastest', 'regular'],
        isValid: false
    });

    const [ specialInstrument, setSpecialInstrument ] = useState({
        value: '',
        config: {
            type: 'postal_code',
            placeHolder: 'Postal Code',
        },
        validation: {
            required: true,
        },
        isValid: false,
    });

    const [ formValid, setFormValid ] = useState(false);

    const { ingredients, totalPrice, purchased, token, userId } = useSelector( state => ({
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased,
        token: state.auth.token,
        userId: state.auth.userId,
        }));
    
    const dispatch = useDispatch();

    const validate = (inputIdentifier) => {
        let totalFormValid = true;

        if (inputIdentifier === name || inputIdentifier === street || inputIdentifier === billingAddress) {
            for (let ele in inputIdentifier.params) {
                totalFormValid = totalFormValid && inputIdentifier.params[ele].isValid;
            }
        } else {
            totalFormValid = totalFormValid && inputIdentifier.isValid;
        }
        console.log('check form data validation:', inputIdentifier);
        return totalFormValid;
    }

    const changedInputHandler = (event, inputIdentifier, secondIdentifier = null) => {
        switch (inputIdentifier) {
            case name: 
                setName({...name, 
                    params: {
                        ...name.params, 
                        [ secondIdentifier ]: {
                            ...name.params[secondIdentifier], 
                            value: event.target.value,
                            isValid: checkValidity(event.target.value, name.params[secondIdentifier].validation)
                        }
                    },
                    isValid: validate(name),
                });
                console.log('name state change:', name);
                break;
            case street:
                setStreet({...street, 
                    params: {
                        ...street.params, 
                        [ secondIdentifier ]: {
                            ...street.params[secondIdentifier], 
                            value: event.target.value,
                            isValid: checkValidity(event.target.value, street.params[secondIdentifier].validation)
                        }
                    },
                    isValid: validate(street),
                });
                setBillingAddress({...street, 
                    selectedOption: "Yes",
                });
                break;
            case billingAddress: 
                if (secondIdentifier === 'selectedOption') {
                    setBillingAddress({...billingAddress, selectedOption: event.target.value});
                }
                break;
            case phoneNumber: 
                setPhoneNumber({...phoneNumber, value: event.target.value, isValid: checkValidity(event.target.value, phoneNumber.validation)});
                break;
            case email:
                setEmail({...email, value: event.target.value, isValid: checkValidity(event.target.value, email.validation)});
                break;
            case deliveryMethod:
                setDeliveryMethod({...deliveryMethod, value: event.target.value, isValid: checkValidity(event.target.value, deliveryMethod.validation)});
                break;
            case specialInstrument:
                setSpecialInstrument({...specialInstrument, value: event.target.value});
                break;
            default:
                break;
        }
        setFormValid(name.isValid && email.isValid && phoneNumber.isValid && deliveryMethod.isValid && street.isValid && billingAddress.isValid);
    }

    const billingAddressChangedHandler = (event, secondIdentifier) => {

        if(billingAddress.selectedOption === "Yes") {
                setBillingAddress({...street, selectedOption: "Yes" });
            } else {
                setBillingAddress({...billingAddress, 
                    params: {
                        ...billingAddress.params,
                        [ secondIdentifier ]: {
                            ...billingAddress.params[secondIdentifier], 
                            value: event.target.value,
                            isValid: checkValidity(event.target.value, billingAddress.params[secondIdentifier].validation)
                        }
                    },
                    isValid: validate(billingAddress),
                    selectedOption: "No" 
                });
            }
    }


    const proceedToPayHandler = (event) => {
        event.preventDefault();

        let customerInfo = {name: {first_name: name.params.first_name.value, last_name: name.params.last_name.value},
                            street: {streetAddress: street.params.streetAddress.value, 
                                     streetAddress2: street.params.streetAddress2.value, 
                                     city: street.params.city.value, 
                                     state: street.params.state.value, 
                                     postalCode: street.params.postalCode.value, 
                                     country: street.params.country.value
                                    },
                            billingAddress: {streetAddress: billingAddress.params.streetAddress.value, 
                                        streetAddress2: billingAddress.params.streetAddress2.value, 
                                        city: billingAddress.params.city.value, 
                                        state: billingAddress.params.state.value, 
                                        postalCode: billingAddress.params.postalCode.value, 
                                        country: billingAddress.params.country.value
                                       },
                            email: email.value,
                            phoneNumber: phoneNumber.value,
                            deliveryMethod: deliveryMethod.value,
                            specialInstrument: specialInstrument.value,
                           };

        const orderData = {
            ingredients: ingredients,
            price: totalPrice,
            customer: customerInfo,
            userId: userId,
        };

        dispatch(proceedToPay(orderData, token));
    }

    let redirectPurchased = purchased ? <Redirect to='/' /> : null;

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
                                <Burger />
                            </div>

                            <div>
                                <BurgerInfo />
                            </div>
                        </div>
                    </div>
                </li>

                <li className='contact-form' id='cid_3'>
                    <label className='display-label contact-label'>Contact Information</label>
                    <form onSubmit={proceedToPayHandler} className='contact-form-inputs'>
                        <div className='contact-form-line'>
                            <label className='contact-info-header'>Full Name</label>
                            <div className='contact-form-input-wide'>
                                <div style={{ marginRight: '10%'}}>
                                    <span className='form-sub-label-container'>
                                        <input type='text' name='fullName-first' className='form-box' value={name.params.first_name.value} onChange={(event) => changedInputHandler(event, name, 'first_name')} required/>
                                            <label className='form-sub-label'>First Name</label>
                                        </span>
                                    </div>
                                    <div>
                                        <span className='form-sub-label-container'>
                                            <input type='text' name='fullName-last' className='form-box' value={name.params.last_name.value} onChange={(event) => changedInputHandler(event, name, 'last_name')} required/>
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
                                        <input type='email' name='email' className='form-box' placeholder='ex: example@example.com' value={email.value} onChange={(event) => changedInputHandler(event, email)}/>
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
                                        <input type='tel' name='telephone' className='form-box' placeholder='(000)-000-0000' value={phoneNumber.value} onChange={(event) =>changedInputHandler(event, phoneNumber)}/>
                                        <label className='form-sub-label'>Phone Number</label>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <Address title = 'Shipping Address'
                            streetValue={street.params.streetAddress.value} streetChanged={(event) => changedInputHandler(event, street, 'streetAddress')}
                            street2Value={street.params.streetAddress2.value} street2Changed={(event) => changedInputHandler(event, street, 'streetAddress2')}
                            cityValue={street.params.city.value} cityChanged={(event) => changedInputHandler(event, street, 'city')}
                            stateValue={street.params.state.value} stateChanged={(event) => changedInputHandler(event, street, 'state')}
                            countryValue={street.params.country.value} countryChanged={(event) => changedInputHandler(event, street, 'country')}
                            codeValue={street.params.postalCode.value} codeChanged={(event) => changedInputHandler(event, street, 'postalCode')}
                        /> 

                        <div className='contact-form-line'>
                            <label className='contact-info-header'>Is billing address same as shipping address?</label>
                            <div>
                                <div className='form-radio-sub-container' style={{ paddingBottom: '4px'}}>
                                    <input type='radio' className='form-radio' value="Yes" 
                                        checked={billingAddress.selectedOption === "Yes"} onChange={(event) => changedInputHandler(event, billingAddress, 'selectedOption')} />
                                    <label className='form-sub-label'>Yes</label>     
                                </div>

                                <div className='form-radio-sub-container'>
                                    <input type='radio' className='form-radio' value="No"
                                        checked={billingAddress.selectedOption === "No"} onChange={(event) => changedInputHandler(event, billingAddress, 'selectedOption')} /> 
                                    <label className='form-sub-label'>No</label>  
                                </div>  
                            </div>
                            {billingAddress.selectedOption === 'No' ? 
                                <Address title = 'Billing Address'
                                streetValue={billingAddress.params.streetAddress.value} streetChanged={(event) => billingAddressChangedHandler(event, 'streetAddress')}
                                street2Value={billingAddress.params.streetAddress2.value} street2Changed={(event) => billingAddressChangedHandler(event, 'streetAddress2')}
                                cityValue={billingAddress.params.city.value} cityChanged={(event) => billingAddressChangedHandler(event, 'city')}
                                stateValue={billingAddress.params.state.value} stateChanged={(event) => billingAddressChangedHandler(event, 'state')}
                                countryValue={billingAddress.params.country.value} countryChanged={(event) => billingAddressChangedHandler(event, 'country')}
                                codeValue={billingAddress.params.postalCode.value} codeChanged={(event) => billingAddressChangedHandler(event, 'postalCode')}
                                />: null}
                        </div>

                        <div className='contact-form-line'>
                            <label className='contact-info-header'>Delivery Methods</label>
                            <div>
                                <select id='form-select' value={deliveryMethod.value} onChange={(event) => changedInputHandler(event, deliveryMethod)}>
                                    <option value='' >--Please select a delivery method--</option>
                                    <option value='fastest' >fastest</option>
                                    <option value='regular' >regular</option>
                                </select>
                            </div>
                        </div>

                        <div className='contact-form-line'>
                            <label className='contact-info-header'>Special Instructions</label>
                            <div className='contact-form-input-wide'>
                                <textarea className='form-textarea' value={specialInstrument.value} onChange={event => changedInputHandler(event, setSpecialInstrument)} />
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

export default ContactData;