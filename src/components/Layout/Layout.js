import React from 'react';

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
        <Toolbar clicked={this.showDrawerHandler} />
        <Sidedrawer show={this.state.showDrawer} clicked={this.closeDrawerHandler} />
        <main className="Content">
          {this.props.children}
        </main>
      </Aux>
    );
  }

    
}

export default Layout;