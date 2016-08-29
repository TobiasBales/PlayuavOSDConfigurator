import { createStore, applyMiddleware, compose } from 'redux';
import { hashHistory } from 'react-router';
import { persistState } from 'redux-devtools';
import { routerMiddleware } from 'react-router-redux';
import createLogger from 'redux-logger';
import DevTools from '../DevTools';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

if (process.env.NODE_ENV === 'production') {
	const router = routerMiddleware(hashHistory);
	const enhancer = applyMiddleware(thunk, router);

	export default function configureStore(initialState) {
	  return createStore(rootReducer, initialState, enhancer);
	}

} else {


	const logger = createLogger({
	  actionTransformer: (action) => (
	    Object.assign({}, action, {
	      type: String(action.type),
	    })
	  ),
	  stateTransformer: (state) => {
	    const plainState = {};
	    Object.keys(state).forEach((key) => {
	      if (typeof state[key].toJS === 'function') {
	        plainState[key] = state[key].toJS();
	      } else {
	        plainState[key] = state[key];
	      }
	    });
	    return plainState;
	  },
	  level: 'info',
	  collapsed: true,
	});

	const router = routerMiddleware(hashHistory);

	const enhancer = compose(
	  applyMiddleware(thunk, router, logger),
	  DevTools.instrument(),
	  persistState(
	    window.location.href.match(
	      /[?&]debug_session=([^&]+)\b/
	    )
	  )
	);

	export default function configureStore(initialState) {
	  const store = createStore(rootReducer, initialState, enhancer);

	  if (module.hot) {
	    module.hot.accept('../reducers', () =>
	      store.replaceReducer(require('../reducers'))
	    );
	  }

	  return store;
	}
}
