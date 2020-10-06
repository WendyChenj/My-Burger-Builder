import React from 'react';
import { Typography, TextField } from '@material-ui/core';

const PhoneNumber = props => {
    return (
        <div>
            <Typography style={{paddingTop: '16px', fontWeight: '600'}}>Contact Number</Typography>
            <TextField required id='number-required' label='Phone Number' variant='outlined' style={{marginTop: '16px', marginLeft: '16px'}} size='small'
                value={props.phoneNumberValue} onChange={props.phoneNumberChanged} placeholder='(000)-000-0000' />
        </div>
    );
}

export default PhoneNumber;