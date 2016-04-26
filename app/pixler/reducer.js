import Immutable from 'immutable';
import {
  EMPTY, SHAPE, OUTLINE, CLEAR, MIRROR,
  SET_FONT_SIZE, SET_OUTLINE, SET_PIXEL, SET_SHAPE
} from './actions';
import fonts from '../utils/fonts';

const initialState = Immutable.fromJS({
  fontSize: 0,
  outline: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  shape: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
});

const set = (column) =>
  (prev) => (
    prev & ~Math.pow(2, column)
);

const unset = (column) =>
  (prev) => (
    prev | Math.pow(2, column)
);

const setArrayLength = (length) => (array) =>
  array.setSize(length).map((value) => value || 0);

const mirrorByte = (width) => (byte) => {
  let newByte = 0;
  for (let i = 0; i < width; i++) {
    if (byte & Math.pow(2, i)) {
      newByte |= Math.pow(2, width - 1 - i);
    }
  }
  return newByte;
};

export default function pixler(state = initialState, action) {
  const column = action.column;
  const row = action.row;
  switch (action.type) {
    case CLEAR:
      return state
        .update('outline', (arr) => arr.map(() => 0))
        .update('shape', (arr) => arr.map(() => 0));
    case MIRROR: {
      const { width } = fonts.getFont(state.get('fontSize')).dimensions;
      return state
        .update('outline', (arr) => arr.map(mirrorByte(width)))
        .update('shape', (arr) => arr.map(mirrorByte(width)));
    }
    case SET_FONT_SIZE: {
      const { height } = fonts.getFont(action.payload).dimensions;
      return state
        .set('fontSize', action.payload)
        .update('outline', setArrayLength(height))
        .update('shape', setArrayLength(height));
    }
    case SET_OUTLINE:
      return state.set('outline', Immutable.fromJS(action.payload));
    case SET_SHAPE:
      return state.set('shape', Immutable.fromJS(action.payload));
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
