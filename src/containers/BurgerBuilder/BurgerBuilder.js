import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import BurgerOrderSummary from '../../components/Burger/BurgerOrderSummary/BurgerOrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/action/burgerBuilder';
import * as orderActionCreator from '../../store/action/order';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
    // remember to put ingredients into code, now we want to practice fetching data from database.
    state = {
        purchasing: false,
        continueClicked: false,
    };

    componentDidMount () {
        this.props.fetchIngredients();
    }

    orderDisable = (ingredients) => {
        let totalAmtIgr = 0;
        for (let key in ingredients) {
            totalAmtIgr += ingredients[key];
        }

        if (totalAmtIgr > 0) {return false;}
        else {return true;}
    }

    purchasingHandler = () => {
        this.setState ({
            purchasing: true,
        });
    }

    purchasingCancelledHandler = () => {
        this.setState ({
            purchasing: false,
        });
    }

    purchasingContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push({pathname: '/checkOut'});
    }

    render() {
        // create an array with true/false disabled info based on the amount of ingredients
        let burger = <Spinner />;
        let buildControls = null;
        let burgerOrderSummary = null;

        if (this.props.ingredients) {
            let disabledInfo = {...this.props.ingredients};

            for(let key in disabledInfo) {
                disabledInfo[key] = (disabledInfo[key] <= 0);
            }

            burger = <Burger ingredients = {this.props.ingredients}/>;

            buildControls = <BuildControls 
               added={this.props.addIngredient} 
               removed={this.props.removeIngredient}
               // 在render()里面定义的变量不需要用this,可以直接引用
               disabled={disabledInfo} 
               price={this.props.totalPrice}
               orderDisabled={this.orderDisable(this.props.ingredients)}
               ordered = {this.purchasingHandler}
            />;

            burgerOrderSummary = <BurgerOrderSummary ingredients={this.props.ingredients} 
                                                    orderCancelled={this.purchasingCancelledHandler} 
                                                    orderContinue={this.purchasingContinueHandler} 
                                                    price={this.props.totalPrice.toFixed(2)} />

            if (this.state.continueClicked) { burgerOrderSummary = <Spinner />; }
        }
        
        return (
            <Aux>
                {burger}
                <Modal show={this.state.purchasing} clicked={this.purchasingCancelledHandler}>
                    {burgerOrderSummary}
                </Modal>
                {buildControls}
            </Aux>
        );
    }
}

const mapStateToProps = state => ({
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
});

const mapDispatchToAction = dispatch => ({
    addIngredient: (ing) => dispatch(actionCreator.add(ing)),
    removeIngredient: (ing) => dispatch(actionCreator.remove(ing)),
    fetchIngredients: () => dispatch(actionCreator.fetchIngredients()),
    onInitPurchase: () => dispatch(orderActionCreator.purchaseInit())
});

export default connect(mapStateToProps, mapDispatchToAction)(BurgerBuilder);