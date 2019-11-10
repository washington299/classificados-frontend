import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import AdPage from './pages/AdPage';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/about" component={About} />
    <Route exact path="/sign-in" component={Login} />
    <Route exact path="/sign-up" component={Register} />
    <Route exact path="/ad/:id" component={AdPage} />
    <Route exact component={NotFound} />
  </Switch>
);

export default Routes;
