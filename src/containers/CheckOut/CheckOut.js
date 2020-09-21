import React from 'react';
import CheckOutSummary from '../../components/CheckOutSummary/CheckOutSummary';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

class CheckOut extends React.Component {

    cancelledOrderHandler = () => {
        this.props.history.goBack();
    }

    continueOrderHandler = () => {
        if (this.props.isAuthenticate) {
            this.props.history.push({pathname: '/checkOut/contactData'});
        } else {
            this.props.history.push({pathname: '/auth'});
        }
    }

    render() {
        let checkOutPage = <Redirect to= {{pathname: '/'}} />;
        if (this.props.ingredients) {
            let redirectPurchase = this.props.purchased ? <Redirect to='/' />: null;
            checkOutPage = (<div>
                {redirectPurchase}
                <CheckOutSummary 
                ingredients={this.props.ingredients} 
                cancel = {this.cancelledOrderHandler}
                continue = {this.continueOrderHandler}
                isAuth = {this.props.isAuthenticate}
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
    purchased: state.order.purchased,
    isAuthenticate: state.auth.token !== null,
});

export default connect(mapStateToProps)(CheckOut);