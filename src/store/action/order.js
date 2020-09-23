import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const proceedToPay = ( orderData, token ) => {
    return dispatch => {
        dispatch( purchaseBurgerStart() );
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => { 
            dispatch( purchaseBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => { 
            dispatch( purchaseBurgerFail(error)); 
        });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    }
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    }
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams = '?auth=' + localStorage.getItem("token") + '&orderBy="userId"&equalTo="' + localStorage.getItem("userId") + '"';
        axios.get('/orders.json' + queryParams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key,
                    });
                };
                console.log('fetchOrders', fetchedOrders);
                dispatch(fetchOrderSuccess(fetchedOrders));
            })
            .catch( error => dispatch( fetchOrderFail(error))); 
    }
};

