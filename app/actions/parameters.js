export const ALARM = 'parameters/alarm';
export const ALARM_ENABLED = 'parameters/alarm_enabled';
export const ALARM_VALUE = 'parameters/alarm_value';
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

export function setAlarm(parameter, alarm) {
  return { type: ALARM, parameter, alarm };
}

export function setAlarmEnabled(parameter, alarm, enabled) {
  return { type: ALARM_ENABLED, parameter, alarm, enabled };
}

export function setAlarmValue(parameter, alarm, value) {
  return { type: ALARM_VALUE, parameter, alarm, value };
}

export function setBaudRate(parameter, baudRate) {
  return { type: BAUD_RATE, parameter, baudRate };
}

export function setChannel(parameter, key, channel) {
  return { type: CHANNEL, parameter, key, channel };
}

export function setFcType(parameter, fcType) {
  return { type: FC_TYPE, parameter, fcType };
}

export function setFontSize(parameter, fontSize) {
  return { type: FONT_SIZE, parameter, fontSize };
}

export function setHAlignment(parameter, hAlignment) {
  return { type: H_ALIGNMENT, parameter, hAlignment };
}

export function setMax(parameter, max) {
  return { type: MAX, parameter, max };
}

export function setMaxPanels(parameter, maxPanels) {
  return { type: MAX_PANELS, parameter, maxPanels };
}

export function setMin(parameter, min) {
  return { type: MIN, parameter, min };
}

export function setOffset(parameter, x, y) {
  return { type: OFFSET, parameter, x, y };
}

export function setPanel(parameter, panel) {
  return { type: PANEL, parameter, panel };
}

export function setParamsFromEEPROM(eepromData) {
  return { type: PARAMS_FROM_EEPROM, eepromData };
}

export function setPosition(parameter, x, y) {
  return { type: POSITION, parameter, x, y };
}

export function setRadius(parameter, key, radius) {
  return { type: RADIUS, parameter, key, radius };
}

export function setRaw(parameter, raw) {
  return { type: RAW, parameter, raw };
}

export function setScale(parameter, scale) {
  return { type: SCALE, parameter, scale };
}

export function setScaleAlignment(parameter, scaleAlignment) {
  return { type: SCALE_ALIGNMENT, parameter, scaleAlignment };
}

export function setScaleEnabled(parameter, scaleEnabled) {
  return { type: SCALE_ENABLED, parameter, scaleEnabled };
}

export function setScaleType(parameter, scaleType) {
  return { type: SCALE_TYPE, parameter, scaleType };
}

export function setType(parameter, typeValue) {
  return { type: TYPE, parameter, typeValue };
}

export function setUnits(parameter, units) {
  return { type: UNITS, parameter, units };
}

export function setVAlignment(parameter, vAlignment) {
  return { type: V_ALIGNMENT, parameter, vAlignment };
}

export function setValue(parameter, key, value) {
  return { type: VALUE, parameter, key, value };
}

export function setMode(parameter, prefix, mode) {
  return { type: MODE, parameter, prefix, mode };
}

export function setVisibleOn(parameter, visibleOn) {
  return { type: VISIBLE_ON, parameter, visibleOn };
}
