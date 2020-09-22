import * as actionTypes from '../action/actionTypes';

const REGULAR_PRICE = 4;

let item_price = {
    salad: 0.5,
    bacon: 1.0,
    cheese: 0.7,
    meat: 1.3,
};

const initialState = {
    ingredients: null,
    totalPrice: REGULAR_PRICE,
    building: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] + 1,
                },
                totalPrice: state.totalPrice + item_price[action.ingredient], 
                building: true,
            };

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1,
                },
                totalPrice: state.totalPrice - item_price[action.ingredient], 
            };

        case actionTypes.FETCH_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                totalPrice: REGULAR_PRICE,
                building: false,
            }
        
        default:
            return state;
    }
}

export default reducer;