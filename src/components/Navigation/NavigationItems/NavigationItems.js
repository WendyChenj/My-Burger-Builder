import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavigationItems.css';

export const NavigationItem = (props) => {
    return (
        <li className='NavigationItem'>
            <NavLink to={props.link} exact activeClassName='active'>
               {props.children}
            </NavLink>
        </li>
        
    );
}

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