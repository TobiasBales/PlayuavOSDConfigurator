import eeprom from '../utils/eeprom';

import {
  ALARM, ALARM_ENABLED, ALARM_VALUE, AS_BASE_STATE, BAUD_RATE, CHANNEL,
  FC_TYPE, FONT_SIZE, H_ALIGNMENT, MAX, MAX_PANELS, MIN, OFFSET, PANEL,
  PARAMS_FROM_EEPROM, POSITION, RADIUS, RAW, SCALE, SCALE_ALIGNMENT,
  SCALE_ENABLED, SCALE_TYPE, TYPE, UNITS, V_ALIGNMENT, VALUE, MODE,
  VISIBLE_ON,
} from './actions';

function addPreviewState(state) {
  return state
    .updateIn(['preview', 'panel'], () => 0)
    .updateIn(['preview', 'alarm'], () => 0);
}

function setAsBaseState(state, baseState = null) {
  return state.updateIn(['originalState'], () => baseState || state);
}

const initialState = setAsBaseState(addPreviewState(eeprom.toParameters(eeprom.defaultEEPROM)));

export default function parameters(state = initialState, action) {
  const parameterName = action.parameter;

  switch (action.type) {
    case ALARM:
      return state.updateIn([parameterName, 'alarm'], () => action.alarm);
    case ALARM_ENABLED:
      return state.updateIn([parameterName, `${action.alarm}Enabled`], () => action.enabled);
    case ALARM_VALUE:
      return state.updateIn([parameterName, `${action.alarm}Value`], () => action.value);
    case AS_BASE_STATE:
      return setAsBaseState(state, action.state);
    case BAUD_RATE:
      return state.updateIn([parameterName, 'baudRate'], () => action.baudRate);
    case CHANNEL:
      return state.updateIn([parameterName, `${action.key}Channel`], () => action.channel);
    case FC_TYPE:
      return state.updateIn([parameterName, 'fcType'], () => action.fcType);
    case FONT_SIZE:
      return state.updateIn([parameterName, 'fontSize'], () => action.fontSize);
    case H_ALIGNMENT:
      return state.updateIn([parameterName, 'hAlignment'], () => action.hAlignment);
    case MAX:
      return state.updateIn([parameterName, 'max'], () => action.max);
    case MAX_PANELS:
      return state.updateIn([parameterName, 'maxPanels'], () => action.maxPanels);
    case MIN:
      return state.updateIn([parameterName, 'min'], () => action.min);
    case OFFSET:
      return state
        .updateIn([parameterName, 'offsetX'], () => action.x)
        .updateIn([parameterName, 'offsetY'], () => action.y);
    case PANEL:
      return state.updateIn([parameterName, 'panel'], () => action.panel);
    case PARAMS_FROM_EEPROM:
      return addPreviewState(setAsBaseState(eeprom.toParameters(action.eepromData)));
    case POSITION:
      return state
        .updateIn([parameterName, 'positionX'], () => action.x)
        .updateIn([parameterName, 'positionY'], () => action.y);
    case RADIUS:
      return state.updateIn([parameterName, action.key], () => action.radius);
    case RAW:
      return state.updateIn([parameterName, 'raw'], () => action.raw);
    case SCALE:
      return state.updateIn([parameterName, 'scale'], () => action.scale);
    case SCALE_ALIGNMENT:
      return state.updateIn([parameterName, 'scaleAlignment'], () => action.scaleAlignment);
    case SCALE_ENABLED:
      return state.updateIn([parameterName, 'scaleEnabled'], () => action.scaleEnabled);
    case SCALE_TYPE:
      return state.updateIn([parameterName, 'scaleType'], () => action.scaleType);
    case TYPE:
      return state.updateIn([parameterName, 'type'], () => action.typeValue);
    case UNITS:
      return state.updateIn([parameterName, 'units'], () => action.units);
    case V_ALIGNMENT:
      return state.updateIn([parameterName, 'vAlignment'], () => action.vAlignment);
    case VALUE:
      return state.updateIn([parameterName, `${action.key}Value`], () => action.value);
    case MODE:
      return state.updateIn([parameterName, `${action.prefix}Mode`], () => action.mode);
    case VISIBLE_ON:
      return state.updateIn([parameterName, 'visibleOn'], () => action.visibleOn);
    default:
      return state;
  }
}
