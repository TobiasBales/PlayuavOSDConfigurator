import * as actions from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  panel: 0,
  alarm: 0,
  showGrid: false,
});

export default function preview(state = initialState, action = {}) {
  const payload = action.payload;

  switch (action.type) {
    case actions.ALARM:
      return state.set('alarm', payload);
    case actions.PANEL:
      return state.set('panel', payload);
    case actions.TOGGLE_GRID:
      return state.update('showGrid', (show) => !show);
    default:
      return state;
  }
}
