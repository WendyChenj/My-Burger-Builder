import React from 'react';
import CheckOutSummary from '../../components/CheckOutSummary/CheckOutSummary';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

class CheckOut extends React.Component {

    cancelledOrderHandler = () => {
        this.props.history.goBack();
    }

    continueOrderHandler = () => {
        // this.props.history.replace('/checkOut/contactData');
        this.props.history.push({pathname: '/checkOut/contactData'});
    }

    render() {
        let checkOutPage = <Redirect to= {{pathname: '/'}} />;
        if (this.props.ingredients) {
            checkOutPage = (<div>
                <CheckOutSummary 
                ingredients={this.props.ingredients} 
                cancel = {this.cancelledOrderHandler}
                continue = {this.continueOrderHandler}
                /> 
              </div> )
        }

        return (
            <div>
                {checkOutPage}  
            </div>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
});

export default connect(mapStateToProps)(CheckOut);