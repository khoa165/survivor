import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Landing from '../Landing';
import Routes from '../Routing';

import { withAuthentication } from '../Session';

import '../../styles/App.scss';

const App = () => (
  <Router>
    <Fragment>
      <ToastContainer />
      <Switch>
        {/* Landing page does not have navbar and does not need container, all other pages require them. */}
        <Route exact path='/' component={Landing} />
        <Route component={Routes} />
      </Switch>
    </Fragment>
  </Router>
);

export default withAuthentication(App);
