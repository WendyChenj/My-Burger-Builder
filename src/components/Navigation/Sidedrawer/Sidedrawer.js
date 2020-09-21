import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../../assets/images/burger-logo.png';
import Backdrop from '../../UI/Backdrop/Backdrop';

import './Sidedrawer.css';

const Sidedrawer = (props) => {
    return (
        <div>
            <Backdrop show={props.show} clicked={props.clicked} className='sidedrawerBackdrop' />
            <div className={props.show? 'sidedrawer Open': 'sidedrawer Close'}>
                <img src={Logo} alt='MyBurger'className='sidedrawerLogo'/>
                <NavigationItems isAuth={props.isAuth} />
            </div>
        </div>
        
    );
}

export default Sidedrawer;