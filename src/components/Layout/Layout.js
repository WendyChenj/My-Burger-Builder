import React from 'react';
import { useSelector } from 'react-redux';
import './Layout.css';
import Headerbar from '../Navigation/Headerbar/Headerbar';

const Layout = props => {
  const { isAuthenticate } = useSelector( state => ({
    isAuthenticate: state.auth.token !== null,
  }));

  return (
    <>
      <Headerbar isAuth={isAuthenticate} />
      <main className="Content">
        {props.children}
      </main>
    </>
  );
}

export default Layout;