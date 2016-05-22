import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import parameters from './config/reducer';
import pixler from './pixler/reducer';
import preview from './preview/reducer';

const rootReducer = combineReducers({
  parameters,
  pixler,
  preview,
  routing
});

export default rootReducer;
