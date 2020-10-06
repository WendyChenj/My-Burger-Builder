import React from 'react';
import { Typography, TextField } from '@material-ui/core';

const Name = (props) => {
    return (
        <div>
            <Typography style={{paddingTop: '16px', fontWeight: '600'}}>Full Name</Typography>
            <TextField required id='first-name-required' label='First Name' variant='outlined' style={{marginLeft: '16px', marginTop: '16px'}} size='small'
                value={props.firstNameValue} onChange={props.firstNameChanged} />
            <TextField required id='last-name-required' label='Last Name' variant='outlined'  style={{marginLeft: '16px', marginTop: '16px'}} size='small'
                value={props.lastNameValue} onChange={props.lastNameChanged} />
        </div>
    );
}

export default Name;