import React from 'react';
import './BuildControls.css';
import './OrderButton.css';
import './BuildControl/BuildControl.css';
// import { Button } from '@material-ui/core';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];



const BuildControl = (props) => {
    return (
        <div className="BuildControl">
            <div className='Label'>{props.label}</div>
            <button  className='Less ControlButton' onClick={props.removed} disabled={props.disabled}>Less</button>
            <button className='More ControlButton' onClick={props.added}>More</button>
        </div>
    );
}


const BuildControls = (props) => {

    return (
        <div className='BuildControls'>
            <p>Total Price: {props.price.toFixed(2)}</p>
            {controls.map(ctrl => <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={() => props.added(ctrl.type)}
                removed={() => props.removed(ctrl.type)}
                disabled = {props.disabled[ctrl.type]} 
            /> )}
            <button className='OrderButton'
                    disabled={props.orderDisabled}
                    onClick={props.ordered}>ORDER NOW</button>
        </div>
    );
}

export default BuildControls;