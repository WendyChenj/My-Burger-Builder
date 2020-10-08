import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { proceedToPay } from '../../../store/action/order';

import Modal from '../../../components/UI/Modal/Modal';
import Address from '../../../components/FormData/Address/Address';
import Name from '../../../components/FormData/Name/Name';
import PhoneNumber from '../../../components/FormData/PhoneNumber/PhoneNumber';
import Email from '../../../components/FormData/Email/Email';
import BillingAddress from '../../../components/FormData/BillingAddress/BillingAddress';
import OrderInfo from '../../../components/FormData/BurgerInfo/BurgerInfo';

import { Container, Typography, Card, TextField, Button } from '@material-ui/core';

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
        isValid: true
    });

    const [ deliveryMethod, setDeliveryMethod ] = useState({
        value: 'regular',
        config: {
            type: 'deliveryMethod',
        },
        validation: {
            required: true,
        },
        options: ['fastest', 'regular'],
        isValid: true
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

    useEffect(() => {
        setFormValid(name.isValid && email.isValid && phoneNumber.isValid && deliveryMethod.isValid && street.isValid && billingAddress.isValid);
    }, [name.isValid, email.isValid, phoneNumber.isValid, deliveryMethod.isValid, street.isValid, billingAddress.isValid, formValid]);

    const { ingredients, totalPrice, purchased, token, userId } = useSelector( state => ({
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased,
        token: state.auth.token,
        userId: state.auth.userId,
        }));
    
    const dispatch = useDispatch();

    let history = useHistory();


    const validate = (inputIdentifier) => {
        let totalFormValid = true;

        if (inputIdentifier === name || inputIdentifier === street || inputIdentifier === billingAddress) {
            for (let ele in inputIdentifier.params) {
                totalFormValid = totalFormValid && inputIdentifier.params[ele].isValid;
            }
        } else {
            totalFormValid = totalFormValid && inputIdentifier.isValid;
        }
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

    let redirectPurchased = purchased ? (
        <Modal show={purchased} >
            <Typography style={{margin: '16px'}}>Your order has been successfully submitted!</Typography>
            <Button variant='contained' color='secondary' onClick={() => history.push('/')} style={{marginLeft: '16px'}}>
                RETURN TO MAIN PAGE
            </Button>
        </Modal>
    )
    : null;

    return (
        <Container maxWidth='lg'>
            {redirectPurchased}

            <div style={{padding: '24px 16px'}}>
                <Typography variant='h4' className='form-header' fontWeight='600'>
                    Burger Order Form
                </Typography>
            </div>

            <OrderInfo />

            <Card variant='outlined' style={{margin: '16px'}}>
                <div style={{padding: '16px'}} className='form-container'>
                    <Typography style={{fontSize: '1.2rem', fontWeight: '600'}}>Contact Information</Typography>
                    <form noValidate autoComplete='off' onSubmit={proceedToPayHandler}>
                        <Name firstNameValue={name.params.first_name.value} firstNameChanged={(event) => changedInputHandler(event, name, 'first_name')} 
                            lastNameValue={name.params.last_name.value} lastNameChanged={(event) => changedInputHandler(event, name, 'last_name')} />
                        <Email emailValue={email.value} emailChanged={(event) => changedInputHandler(event, email)} />
                        <PhoneNumber phoneNumberValue={phoneNumber.value} phoneNumberChanged={(event) => changedInputHandler(event, phoneNumber)} />
                        <Address title = 'Shipping Address'
                            streetValue={street.params.streetAddress.value} streetChanged={(event) => changedInputHandler(event, street, 'streetAddress')}
                            street2Value={street.params.streetAddress2.value} street2Changed={(event) => changedInputHandler(event, street, 'streetAddress2')}
                            cityValue={street.params.city.value} cityChanged={(event) => changedInputHandler(event, street, 'city')}
                            stateValue={street.params.state.value} stateChanged={(event) => changedInputHandler(event, street, 'state')}
                            countryValue={street.params.country.value} countryChanged={(event) => changedInputHandler(event, street, 'country')}
                            codeValue={street.params.postalCode.value} codeChanged={(event) => changedInputHandler(event, street, 'postalCode')}
                        />

                        <div>
                            <BillingAddress billingValue={billingAddress.selectedOption} billingChanged={(event) => changedInputHandler(event, billingAddress, 'selectedOption')} />
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

                        <div>
                            <Typography style={{paddingTop: '16px', fontWeight: '600'}}>Delivery Method</Typography> 
                            <select id='form-select' style={{marginLeft: '16px', marginTop: '16px', color: 'rgba(0, 0, 0, 0.87)', padding: '8px'}}
                                value={deliveryMethod.value} onChange={(event) => changedInputHandler(event, deliveryMethod)}>
                                <option value='regular' >regular</option>
                                <option value='fastest' >fastest</option>
                            </select>   
                        </div>

                        <div>
                            <Typography style={{paddingTop: '16px', fontWeight: '600'}}>Speical Instruments (Optional)</Typography>
                            <TextField id="special-ins" label="Special Instruments" style={{marginTop: '16px', marginLeft: '16px', width: '80%'}}
                                placeholder="eg: extra sauce" multiline rows={4} variant="outlined"  />
                        </div>

                        {formValid ? 
                           <Button variant='contained' color='secondary' style={{marginTop: '16px', marginLeft: '16px'}} type='submit'>Submit</Button>
                           : (
                               <div>
                                   <Button variant='contained' disabled style={{marginTop: '16px', marginLeft: '16px'}} type='submit'>Submit</Button>
                                   <Typography color='secondary' fontSize='0.5rem' style={{marginLeft: '16px', marginTop: '8px'}}>Sorry, please check your information! Remember this can not be auto filled!</Typography>
                                </div>)}  
                    </form>
                </div>          
            </Card>
     </Container>
    );
}

export default ContactData;