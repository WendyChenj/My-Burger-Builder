import React from 'react';
import * as actions from '../../../store/action/auth';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Logout extends React.Component {

    componentDidMount() {
        this.props.onLogout();
    }

    render () {
        return (
            <Redirect to='/auth' />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.authLogOut()),
    }
}

export default connect(null, mapDispatchToProps)(Logout);