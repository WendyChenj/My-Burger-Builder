import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchOrders } from '../../store/action/order';
import { reorderBurger } from '../../store/action/burgerBuilder';
import OrderCard from '../../components/UI/OrderCard/OrderCard';
import Modal from '../../components/UI/Modal/Modal';
import { Button, Grid, Typography } from '@material-ui/core';

const Orders = () => {

    const { orders, isAuthenticate } = useSelector( state => ({
        orders: state.order.orders,
        isAuthenticate: state.auth.token !== null,
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

    if (!isAuthenticate) {
        order = 
            (<Modal show={!isAuthenticate}>
                <Typography style={{margin: '16px'}}>Please sign in first!</Typography>
                <Button variant='contained' color='secondary' onClick={() => history.push('/auth')} style={{marginLeft: '16px'}}>
                    SIGN IN
                </Button>
            </Modal>);
    } else if (orders.length === 0) {
        order = (
            <Modal show={orders.length === 0}>
                <Typography style={{margin: '16px'}}>You have no orders yet!</Typography>
                <Button variant='contained' color='secondary' onClick={() => history.push('/')} style={{marginLeft: '16px'}}>
                    CREATE YOUR FIRST BURGER
                </Button>
            </Modal>
        );
    }  else {
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