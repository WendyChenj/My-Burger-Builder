import React from 'react';
import { useSelector } from 'react-redux';

import './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const Burger = React.memo( () => {

    const { ingredients } = useSelector( state => ({
        ingredients: state.burgerBuilder.ingredients,
    }));

    let transformed = Object.keys(ingredients).map(igKey => {
            // the number of each ingredient --> the length of an array
            return [ ...Array(parseInt(ingredients[ igKey ]))].map(
                (_, index) => {
                    return <BurgerIngredient key={igKey + index} type={igKey} />
                }
            );
        });

    let totalLayer = Object.values(ingredients).reduce((acc, cur) => acc + cur, 0);

    if (totalLayer === 0) {
        transformed = <p>Please scroll down to create your own burger!</p>
    }

    return (
        <div className='Burger'>
            <BurgerIngredient type="bread-top" />
            { transformed }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
});

export default Burger;
