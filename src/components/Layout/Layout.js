import React from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends React.Component {

  state = {
    showDrawer: false,
  }

  showDrawerHandler = () => {
    this.setState ({
      showDrawer: true,
    });
  }

  closeDrawerHandler = () => {
    this.setState ({
      showDrawer: false,
    });
  }

  render() {
    return (
      <Aux>
        <Toolbar clicked={this.showDrawerHandler} isAuth={this.props.isAuthenticate} />
        <Sidedrawer show={this.state.showDrawer} clicked={this.closeDrawerHandler} isAuth={this.props.isAuthenticate} />
        <main className="Content">
          {this.props.children}
        </main>
      </Aux>
    );
  }  
}

const mapStatetToProps = state => {
  return {
    isAuthenticate: state.auth.token !== null,
  }
}

export default connect(mapStatetToProps)(Layout);