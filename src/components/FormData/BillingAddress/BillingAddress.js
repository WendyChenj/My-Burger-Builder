import React from 'react';
import Address from '../Address/Address';
import { Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';

const BillingAddress = props => {
    return (
        <div>
            <FormControl component="fieldset">
                <Typography style={{paddingTop: '16px', fontWeight: '600'}}>Is billing address same as shipping address?</Typography>
                <RadioGroup aria-label="billing-address" name="billing-address" value={props.billingValue} onChange={props.billingChanged} >
                    <FormControlLabel value="Yes" control={<Radio />} label="Yes" style={{marginLeft: '16px', fontSize: '0.8rem'}} />
                    <FormControlLabel value="No" control={<Radio />} label="No" style={{marginLeft: '16px', fontSize: '0.8rem'}} />
                </RadioGroup>
            </FormControl>
        </div>
        
    );
}

export default BillingAddress;

