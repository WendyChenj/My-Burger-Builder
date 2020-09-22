import * as actionTypes from '../action/actionTypes';

const initialState = {
    orders: [],
    error: null,
    purchased: false,
    loading: false,
};

const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.PURCHASE_INIT: 
            return {
                ...state,
                purchased: false,
            }
        case actionTypes.PURCHASE_BURGER_START: 
            return {
                ...state,
                loading: true
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
                ...state,
                purchased: false,
            };
        case actionTypes.FETCH_ORDERS_START: 
            return {
                ...state,
                loading: true
            };
        case actionTypes.FETCH_ORDERS_SUCCESS: 
            return {
                ...state,
                orders: action.orders,
                loading: false,
            }
        case actionTypes.FETCH_ORDERS_FAIL: 
            return {
                ...state,
                orders: [],
                error: action.error,
                loading: false,
            }
        default:
            return state;
    }
}

export default reducer;