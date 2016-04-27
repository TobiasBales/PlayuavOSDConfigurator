import { expect } from 'chai';
import config from '../../app/config/reducer';
import {
  ALARM, ALARM_ENABLED, ALARM_VALUE, BAUD_RATE, CHANNEL, FONT_SIZE, H_ALIGNMENT, MAX,
  MAX_PANELS, MIN, OFFSET, POSITION, VISIBLE_ON
} from '../../app/config/actions';

describe('reducers', () => {
  describe('config', () => {
    it('should handle initial state', () => {
      const state = config(undefined, {});
      expect(state).to.not.be.empty;
    });

    it('should handle ALARM', () => {
      const state = config(undefined, { type: ALARM, parameter: 'preview', payload: 'TEST ALARM' });
      expect(state.getIn(['preview', 'alarm'])).to.equal('TEST ALARM');
    });

    it('should handle ALARM_ENABLED', () => {
      let state = config(undefined, {});
      expect(state.getIn(['alarms', 'lowBatteryEnabled'])).to.equal(1);

      const action = {
        type: ALARM_ENABLED,
        parameter: 'alarms',
        payload: { alarm: 'lowBattery', enabled: 0 }
      };
      state = config(state, action);
      expect(state.getIn(['alarms', 'lowBatteryEnabled'])).to.equal(0);
    });

    it('should handle ALARM_VALUE', () => {
      let state = config(undefined, {});
      expect(state.getIn(['alarms', 'lowBatteryValue'])).to.equal(20);

      const action = {
        type: ALARM_VALUE,
        parameter: 'alarms',
        payload: { alarm: 'lowBattery', value: 30 }
      };
      state = config(state, action);
      expect(state.getIn(['alarms', 'lowBatteryValue'])).to.equal(30);
    });

    it('should handle BAUD_RATE', () => {
      let state = config(undefined, {});
      expect(state.getIn(['serial', 'baudRate'])).to.equal(7);

      const action = { type: BAUD_RATE, parameter: 'serial', payload: 5 };
      state = config(state, action);
      expect(state.getIn(['serial', 'baudRate'])).to.equal(5);
    });

    it('should handle CHANNEL', () => {
      let state = config(undefined, {});
      expect(state.getIn(['switching', 'videoChannel'])).to.equal(6);

      const action = {
        type: CHANNEL,
        parameter: 'switching',
        payload: { key: 'video', channel: 0 },
      };
      state = config(state, action);
      expect(state.getIn(['switching', 'videoChannel'])).to.equal(0);
    });

    it('should handle FONT_SIZE', () => {
      let state = config(undefined, {});
      expect(state.getIn(['rssi', 'fontSize'])).to.equal(0);

      const action = { type: FONT_SIZE, parameter: 'rssi', payload: 1 };
      state = config(state, action);
      expect(state.getIn(['rssi', 'fontSize'])).to.equal(1);
    });

    it('should handle H_ALIGNMENT', () => {
      let state = config(undefined, {});
      expect(state.getIn(['rssi', 'hAlignment'])).to.equal(0);

      const action = { type: H_ALIGNMENT, parameter: 'rssi', payload: 1 };
      state = config(state, action);
      expect(state.getIn(['rssi', 'hAlignment'])).to.equal(1);
    });

    it('should handle MAX', () => {
      let state = config(undefined, {});
      expect(state.getIn(['rssi', 'max'])).to.equal(255);

      const action = { type: MAX, parameter: 'rssi', payload: 254 };
      state = config(state, action);
      expect(state.getIn(['rssi', 'max'])).to.equal(254);
    });

    it('should handle MAX_PANELS', () => {
      let state = config(undefined, {});
      expect(state.getIn(['video', 'maxPanels'])).to.equal(3);

      const action = { type: MAX_PANELS, parameter: 'video', payload: 2 };
      state = config(state, action);
      expect(state.getIn(['video', 'maxPanels'])).to.equal(2);
    });

    it('should handle MIN', () => {
      let state = config(undefined, {});
      expect(state.getIn(['rssi', 'min'])).to.equal(0);

      const action = { type: MIN, parameter: 'rssi', payload: 10 };
      state = config(state, action);
      expect(state.getIn(['rssi', 'min'])).to.equal(10);
    });

    it('should handle OFFSET', () => {
      let state = config(undefined, {});
      expect(state.getIn(['video', 'offsetX'])).to.equal(0);
      expect(state.getIn(['video', 'offsetY'])).to.equal(0);

      const action = { type: OFFSET, parameter: 'video', payload: { x: 1, y: 1 } };
      state = config(state, action);
      expect(state.getIn(['video', 'offsetX'])).to.equal(1);
      expect(state.getIn(['video', 'offsetY'])).to.equal(1);
    });

    it('should handle OFFSET', () => {
      let state = config(undefined, {});
      expect(state.getIn(['rssi', 'positionX'])).to.equal(70);
      expect(state.getIn(['rssi', 'positionY'])).to.equal(220);

      const action = { type: POSITION, parameter: 'rssi', payload: { x: 80, y: 230 } };
      state = config(state, action);
      expect(state.getIn(['rssi', 'positionX'])).to.equal(80);
      expect(state.getIn(['rssi', 'positionY'])).to.equal(230);
    });

    it('should handle VISIBLE_ON', () => {
      let state = config(undefined, {});
      expect(state.getIn(['rssi', 'visibleOn'])).to.equal(1);

      const action = { type: VISIBLE_ON, parameter: 'rssi', payload: 3 };
      state = config(state, action);
      expect(state.getIn(['rssi', 'visibleOn'])).to.equal(3);
    });
  });
});
