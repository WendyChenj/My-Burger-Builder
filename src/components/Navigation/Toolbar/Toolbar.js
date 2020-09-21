import React from 'react';
import './Toolbar.css';
import './DrawerToggle.css';
import NavigationItems from '../NavigationItems/NavigationItems';

// 收到的是img的路径
import Logo from '../../../assets/images/burger-logo.png';

const toolbar = (props) => {
    return (
        <header className='Toolbar'>
            <div onClick={props.clicked} className='DrawerToggle'>
                <div className='DrawerToggleDiv'></div>
                <div className='DrawerToggleDiv'></div>
                <div className='DrawerToggleDiv'></div>
            </div>
            <div className='BurgerLogo'>
                <img src={Logo} alt='MyBurger' />
            </div>
            <nav className='toolbarNav'>
                <NavigationItems isAuth={props.isAuth} />
            </nav>          
        </header>
    );
}

export default toolbar;