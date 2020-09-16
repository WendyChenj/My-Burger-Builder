import React from 'react';

import './NavigationItem.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props) => {
    return (
        <li className='NavigationItem'>
            <NavLink to={props.link} exact activeClassName='active'>
               {props.children}
            </NavLink>
        </li>
        
    );
}

export default NavigationItem;