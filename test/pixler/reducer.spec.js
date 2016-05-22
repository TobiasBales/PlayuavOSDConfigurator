import { expect } from 'chai';
import Immutable from 'immutable';
import pixler from '../../src/pixler/reducer';
import {
  EMPTY, SHAPE, OUTLINE, CLEAR, MIRROR, SET_FONT_SIZE, SET_OUTLINE, SET_SHAPE, SET_PIXEL,
} from '../../src/pixler/actions';


describe('reducers', () => {
  describe('pixler', () => {
    it('should handle initial state', () => {
      const state = pixler(undefined, {});
      expect(state).keys('fontSize', 'outline', 'shape');
      expect(state.get('outline')).to.equal(
        Immutable.List.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff));
      expect(state.get('shape')).to.equal(Immutable.List.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    });

    it('should handle CLEAR', () => {
      const state = Immutable.fromJS({
        outline: [1, 1, 1, 1, 1, 1, 1, 1],
        shape: [1, 1, 1, 1, 1, 1, 1, 1],
        fontSize: 0,
      });
      const newState = pixler(state, { type: CLEAR });
      const zeroList = Immutable.List.of(0, 0, 0, 0, 0, 0, 0, 0);
      const ffList = Immutable.List.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff);

      expect(newState.get('outline')).to.equal(ffList);
      expect(newState.get('shape')).to.equal(zeroList);
    });

    it('should handle MIRROR', () => {
      const state = Immutable.fromJS({
        outline: [0x80, 0x8, 0, 0, 0, 0, 0, 0],
        shape: [0x81, 0x38, 0, 0, 0, 0, 0, 0],
        fontSize: 0,
      });
      const newState = pixler(state, { type: MIRROR });

      expect(newState.get('outline')).to.equal(Immutable.List.of(0x1, 0x10, 0, 0, 0, 0, 0, 0));
      expect(newState.get('shape')).to.equal(Immutable.List.of(0x81, 0x1c, 0, 0, 0, 0, 0, 0));
    });

    it('should handle SET_FONT_SIZE', () => {
      const state = pixler(undefined, { type: SET_FONT_SIZE, payload: 1 });

      expect(state.get('fontSize')).to.equal(1);
      expect(state.get('outline')).to.have.size(14);
      expect(state.get('shape')).to.have.size(14);

      const newState = pixler(state, { type: SET_FONT_SIZE, payload: 0 });

      expect(newState.get('fontSize')).to.equal(0);
      expect(newState.get('outline')).to.have.size(10);
      expect(newState.get('shape')).to.have.size(10);

      const lastState = pixler(newState, { type: SET_FONT_SIZE, payload: 2 });

      expect(lastState.get('fontSize')).to.equal(2);
      expect(lastState.get('outline')).to.have.size(18);
      expect(lastState.get('shape')).to.have.size(18);
    });

    it('should handle SET_OUTLINE', () => {
      const state = pixler(undefined, {
        type: SET_OUTLINE, payload: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]
      });
      expect(state.get('outline')).to.equal(
        Immutable.List.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff));
    });

    it('should handle SET_SHAPE', () => {
      const state = pixler(undefined, {
        type: SET_SHAPE, payload: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      });
      expect(state.get('shape')).to.equal(
        Immutable.List.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    });

    it('should handle SET_PIXEL', () => {
      const state = pixler(undefined, { type: SET_PIXEL, pixelType: SHAPE, row: 0, column: 0 });
      it('for SHAPE', () => {
        expect(state.get('shape')).to.equal(Immutable.List.of(0x01, 0, 0, 0, 0, 0, 0, 0, 0, 0));
        expect(state.get('outline')).to.equal(
          Immutable.List.of(0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff));
      });

      const newState = pixler(state, { type: SET_PIXEL, pixelType: OUTLINE, row: 0, column: 1 });
      it('for OUTLINE', () => {
        expect(newState.get('shape')).to.equal(Immutable.List.of(0x03, 0, 0, 0, 0, 0, 0, 0, 0, 0));
        expect(newState.get('outline')).to.equal(
          Immutable.List.of(0xfd, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff));
      });

      const lastState = pixler(newState, { type: SET_PIXEL, pixelType: EMPTY, row: 0, column: 0 });
      it('for EMPTY', () => {
        expect(lastState.get('shape')).to.equal(Immutable.List.of(0x02, 0, 0, 0, 0, 0, 0, 0, 0, 0));
        expect(lastState.get('outline')).to.equal(
          Immutable.List.of(0xfd, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff));
      });
    });
  });
});
