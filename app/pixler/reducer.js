import Immutable from 'immutable';
import { EMPTY, SHAPE, OUTLINE, SET_PIXEL } from './actions';

const initialState = Immutable.fromJS({
  wide: false,
  shape: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  outline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
});

const set = (column) =>
  (prev) => (
    prev & ~Math.pow(2, column)
);

const unset = (column) =>
  (prev) => (
    prev | Math.pow(2, column)
);

export default function pixler(state = initialState, action) {
  const column = action.column;
  const row = action.row;
  switch (action.type) {
    case SET_PIXEL:
      switch (action.pixelType) {
        case EMPTY:
          return state
            .update('shape', (arr) => arr.update(row, set(column)))
            .update('outline', (arr) => arr.update(row, set(column)));
        case SHAPE:
          return state
            .update('shape', (arr) => arr.update(row, unset(column)))
            .update('outline', (arr) => arr.update(row, set(column)));
        case OUTLINE:
          return state
            .update('shape', (arr) => arr.update(row, unset(column)))
            .update('outline', (arr) => arr.update(row, unset(column)));
        default:
          return state;
      }
    default:
      return state;
  }
}
