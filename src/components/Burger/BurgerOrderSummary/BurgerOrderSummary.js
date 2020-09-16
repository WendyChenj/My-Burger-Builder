import React from 'react';
import './BurgerOrderSummary.css';

const burgerOrderSummary = (props) => {
    let burgerOrder = Object.keys(props.ingredients).map(
    igKey => <li key={igKey}><span style={{ textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>
    );

    return (
        <div>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
               {burgerOrder}
            </ul> 
            <p><strong>Total Price: ${props.price}</strong></p>           
            <p>Continue to Checkout?</p>
            <button className='Button Danger' onClick={props.orderCancelled}>CANCEL</button>
            <button className='Button Success' onClick={props.orderContinue}>CONTINUE</button>
        </div>
    );
}

export default burgerOrderSummary;