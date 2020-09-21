import React from 'react';

const Input = (props) => {

    // let invalidInfo = null;

    // if (!props.valid && props.touched) {
    //     invalidInfo = <p>Please enter valid values!</p>
    // }

    return (
        <div>
            <input type={props.type} placeholder={props.placeHolder} required/>   
        </div>    
    );
}

export default Input;