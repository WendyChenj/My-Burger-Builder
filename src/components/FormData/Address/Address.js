import React from 'react';
import { Typography, TextField } from '@material-ui/core';

const Address = (props) => {
    return (
        <div>
            <Typography style={{paddingTop: '16px', fontWeight: '600'}}>{props.title}</Typography>
            <TextField required id='street-address-required' label='Street Address' variant='outlined' style={{margin: '16px 16px 0 16px'}} fullWidth size='small'
                value={props.streetValue} onChange={props.streetChanged} />
            <TextField id='street-address-2-required' label='Street Address 2 (Optional)' variant='outlined' style={{margin: '16px 16px 0 16px'}} fullWidth size='small'
                value={props.street2Value} onChange={props.street2Changed} />
            <div>
                <TextField required id='city-required' label='City' variant='outlined' style={{marginTop: '16px', marginLeft: '16px', width: '30%'}} size='small'
                    value={props.cityValue} onChange={props.cityChanged} />
                <TextField required id='state-required' label='State' variant='outlined' style={{marginTop: '16px', marginLeft: '32px', width: '30%'}} size='small'
                    value={props.stateValue} onChange={props.stateChanged} />
            </div>

            <div>
                <TextField required id='postal-code-required' label='Postal Code' variant='outlined' style={{marginTop: '16px', marginLeft: '16px', width: '30%'}} size='small'
                    value={props.codeValue} onChange={props.codeChanged} />
                <TextField required id='country-required' label='Country' variant='outlined' style={{marginTop: '16px', marginLeft: '32px', width: '30%'}} size='small'
                    value={props.countryValue} onChange={props.countryChanged} />
            </div>
        </div>
    );
}

export default Address;





