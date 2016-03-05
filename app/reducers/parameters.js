import Immutable from 'immutable';
import { ENABLED, FONT_SIZE, H_ALIGNMENT, PANELS, POSITION } from '../actions/parameters';

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
  homeDistance: basicSettings,
  relativeAltitude: basicSettings,
  speedAir: basicSettings,
  speedGround: basicSettings,
  time: basicSettings,
  totalTrip: basicSettings,
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
    case PANELS:
      return state.updateIn([parameterName, 'panels'], () => action.panels);
    case POSITION:
      return state
        .updateIn([parameterName, 'position', 'x'], () => action.position.get('x'))
        .updateIn([parameterName, 'position', 'y'], () => action.position.get('y'));
    default:
      return state;
  }
}
