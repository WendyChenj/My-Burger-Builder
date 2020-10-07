import React from 'react';
import { Typography, TextField } from '@material-ui/core';

const Email = props => {
    return (
        <div>
            <Typography style={{paddingTop: '16px', fontWeight: '600'}}>Email</Typography>
            <TextField required id='email-required' label='Email' variant='outlined' style={{marginTop: '16px', marginLeft: '16px'}} size='small'
                value={props.emailValue} onChange={props.emailChanged} placeholder='ex: example@example.com' />
        </div>
    );
}

export default Email;
