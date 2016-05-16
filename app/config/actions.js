export const ALARM = 'parameters/alarm';
export const ALARM_ENABLED = 'parameters/alarm_enabled';
export const ALARM_VALUE = 'parameters/alarm_value';
export const AS_BASE_STATE = 'as_base_state';
export const BAUD_RATE = 'parameters/baud_rate';
export const CHANNEL = 'parameters/channel';
export const FC_TYPE = 'parameters/fc_type';
export const FONT_SIZE = 'parameters/font_size';
export const H_ALIGNMENT = 'parameters/h_alignment';
export const MAX = 'parameters/max';
export const MAX_PANELS = 'parameters/max_panels';
export const MIN = 'parameters/min';
export const OFFSET = 'parameters/offset';
export const PANEL = 'parameters/panels';
export const PARAMS_FROM_EEPROM = 'parameters/params_from_eeprom';
export const POSITION = 'parameters/position';
export const RADIUS = 'parameters/radius';
export const RAW = 'parameters/raw';
export const SCALE = 'parameters/scale';
export const SCALE_ALIGNMENT = 'parameters/scale_alignment';
export const SCALE_ENABLED = 'parameters/scale_enabled';
export const SCALE_TYPE = 'parameters/scale_type';
export const TYPE = 'parameters/type';
export const UNITS = 'parameters/units';
export const V_ALIGNMENT = 'parameters/v_alignment';
export const VALUE = 'parameters/value';
export const MODE = 'parameters/mode';
export const VISIBLE_ON = 'parameters/visible_on';

function setAlarm(parameter, alarm) {
  return { type: ALARM, parameter, payload: alarm };
}

function setAlarmEnabled(parameter, alarm, enabled) {
  return { type: ALARM_ENABLED, parameter: 'alarms', payload: { alarm, enabled } };
}

function setAlarmValue(parameter, alarm, value) {
  return { type: ALARM_VALUE, parameter: 'alarms', payload: { alarm, value } };
}

function setAsBaseState(state) {
  return { type: AS_BASE_STATE, state };
}

function setBaudRate(baudRate) {
  return { type: BAUD_RATE, parameter: 'serial', payload: baudRate };
}

function setChannel(parameter, key, channel) {
  return { type: CHANNEL, parameter, payload: { key, channel } };
}

function setFcType(fcType) {
  return { type: FC_TYPE, parameter: 'serial', fcType };
}

function setFontSize(parameter, fontSize) {
  return { type: FONT_SIZE, parameter, payload: fontSize };
}

function setHAlignment(parameter, hAlignment) {
  return { type: H_ALIGNMENT, parameter, payload: hAlignment };
}

function setMax(parameter, max) {
  return { type: MAX, parameter, payload: max };
}

function setMaxPanels(maxPanels) {
  return { type: MAX_PANELS, parameter: 'video', payload: parseInt(maxPanels, 10) };
}

function setMin(parameter, min) {
  return { type: MIN, parameter, payload: min };
}

function setOffset(parameter, x, y) {
  return { type: OFFSET, parameter, payload: { x, y } };
}

function setPanel(parameter, panel) {
  return { type: PANEL, parameter, panel };
}

function setParamsFromEEPROM(eepromData) {
  return { type: PARAMS_FROM_EEPROM, eepromData };
}

function setPosition(parameter, x, y) {
  return { type: POSITION, parameter, payload: { x, y } };
}

function setRadius(parameter, key, radius) {
  return { type: RADIUS, parameter, key, radius };
}

function setRaw(parameter, raw) {
  return { type: RAW, parameter, raw };
}

function setScale(parameter, scale) {
  return { type: SCALE, parameter, scale };
}

function setScaleAlignment(parameter, scaleAlignment) {
  return { type: SCALE_ALIGNMENT, parameter, scaleAlignment };
}

function setScaleEnabled(parameter, scaleEnabled) {
  return { type: SCALE_ENABLED, parameter, scaleEnabled };
}

function setScaleType(parameter, scaleType) {
  return { type: SCALE_TYPE, parameter, scaleType };
}

function setType(parameter, typeValue) {
  return { type: TYPE, parameter, typeValue };
}

function setUnits(parameter, units) {
  return { type: UNITS, parameter, units };
}

function setVAlignment(parameter, vAlignment) {
  return { type: V_ALIGNMENT, parameter, vAlignment };
}

function setValue(parameter, key, value) {
  return { type: VALUE, parameter, key, value };
}

function setMode(parameter, prefix, mode) {
  return { type: MODE, parameter, prefix, mode: parseInt(mode, 10) };
}

function setVisibleOn(parameter, visibleOn) {
  return { type: VISIBLE_ON, parameter, payload: visibleOn };
}

export default {
  setAlarm,
  setAlarmEnabled,
  setAlarmValue,
  setAsBaseState,
  setBaudRate,
  setChannel,
  setFcType,
  setFontSize,
  setHAlignment,
  setMax,
  setMaxPanels,
  setMin,
  setOffset,
  setPanel,
  setParamsFromEEPROM,
  setPosition,
  setRadius,
  setRaw,
  setScale,
  setScaleAlignment,
  setScaleEnabled,
  setScaleType,
  setType,
  setUnits,
  setVAlignment,
  setValue,
  setMode,
  setVisibleOn,
};
