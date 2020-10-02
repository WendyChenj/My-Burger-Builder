import React from 'react';
import CheckOutSummary from '../../components/CheckOutSummary/CheckOutSummary';
import { Redirect, useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';

const CheckOut = () => {

    const { ingredients, purchased, isAuthenticate } = useSelector( state => ({
        ingredients: state.burgerBuilder.ingredients,
        // totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased,
        isAuthenticate: state.auth.token !== null,
        reorder: state.order.reorder,
    }));

    // const dispatch = useDispatch();

    let history = useHistory();

    const cancelledOrderHandler = () => {
        history.goBack();
    }

    const continueOrderHandler = () => {
        if (isAuthenticate) {
            history.push({pathname: '/checkOut/contactData'});
        } else {
            history.push({pathname: '/auth'});
        }
    }

    let checkOutPage = <Redirect to= {{pathname: '/'}} />;
    if (ingredients) {
        let redirectPurchase = purchased ? <Redirect to='/' />: null;
        checkOutPage = (
          <div>
            {redirectPurchase}
            <CheckOutSummary 
                ingredients={ingredients} 
                cancel = {cancelledOrderHandler}
                continue = {continueOrderHandler}
                isAuth = {isAuthenticate}
            /> 
          </div> )
        }

    return (
        <div>
            {checkOutPage}  
        </div>
    );
}

export default CheckOut;