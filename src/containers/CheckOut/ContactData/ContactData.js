import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { proceedToPay } from '../../../store/action/order';

import Address from '../../../components/FormData/Address/Address';
import BurgerIngredient from '../../../components/Burger/BurgerIngredients/BurgerIngredient';
import BurgerInfo from '../../../components/FormData/BurgerInfo/BurgerInfo';

import './ContactData.css';
import { Container, Typography, Card, TextField, FormControl, RadioGroup, FormControlLabel, Radio, Button } from '@material-ui/core';

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

    let transformed = Object.keys(ingredients).map(igKey => {
        // the number of each ingredient --> the length of an array
        return [ ...Array(parseInt(ingredients[ igKey ]))].map(
            (_, index) => {
                return <BurgerIngredient key={igKey + index} type={igKey} />
            }
        );
    });

    let redirectPurchased = purchased ? <Redirect to='/' /> : null;

    return (
        <Container maxWidth='lg'>
            {redirectPurchased}

            <div style={{padding: '24px 16px'}}>
                <Typography variant='h4' className='form-header' fontWeight='600'>
                    Burger Order Form
                </Typography>
            </div>

            
            <Card variant='outlined' style={{margin: '16px'}}> 
                <Typography style={{padding: '16px', fontSize: '1.2rem', fontWeight: '600'}}>My Burger</Typography>
                <div style={{display: 'flex', flexDirection: 'row'}}>
                    <div style={{height: '200px', width: '20%'}}>
                        <BurgerIngredient type="bread-top" />
                        {transformed}
                        <BurgerIngredient type="bread-bottom" />
                    </div>
                    <div>
                        <BurgerInfo />
                    </div>
                </div>
            </Card>

            <Card variant='outlined' style={{margin: '16px'}}>
                <div style={{padding: '16px'}}>
                    <Typography style={{fontSize: '1.2rem', fontWeight: '600'}}>Contact Information</Typography>
                    <form noValidate autoComplete='off' onSubmit={proceedToPayHandler}>
                        <div>
                            <Typography style={{paddingTop: '16px', fontWeight: '600'}}>Full Name</Typography>
                            <TextField required id='first-name-required' label='First Name' variant='outlined' style={{marginTop: '16px', marginLeft: '16px', width: '30%'}} size='small'
                                value={name.params.first_name.value} onChange={(event) => changedInputHandler(event, name, 'first_name')} />
                            <TextField required id='last-name-required' label='Last Name' variant='outlined' style={{marginTop: '16px', marginLeft: '32px', width: '30%'}} size='small'
                                value={name.params.last_name.value} onChange={(event) => changedInputHandler(event, name, 'last_name')} />
                        </div>
                        <div>
                            <Typography style={{paddingTop: '16px', fontWeight: '600'}}>Email</Typography>
                            <TextField required id='email-required' label='Email' variant='outlined' style={{marginTop: '16px', marginLeft: '16px', width: '30%'}} size='small'
                                value={email.value} onChange={(event) => changedInputHandler(event, email)} placeholder='ex: example@example.com' />
                        </div>
                        <div>
                            <Typography style={{paddingTop: '16px', fontWeight: '600'}}>Contact Number</Typography>
                            <TextField required id='number-required' label='Phone Number' variant='outlined' style={{marginTop: '16px', marginLeft: '16px', width: '30%'}} size='small'
                                value={phoneNumber.value} onChange={(event) => changedInputHandler(event, phoneNumber)} placeholder='(000)-000-0000' />
                        </div>

                        <Address title = 'Shipping Address'
                            streetValue={street.params.streetAddress.value} streetChanged={(event) => changedInputHandler(event, street, 'streetAddress')}
                            street2Value={street.params.streetAddress2.value} street2Changed={(event) => changedInputHandler(event, street, 'streetAddress2')}
                            cityValue={street.params.city.value} cityChanged={(event) => changedInputHandler(event, street, 'city')}
                            stateValue={street.params.state.value} stateChanged={(event) => changedInputHandler(event, street, 'state')}
                            countryValue={street.params.country.value} countryChanged={(event) => changedInputHandler(event, street, 'country')}
                            codeValue={street.params.postalCode.value} codeChanged={(event) => changedInputHandler(event, street, 'postalCode')}
                        />

                        <div>
                            <FormControl component="fieldset">
                                <Typography style={{paddingTop: '16px', fontWeight: '600'}}>Is billing address same as shipping address?</Typography>
                                <RadioGroup aria-label="billing-address" name="billing-address" value={billingAddress.selectedOption} onChange={(event) => changedInputHandler(event, billingAddress, 'selectedOption')} >
                                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" style={{marginLeft: '16px', fontSize: '0.8rem'}}/>
                                    <FormControlLabel value="No" control={<Radio />} label="No" style={{marginLeft: '16px', fontSize: '0.8rem'}} />
                                </RadioGroup>
                            </FormControl>

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
                            <select id='form-select' style={{marginLeft: '16px', marginTop: '16px', color: 'rgba(0, 0, 0, 0.87)'}}
                                value={deliveryMethod.value} onChange={(event) => changedInputHandler(event, deliveryMethod)}>
                                <option value='' >--Please select a delivery method--</option>
                                <option value='fastest' >fastest</option>
                                <option value='regular' >regular</option>
                            </select>   
                        </div>

                        <div>
                            <Typography style={{paddingTop: '16px', fontWeight: '600'}}>Speical Instruments (Optional)</Typography>
                            <TextField id="special-ins" label="Special Instruments (Optional)" style={{width: '60%', marginTop: '16px', marginLeft: '16px'}}
                                placeholder="eg: extra sauce" multiline rows={4} variant="outlined"  />
                        </div>

                        {formValid ? 
                           <Button variant='contained' color='secondary' style={{marginTop: '16px', marginLeft: '16px'}} type='submit'>Submit</Button>
                           : <Button variant='contained' disabled style={{marginTop: '16px', marginLeft: '16px'}} type='submit'>Submit</Button>}  
                    </form>
                </div>          
            </Card>
     </Container>
    );
}

export default ContactData;