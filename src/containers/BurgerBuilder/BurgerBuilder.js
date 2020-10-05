import React, { useState, useEffect } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BurgerOrderSummary from '../../components/Burger/BurgerOrderSummary/BurgerOrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { addIngredient, removeIngredient, fetchIngredients } from '../../store/action/burgerBuilder';
import { useHistory } from 'react-router-dom';

const BurgerBuilder = () => {

    const { ingredients, totalPrice } = useSelector(state => ({
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
    }));

    const dispatch = useDispatch();

    const [ purchasing, setPurchasing ] = useState(false);

    let history = useHistory();

    useEffect(() => {
        dispatch(fetchIngredients());
    }, [ dispatch ]);

    const orderDisable = (ingredients) => {
        let totalAmtIgr = 0;
        for (let key in ingredients) {
            totalAmtIgr += ingredients[key];
        }

        if (totalAmtIgr > 0) {return false;}
        else {return true;}
    }

    const purchasingHandler = () => {
        setPurchasing(true);
    }

    const purchasingCancelledHandler = () => {
        setPurchasing(false);
    }

    const purchasingContinueHandler = () => {
        history.push('/checkOut');
    }
        

    let burger = <Spinner />;
    let buildControls = null;
    let burgerOrderSummary = null;

    if (ingredients) {
        let disabledInfo = {...ingredients};

        for(let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        burger = <Burger ingredients={ingredients}/>;

        buildControls = <BuildControls 
            added={(ingredient) => dispatch(addIngredient(ingredient))} 
            removed={(ingredient) => dispatch(removeIngredient(ingredient))}
            disabled={disabledInfo} 
            price={totalPrice}
            orderDisabled={orderDisable(ingredients)}
            ordered = {purchasingHandler}
        />;

        burgerOrderSummary = <BurgerOrderSummary ingredients={ingredients} 
                                orderCancelled={purchasingCancelledHandler} 
                                orderContinue={purchasingContinueHandler} 
                                price={totalPrice.toFixed(2)} />
    }
        
    return (
        <Aux>
            {burger}
            <Modal show={purchasing} clicked={purchasingCancelledHandler}>
                {burgerOrderSummary}
            </Modal>
            {buildControls}
        </Aux>
        );
    }

export default BurgerBuilder;