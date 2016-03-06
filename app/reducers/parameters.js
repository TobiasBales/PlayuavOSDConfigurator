import Immutable from 'immutable';
import {
  ENABLED, FONT_SIZE, H_ALIGNMENT, PANELS, POSITION, VIDEO_MODE
} from '../actions/parameters';

window.imm = Immutable;

const basicSettings = {
  enabled: true,
  fontSize: 0,
  hAlignment: 0,
  panels: [true, false, false],
  position: {
    x: 10, y: 10
  },
};

const initialState = Immutable.fromJS({
  numberOfPanels: 3,
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
  wpDistance: basicSettings,
  videoMode: {
    videoMode: 1
  },
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
    case PANELS:
      return state.updateIn([parameterName, 'panels'], () => action.panels);
    case POSITION:
      return state
        .updateIn([parameterName, 'position', 'x'], () => action.position.get('x'))
        .updateIn([parameterName, 'position', 'y'], () => action.position.get('y'));
    case VIDEO_MODE:
      return state.updateIn([parameterName, 'videoMode'], () => action.videoMode);
    default:
      return state;
  }
}
