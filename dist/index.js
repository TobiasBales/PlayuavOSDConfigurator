"use strict";
const extensible_polyfill_1 = require('extensible-polyfill');
extensible_polyfill_1.default('immutable');
const React = require('react');
const react_dom_1 = require('react-dom');
const react_redux_1 = require('react-redux');
const react_router_1 = require('react-router');
const react_router_redux_1 = require('react-router-redux');
const routes_1 = require('./routes');
const configureStore_1 = require('./store/configureStore');
require('material-design-icons-iconfont/dist/material-design-icons.css');
require('./app.global.css');
require('react-toolbox/lib/commons.scss');
require('roboto-fontface/css/roboto-fontface');
const injectTapEventPlugin = require('react-tap-event-plugin');
const store = configureStore_1.default();
const history = react_router_redux_1.syncHistoryWithStore(react_router_1.hashHistory, store);
injectTapEventPlugin();
react_dom_1.render(React.createElement(react_redux_1.Provider, {store: store}, 
    React.createElement(react_router_1.Router, {history: history, routes: routes_1.default})
), document.getElementById('root'));
if (process.env.NODE_ENV !== 'production') {
}
//# sourceMappingURL=index.js.map