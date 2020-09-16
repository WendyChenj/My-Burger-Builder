import React from 'react';
import Burger from '../Burger/Burger';
import './CheckOutSummary.css';

const CheckOutSummary = (props) => {
    return (
        <div className='CheckOutSummary'>
            <h1>We hope you enjoy your meal!</h1>
            <Burger ingredients = {props.ingredients} />
            <button className='Button Danger' onClick={props.cancel}>CANCEL</button>
            <button className='Button Success' onClick={props.continue}>CONTINUE</button>
        </div>
    );
}

export default CheckOutSummary;