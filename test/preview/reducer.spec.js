import { expect } from 'chai';
import preview from '../../src/preview/reducer';
import { ALARM } from '../../src/preview/actions';

describe('reducers', () => {
  describe('preview', () => {
    it('should handle ALARM', () => {
      const state = preview(undefined, { type: ALARM, payload: 3 });
      expect(state.get('alarm')).to.equal(3);
    });
  });
});
