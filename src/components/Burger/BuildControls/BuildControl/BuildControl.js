import React from 'react';
import './BuildControl.css';

const BuildControl = (props) => {
    return (
        <div className="BuildControl">
            <div className='Label'>{props.label}</div>
            <button className='Less ControlButton' onClick={props.removed} disabled={props.disabled}>Less</button>
            <button className='More ControlButton' onClick={props.added}>More</button>
        </div>
    );
}

export default BuildControl;