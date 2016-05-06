import Immutable from 'immutable';
import {
  EMPTY, SHAPE, OUTLINE, CLEAR, INVERT_OUTLINE, MIRROR,
  SET_FONT_SIZE, SET_OUTLINE, SET_PIXEL, SET_SHAPE,
  SHIFT_DOWN, SHIFT_LEFT, SHIFT_RIGHT, SHIFT_UP,
} from './actions';
import fonts from '../utils/fonts';

const initialState = Immutable.fromJS({
  fontSize: 0,
  outline: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
  shape: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
});

const set = (column) =>
  (prev) => (
    prev & ~Math.pow(2, column)
);

const unset = (column) =>
  (prev) => (
    prev | Math.pow(2, column)
);

const setArrayLength = (length, fallback) => (array) =>
  array.setSize(length).map((value) => value || fallback);

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
    case INVERT_OUTLINE: {
      const { width } = fonts.getFont(state.get('fontSize')).dimensions;
      return state
        .update('outline', (arr) => arr.map((b) => (~b >>> 0) & (Math.pow(2, width) - 1)));
    }
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
        .update('outline', setArrayLength(height, 0xff))
        .update('shape', setArrayLength(height, 0));
    }
    case SET_OUTLINE: {
      const { height } = fonts.getFont(state.get('fontSize')).dimensions;
      const outline = Immutable.fromJS(action.payload);
      return state.set('outline', setArrayLength(height, 0xff)(outline));
    }
    case SET_SHAPE: {
      const { height } = fonts.getFont(state.get('fontSize')).dimensions;
      const shape = Immutable.fromJS(action.payload);
      return state.set('shape', setArrayLength(height, 0)(shape));
    }
    case SET_PIXEL:
      switch (action.pixelType) {
        case EMPTY:
          return state
            .update('shape', (arr) => arr.update(row, set(column)))
            .update('outline', (arr) => arr.update(row, unset(column)));
        case SHAPE:
          return state
            .update('shape', (arr) => arr.update(row, unset(column)))
            .update('outline', (arr) => arr.update(row, unset(column)));
        case OUTLINE:
          return state
            .update('shape', (arr) => arr.update(row, unset(column)))
            .update('outline', (arr) => arr.update(row, set(column)));
        default:
          return state;
      }
    case SHIFT_DOWN: {
      return state
        .update('outline', (arr) => arr.unshift(0).slice(0, -1))
        .update('shape', (arr) => arr.unshift(0).slice(0, -1));
    }
    case SHIFT_LEFT:
      return state
        .update('outline', (arr) => arr.map((b) => b << 1))
        .update('shape', (arr) => arr.map((b) => b << 1));
    case SHIFT_RIGHT:
      return state
        .update('outline', (arr) => arr.map((b) => b >> 1))
        .update('shape', (arr) => arr.map((b) => b >> 1));
    case SHIFT_UP:
      return state
        .update('outline', (arr) => arr.slice(1).push(0))
        .update('shape', (arr) => arr.slice(1).push(0));
    default:
      return state;
  }
}
