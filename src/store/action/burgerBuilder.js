import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ing) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ing,
    };
};

export const removeIngredient = (ing) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: ing,
    };
};

const fetch = (ingredients) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS,
        ingredients: ingredients,
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('/Ingredients.json')
            .then(response => {
                dispatch(fetch(response.data));
            })
            .catch(error => console.log(error));
    };
}

export const reorderBurger = (ingredients) => {
    return {
        type: actionTypes.REORDER_BURGER,
        ingredients: ingredients,
    }
}