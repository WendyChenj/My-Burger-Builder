import React, {Component} from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './containers/CheckOut/CheckOut';
import Orders from './containers/Orders/Orders';
import ContactData from './containers/CheckOut/ContactData/ContactData';
import { BrowserRouter, Switch, Route } from 'react-router-dom'; 


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/checkOut/contactData' component={ ContactData } />
            <Route path='/checkOut' component={ CheckOut } />
            <Route path='/orders' component={ Orders } />
            <Route path='/' component={ BurgerBuilder } />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;
