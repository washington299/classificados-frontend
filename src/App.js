import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { Template } from './components/templateComponents';
import Header from './components/partials/Header';
import Routes from './Routes';
import Footer from './components/partials/Footer';

import './App.css';

const Page = () => (
  <BrowserRouter>
    <Template>
      <Header />
      <Routes />
      <Footer />
    </Template>
  </BrowserRouter>
);

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
