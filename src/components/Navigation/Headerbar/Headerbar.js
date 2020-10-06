import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import './Headerbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../../../assets/images/burger-logo.png';

const useStyle = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        color: theme.palette.primary.dark,
    },
    toolbarRoot: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    menuIcon: {
        color: 'white',
        fontSize: 'large',
    }
}));

const HeaderBar = (props) => {

    const [ anchorEl, setAnchorEl ] = useState(null);

    const classes = useStyle();

    const matches = useMediaQuery('(min-width: 600px)');

    let history = useHistory();

    const clickOpenHandler = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const clickCloseHandler = (event, link) => {
        event.preventDefault();
        history.push(link);
        setAnchorEl(null);
    }

    const closeMenuHandler = () => {
        setAnchorEl(null);
    }

    return (
        <div>
            <AppBar className={classes.root}> 
                <Toolbar className='toolbarRoot'>
                    <div className='BurgerLogo'>
                        <img src={Logo} alt='MyBurger' />
                    </div>

                    {matches ? 
                        (<div>
                            <NavigationItems isAuth={props.isAuth} />    
                        </div>)
                    : 
                        (<div>
                            <IconButton edge='end' aria-label="menu" onClick={clickOpenHandler} aria-haspopup="true">
                                <MenuIcon className={classes.menuIcon} />
                            </IconButton> 

                            <Menu id='header-menu' open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={closeMenuHandler}>
                                <MenuItem onClick={event => clickCloseHandler(event, '/')}>Burger Builder</MenuItem>
                                <MenuItem onClick={event => clickCloseHandler(event, '/orders')}>Orders</MenuItem>

                                {props.isAuth ? 
                                    <MenuItem onClick={event => clickCloseHandler(event, '/logout')}>Log Out</MenuItem>
                                    : <MenuItem onClick={event => clickCloseHandler(event, '/auth')}>Account</MenuItem>
                                }
                            </Menu>
                        </div>)  
                    }   

                </Toolbar>
            </AppBar> 
        </div>
    );
}

export default HeaderBar;