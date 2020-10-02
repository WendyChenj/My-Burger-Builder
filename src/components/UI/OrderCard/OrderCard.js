import React from 'react';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LooksOneIcon from '@material-ui/icons/LooksOne';

const useStyle = makeStyles({
    root: {
        marginTop: '24px',
        marginBottom: '24px',
        height: '350px',
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: '8px 0px',
    },
    orderStatus: {
        fontSize: '1.1rem',
        paddingLeft: '8px',
    },
    line: {
        padding: '0 -8px'
    },
    ingTitle: {
        padding: '8px 0'
    },
    ing: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2px 0 2px 0'
    },
});

const OrderCard = props => {
    const classes = useStyle();   

    const eachIng = Object.keys(props.ingredients).map( ing => {
        return (
            <div className={classes.ing} key={ ing }>
                <Typography>
                    {ing}
                </Typography>
                <span>
                    { [...Array( parseInt(props.ingredients[ing]) )].map(ele => 
                        <LooksOneIcon key={Math.random()}/> )}
                </span>
            </div>);
    });

    return (
        <Card className={classes.root}>
            <CardContent>
                <div className={classes.title}>
                    <CheckCircleOutlineIcon />
                    <Typography className={classes.orderStatus} align='center'>
                        Order Completed
                    </Typography>
                </div>

                <hr />

                <div style={{height: '180px'}}>
                    <Typography variant="caption" component="h2" className={classes.ingTitle}>
                        Ingredients:
                    </Typography>

                    {eachIng}
                </div>
                
                <hr />

                <div style={{paddingTop: '16px', display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant='caption'> Total: ${parseInt(props.price).toFixed(2)}</Typography>
                    <Button size="small" variant='contained' color="secondary" onClick={props.reorder}>
                        REORDER
                    </Button>
                </div>
                
            </CardContent>
        </Card>
    );
}

export default OrderCard;