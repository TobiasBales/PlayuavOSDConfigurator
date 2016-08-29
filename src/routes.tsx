import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import Config from './config/Config';
import Pixler from './pixler/Pixler';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Config} />
    <Route path="pixler" component={Pixler} />
  </Route>
);
