import * as actionTypes from '../action/actionTypes';

const initialState = {
    orders: [],
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.PURCHASE_BURGER_START: 
            return {
                ...state,
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS: {
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            };
            return {
                ...state,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };
        }
        case actionTypes.PURCHASE_BURGER_FAIL: 
            return {
                ...state
            };
        default:
            return state;
    }
}

export default reducer;