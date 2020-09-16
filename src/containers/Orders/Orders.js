import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends React.Component {
    state = {
        orders: null,
    }

    componentDidMount() {

        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key,
                    });
                }
                this.setState({orders: fetchedOrders});
            });   
    }

    render() {

        let order = null;

        if (this.state.orders === null) {
            order = <p>No order yet!</p>
        } else {
            order = this.state.orders.map(ord => {
                return <Order key = {ord.id} ingredients = {ord.ingredients} price={ord.price} />
            });
        }

        return (
            <div>
                {order}
            </div>
        );
    }
}

export default Orders;