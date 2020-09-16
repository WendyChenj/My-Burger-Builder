import React from 'react';

const Address = (props) => {
    return (
        <div className='contact-form-line'>
            <label className='contact-info-header'>{props.title}</label>
            <div className='contact-form-input-wide'>
                <div style={{ marginRight: '10%', 'width': '80%'}}>
                    <span className='form-sub-label-container'>
                        <input type='text' name='street_address' className='form-box form-address' value={props.streetValue} onChange={props.streetChanged} />
                        <label className='form-sub-label'>Street Address</label>
                    </span>
                </div>
            </div>

            <div className='contact-form-input-wide'>
                <div style={{ marginRight: '10%', 'width': '80%'}}>
                    <span className='form-sub-label-container'>
                        <input type='text' name='street_address_2' className='form-box form-address' value={props.street2Value} onChange={props.street2Changed} />
                        <label className='form-sub-label'>Street Address Line 2</label>
                    </span>
                </div>
            </div>

            <div className='contact-form-input-wide'>
                <div style={{ marginRight: '10%'}}>
                    <span className='form-sub-label-container'>
                        <input type='text' name='city' className='form-box' value={props.cityValue} onChange={props.cityChanged} />
                        <label className='form-sub-label'>City</label>
                    </span>
                </div>

                <div>
                    <span className='form-sub-label-container'>
                        <input type='text' name='state' className='form-box' value={props.stateValue} onChange={props.stateChanged} />
                        <label className='form-sub-label'>State / Province</label>
                    </span>
                </div>
            </div>

            <div className='contact-form-input-wide'>
                <div style={{ marginRight: '10%'}}>
                    <span className='form-sub-label-container'>
                        <input type='text' name='postal_code' className='form-box' value={props.codeValue} onChange={props.codeChanged} />
                        <label className='form-sub-label'>Postal / Zip Code</label>
                    </span>
                </div>

                <div style={{ marginRight: '10%'}}>
                    <span className='form-sub-label-container'>
                        <input type='text' name='country' className='form-box' value={props.countryValue} onChange={props.countryChanged} />
                        <label className='form-sub-label'>Country</label>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Address;





