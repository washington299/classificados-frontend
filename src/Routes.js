import React from 'react';
import { Switch } from 'react-router-dom';

import RouteHandler from './components/RouteHandler';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import AdPage from './pages/AdPage';
import AddAd from './pages/AddAd';
import Ads from './pages/Ads';
import MyAccount from './pages/MyAccount';

const Routes = () => (
  <Switch>
    <RouteHandler exact path="/">
      <Home />
    </RouteHandler>
    <RouteHandler exact path="/sign-in">
      <Login />
    </RouteHandler>
    <RouteHandler exact path="/sign-up">
      <Register />
    </RouteHandler>
    <RouteHandler exact path="/ad/:id">
      <AdPage />
    </RouteHandler>
    <RouteHandler private exact path="/post-an-ad">
      <AddAd />
    </RouteHandler>
    <RouteHandler exact path="/ads">
      <Ads />
    </RouteHandler>
    <RouteHandler private exact path="/my-account">
      <MyAccount />
    </RouteHandler>
    <RouteHandler exact component={NotFound} />
  </Switch>
);

export default Routes;
