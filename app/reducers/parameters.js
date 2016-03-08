import eeprom from '../utils/eeprom';

import {
  ENABLED, FONT_SIZE, H_ALIGNMENT, VISIBLE_ON, POSITION, VIDEO_MODE, UNITS, OFFSET, PARAMS_FROM_EEPROM,
} from '../actions/parameters';

const initialState = eeprom.toParameters(eeprom.defaultEEPROM);

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
        .updateIn([parameterName, 'offsetX'], () => action.x)
        .updateIn([parameterName, 'offsetY'], () => action.y);
    case VISIBLE_ON:
      return state.updateIn([parameterName, 'visibleOn'], () => action.visibleOn);
    case POSITION:
      return state
        .updateIn([parameterName, 'positionX'], () => action.x)
        .updateIn([parameterName, 'positionY'], () => action.y);
    case UNITS:
      return state.updateIn([parameterName, 'units'], () => action.units);
    case VIDEO_MODE:
      return state.updateIn([parameterName, 'videoMode'], () => action.videoMode);
    case PARAMS_FROM_EEPROM:
      return eeprom.toParameters(action.eepromData);
    default:
      return state;
  }
}
