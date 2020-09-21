import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css';

const NavigationItems = (props) => {
    return (
        <ol className='NavigationItems'>
            <NavigationItem link="/">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            {props.isAuth ? <NavigationItem link="/logout">Log Out </NavigationItem>
             : <NavigationItem link='/auth'>Account</NavigationItem>}
        </ol>
    );
}

export default NavigationItems;