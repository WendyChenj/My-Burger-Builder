import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Typography } from '@material-ui/core';
import BurgerIngredient from '../../Burger/BurgerIngredients/BurgerIngredient';

const BurgerInfo = (props) => {

    return (
        <div style={{marginLeft: '32px'}}>
            <Typography style={{marginLeft: '16px', marginTop: '8px', fontWeight: '600'}}>Ingredients:</Typography>
            <div>
                <Typography style={{marginLeft: '20px'}}>Salad:        x{props.ingredients['salad']}</Typography>
                <Typography style={{marginLeft: '20px'}}>Cheese:       x{props.ingredients['cheese']}</Typography>
                <Typography style={{marginLeft: '20px'}}>Bacon:        x{props.ingredients['bacon']}</Typography>
                <Typography style={{marginLeft: '20px'}}>Meat:         x{props.ingredients['meat']}</Typography>
            </div>
            <Typography style={{marginLeft: '16px', fontWeight: '600'}}>TOTAL PRICE:   ${parseFloat(props.totalPrice).toFixed(2)}</Typography>
        </div>
    );
}

const OrderInfo = () => {

    const { ingredients, totalPrice } = useSelector( state => ({
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
    }));

    console.log('orderInfo:', totalPrice);

    let transformed = Object.keys(ingredients).map(igKey => {
        // the number of each ingredient --> the length of an array
        return [ ...Array(parseInt(ingredients[ igKey ]))].map(
            (_, index) => {
                return <BurgerIngredient key={igKey + index} type={igKey} />
            }
        );
    });

    return (
        <Card variant='outlined' style={{margin: '24px 16px'}}> 
            <Typography style={{padding: '16px', fontSize: '1.2rem', fontWeight: '600'}}>My Burger</Typography>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{height: '200px', width: '200px'}}>
                    <BurgerIngredient type="bread-top" />
                    {transformed}
                    <BurgerIngredient type="bread-bottom" />
                </div>
                <div>
                    <BurgerInfo ingredients={ingredients} totalPrice={totalPrice} />
                </div>
            </div>
        </Card>
    );
}

export default OrderInfo;