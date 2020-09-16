import React from 'react';

const Input = (props) => {

    let invalidInfo = null;

    if (!props.valid && props.touched) {
        invalidInfo = <p>Please enter valid values!</p>
    }

    return (
        <div>
            {props.type === 'select' ? 
                <div>
                    <label htmlFor={props.label}>Choose your {props.label}:</label>
                    <select name={props.label} id={props.id} onChange={props.changed}>
                        {props.options.map(option => {
                            return (<option value={option} key={option}>{option}</option>);
                        })}
                    </select>   
                </div> : 
                <div>
                    <label htmlFor={props.label}>Enter your {props.label}:</label>
                    <input type={props.type} name={props.label} id={props.id} onChange={props.changed} />
                    {props.valid ? null: invalidInfo}
                </div>
            }
        </div>    
    );
}

export default Input;