import React from 'react';
import { useSelector } from 'react-redux';

import './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

// todo: import burger into contact data page: css should be redesign

const Burger = React.memo( () => {

    const { ingredients, totalPrice } = useSelector( state => ({
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
    }));
    // props.ingredients is not an array, impossible to loop through.
    // Therefore, we have to transform the object to an array and then loop through
    
    //array.map(); array.reduce()

    let transformed = Object.keys(ingredients).map(igKey => {
            // the number of each ingredient --> the length of an array
            return [ ...Array(parseInt(ingredients[ igKey ]))].map(
                (_, index) => {
                    return <BurgerIngredient key={igKey + index} type={igKey} />
                }
            );
        });

    let totalLayer = Object.values(ingredients).reduce((acc, cur) => acc + cur, 0);

    if (totalLayer.length === 0) {
        transformed = <p>Please start adding ingredients!</p>
    }

    return (
        <div className='Burger'>
            <BurgerIngredient type="bread-top" />
            {transformed}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
});

export default Burger;
