import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchOrders } from '../../store/action/order';
import { reorderBurger } from '../../store/action/burgerBuilder';
import OrderCard from '../../components/UI/OrderCard/OrderCard';

// material-ui
import { Grid } from '@material-ui/core';

const Orders = () => {

    const { orders } = useSelector( state => ({
        orders: state.order.orders,
    }));

    const dispatch = useDispatch();

    
    useEffect(() => {
        dispatch(fetchOrders());
        // eslint-disable-next-line
    }, []);

    let history = useHistory();

    const reorderHandler = (event, ings) => {
        event.preventDefault();
        dispatch(reorderBurger(ings));
        history.push('/checkOut');
    }

    let order = null;

    if (orders === null) {
        order = <p>No order yet!</p>
    } else {
        order = orders.map(ord => {
            return (
                <Grid item xs={12} sm={12} md={6} lg={4}  key={ord.id}>
                    <OrderCard  ingredients={ord.ingredients} price={ord.price} 
                       reorder={(event) => reorderHandler(event, ord.ingredients)} 
                    />
                </Grid>
            );
        });
    }

        return (
            <div>
                <Grid container>
                    <Grid item xs={2} >
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container spacing={2}>
                               {order}
                        </Grid>
                    </Grid>
                    <Grid item xs={2} >
                    </Grid>
                </Grid>   
            </div>
        );
    }


export default Orders;