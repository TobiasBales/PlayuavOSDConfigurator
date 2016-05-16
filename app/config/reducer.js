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
  const payload = action.payload;

  switch (action.type) {
    case ALARM:
      return state.setIn([parameterName, 'alarm'], payload);
    case ALARM_ENABLED:
      return state.setIn([parameterName, `${payload.alarm}Enabled`], payload.enabled);
    case ALARM_VALUE:
      return state.setIn([parameterName, `${payload.alarm}Value`], payload.value);
    case AS_BASE_STATE:
      return setAsBaseState(state, action.state);
    case BAUD_RATE:
      return state.setIn([parameterName, 'baudRate'], payload);
    case CHANNEL:
      return state.setIn([parameterName, `${payload.key}Channel`], payload.channel);
    case FC_TYPE:
      return state.updateIn([parameterName, 'fcType'], () => action.fcType);
    case FONT_SIZE:
      return state.setIn([parameterName, 'fontSize'], payload);
    case H_ALIGNMENT:
      return state.setIn([parameterName, 'hAlignment'], payload);
    case MAX:
      return state.setIn([parameterName, 'max'], payload);
    case MAX_PANELS:
      return state.setIn([parameterName, 'maxPanels'], payload);
    case MIN:
      return state.setIn([parameterName, 'min'], payload);
    case OFFSET:
      return state
        .setIn([parameterName, 'offsetX'], payload.x)
        .setIn([parameterName, 'offsetY'], payload.y);
    case PANEL:
      return state.updateIn([parameterName, 'panel'], () => action.panel);
    case PARAMS_FROM_EEPROM: {
      let eepromData = action.eepromData;
      for (let i = eepromData.length; i > 0; i--) {
        if (eepromData[i - 1] !== 0) {
          eepromData = eepromData.slice(0, i);
          break;
        }
      }

      const defaultEEPROM = eeprom.defaultEEPROM;
      if (eepromData.length < defaultEEPROM.length) {
        const missingData = defaultEEPROM.slice(eepromData.length, defaultEEPROM.length);
        eepromData = eepromData.concat(missingData);
      }
      return setAsBaseState(addPreviewState(eeprom.toParameters(eepromData)));
    }
    case POSITION:
      return state
        .setIn([parameterName, 'positionX'], payload.x)
        .setIn([parameterName, 'positionY'], payload.y);
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
      return state.setIn([parameterName, 'visibleOn'], payload);
    default:
      return state;
  }
}
