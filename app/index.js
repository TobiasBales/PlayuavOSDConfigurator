import extensiblePolyfill from 'extensible-polyfill';
extensiblePolyfill('immutable');

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './app.global.css';
import 'react-toolbox/lib/commons.scss';
import 'roboto-fontface/css/roboto-fontface';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV !== 'production') {
  // Use require because imports can't be conditional.
  // In production, you should ensure process.env.NODE_ENV
  // is envified so that Uglify can eliminate this
  // module and its dependencies as dead code.
  // require('./createDevToolsWindow')(store);
}
