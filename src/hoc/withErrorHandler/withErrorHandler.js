import React, { Component } from 'react';

import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedElement, axios) => {
    return (class extends Component {
        state = {
            error: null,
        }

        componentDidMount () {
            axios.interceptors.request.use(req => {this.setState({error: null}); return req;} );
            axios.interceptors.response.use(res => res, error => this.setState({error: error}));
        }

        render() {

            return (
                <Aux>
                    <Modal show={this.state.error} clicked= {() => {}}>
                        {this.state.error? this.state.error: null}
                    </Modal>
                    <WrappedElement {...this.props} />
                </Aux>
            );
        }
    }); 
}

export default withErrorHandler;