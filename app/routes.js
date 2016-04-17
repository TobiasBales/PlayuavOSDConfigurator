import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Index from './containers/Index';
import Pixler from './pixler/Pixler';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="pixler" component={Pixler} />
  </Route>
);
