import React, {Component} from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';
import ContactData from './containers/CheckOut/ContactData/ContactData';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 
import { connect } from 'react-redux';
import * as actions from './store/action/auth';

class App extends Component {

  componentDidMount () {
    this.props.onAuthStatus();
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/checkOut/contactData' component={ ContactData } />
            <Route path='/checkOut' component={ CheckOut } />
            <Route path='/orders' component={ Orders } />
            <Route path='/auth' component={ Auth } />
            <Route path='/logout' component={ Logout } />
            <Route path='/' component={ BurgerBuilder } />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthStatus: () => dispatch(actions.checkAuthStatus()),
  }
}

export default connect(null, mapDispatchToProps)(App);
