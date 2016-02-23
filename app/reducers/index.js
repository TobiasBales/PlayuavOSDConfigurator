import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import parameters from './parameters';

const rootReducer = combineReducers({
  parameters,
  routing
});

export default rootReducer;
