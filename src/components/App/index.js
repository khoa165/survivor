import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Landing from '../Pages/Landing';
import Routes from '../Routing';

import { withAuthentication } from '../Session';
import * as ROUTES from '../../constants/routes';

import './App.scss';

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      {/* Landing page does not have navbar and does not need container, all other pages require them. */}
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route component={Routes} />
    </Switch>
  </Router>
);

export default withAuthentication(App);
