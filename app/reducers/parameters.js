import Immutable from 'immutable';

import {
  ENABLED, FONT_SIZE, H_ALIGNMENT, VISIBLE_ON, POSITION, VIDEO_MODE, UNITS, OFFSET,
} from '../actions/parameters';

const basicSettings = {
  enabled: true,
  fontSize: 0,
  hAlignment: 0,
  visibleOn: [true, false, false],
  position: {
    x: 10, y: 10
  },
};

const initialState = Immutable.fromJS({
  absoluteAltitude: basicSettings,
  armState: basicSettings,
  batteryConsumed: basicSettings,
  batteryCurrent: basicSettings,
  batteryRemaining: basicSettings,
  batteryVoltage: basicSettings,
  flightMode: basicSettings,
  gps2Hdop: basicSettings,
  gps2Latitude: basicSettings,
  gps2Longitude: basicSettings,
  gps2Status: basicSettings,
  gpsHdop: basicSettings,
  gpsLatitude: basicSettings,
  gpsLongitude: basicSettings,
  gpsStatus: basicSettings,
  homeDistance: basicSettings,
  relativeAltitude: basicSettings,
  rssi: basicSettings,
  speedAir: basicSettings,
  speedGround: basicSettings,
  time: basicSettings,
  totalTrip: basicSettings,
  serial: { uartBaudRate: 8 },
  video: { videoMode: 1, units: 0, offset: { x: 0, y: 0 }, maxPanels: 3 },
  wpDistance: basicSettings,
});

export default function parameters(state = initialState, action) {
  const parameterName = action.parameter;

  switch (action.type) {
    case ENABLED:
      return state.updateIn([parameterName, 'enabled'], () => action.enabled);
    case FONT_SIZE:
      return state.updateIn([parameterName, 'fontSize'], () => action.fontSize);
    case H_ALIGNMENT:
      return state.updateIn([parameterName, 'hAlignment'], () => action.hAlignment);
    case OFFSET:
      return state
        .updateIn([parameterName, 'offset', 'x'], () => action.offset.get('x'))
        .updateIn([parameterName, 'offset', 'y'], () => action.offset.get('y'));
    case VISIBLE_ON:
      return state.updateIn([parameterName, 'panels'], () => action.visibleOn);
    case POSITION:
      return state
        .updateIn([parameterName, 'position', 'x'], () => action.position.get('x'))
        .updateIn([parameterName, 'position', 'y'], () => action.position.get('y'));
    case UNITS:
      return state.updateIn([parameterName, 'units'], () => action.units);
    case VIDEO_MODE:
      return state.updateIn([parameterName, 'videoMode'], () => action.videoMode);
    default:
      return state;
  }
}
