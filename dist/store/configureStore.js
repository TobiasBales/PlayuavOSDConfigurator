"use strict";
const redux_1 = require('redux');
const react_router_1 = require('react-router');
const redux_devtools_1 = require('redux-devtools');
const react_router_redux_1 = require('react-router-redux');
const redux_logger_1 = require('redux-logger');
const DevTools_1 = require('../DevTools');
const reducers_1 = require('../reducers');
const redux_thunk_1 = require('redux-thunk');
if (process.env.NODE_ENV === 'production') {
    const router = react_router_redux_1.routerMiddleware(react_router_1.hashHistory);
    const enhancer = redux_1.applyMiddleware(redux_thunk_1.default, router);
    function configureStore(initialState) {
        return redux_1.createStore(reducers_1.default, initialState, enhancer);
    }
    exports.default = configureStore;
}
else {
    const logger = redux_logger_1.default({
        actionTransformer: (action) => (Object.assign({}, action, {
            type: String(action.type),
        })),
        stateTransformer: (state) => {
            const plainState = {};
            Object.keys(state).forEach((key) => {
                if (typeof state[key].toJS === 'function') {
                    plainState[key] = state[key].toJS();
                }
                else {
                    plainState[key] = state[key];
                }
            });
            return plainState;
        },
        level: 'info',
        collapsed: true,
    });
    const router = react_router_redux_1.routerMiddleware(react_router_1.hashHistory);
    const enhancer = redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default, router, logger), DevTools_1.default.instrument(), redux_devtools_1.persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
    function configureStore(initialState) {
        const store = redux_1.createStore(reducers_1.default, initialState, enhancer);
        if (module.hot) {
            module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers')));
        }
        return store;
    }
    exports.default = configureStore;
}
//# sourceMappingURL=configureStore.js.map