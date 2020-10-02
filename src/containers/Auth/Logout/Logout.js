import React, { useEffect } from 'react';
import { authLogOut } from '../../../store/action/auth';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Logout = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        dispatch(authLogOut());
    });

    return (
        <Redirect to='/auth' />
    );
}

export default Logout;