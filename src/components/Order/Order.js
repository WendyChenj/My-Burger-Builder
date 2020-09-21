import React, { Component } from 'react';

class Order extends Component {

    render() {
        let ingredients = this.props.ingredients;

        // hello world
        let ingredient = null;

        if (ingredients) {
            ingredient = Object.keys(ingredients).map(ig => {
                return <span key={ig}>{ig}: {ingredients[ig]}</span>
            });
        } else {
            ingredient = <span>No ingredient!</span>
        }

        return (
            <div>
                <p>Ingredients: {ingredient}</p>
                <p>Price: {this.props.price}</p>
            </div>
            
        );
    }
    
}

export default Order;