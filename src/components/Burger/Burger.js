import React from 'react';

import './Burger.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) => {
    // props.ingredients is not an array, impossible to loop through.
    // Therefore, we have to transform the object to an array and then loop through
    
    //array.map(); array.reduce()

    let transformed = Object.keys(props.ingredients).map(igKey => {
            // the number of each ingredient --> the length of an array
            return [ ...Array(parseInt(props.ingredients[ igKey ]))].map(
                (_, index) => {
                    return <BurgerIngredient key={igKey + index} type={igKey} />
                }
            );
        });

    let totalLayer = Object.values(props.ingredients).reduce((acc, cur) => acc + cur, 0);

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
}

export default burger;