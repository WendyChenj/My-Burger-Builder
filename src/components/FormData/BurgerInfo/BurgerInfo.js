import React from 'react';
import { useSelector } from 'react-redux';

const BurgerInfo = () => {
    const { ingredients, totalPrice } = useSelector( state => ({
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
    }));

    return (
        <div className='orderInfo'>
        <p className='order-info-header'>Ingredients:</p>
        <div className='order-info-ingredients'>
            <p>Salad: x{ingredients['salad']}</p>
            <p>Cheese: x{ingredients['cheese']}</p>
            <p>Bacon: x{ingredients['bacon']}</p>
            <p>Meat: x{ingredients['meat']}</p>
        </div>
        <p className='order-info-header'>Total Price: ${totalPrice}</p>
    </div>
    );
}

export default BurgerInfo;