import React from 'react';
import { Switch } from 'react-router-dom';

import RouteHandler from './components/RouteHandler';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import AdPage from './pages/AdPage';

const Routes = () => (
  <Switch>
    <RouteHandler exact path="/">
      <Home />
    </RouteHandler>
    <RouteHandler exact path="/about">
      <About />
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
      <About />
    </RouteHandler>
    <RouteHandler exact component={NotFound} />
  </Switch>
);

export default Routes;
