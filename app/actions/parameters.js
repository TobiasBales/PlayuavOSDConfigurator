export const ENABLED = 'parameter/enabled';
export const FONT_SIZE = 'parameters/font_size';
export const H_ALIGNMENT = 'parameters/h_alignment';
export const OFFSET = 'parameters/offset';
export const POSITION = 'parameters/position';
export const UNITS = 'parameters/units';
export const VIDEO_MODE = 'parameters/video_mode';
export const VISIBLE_ON = 'parameters/visible_on';

export function setEnabled(parameter, enabled) {
  return { type: ENABLED, parameter, enabled };
}

export function setFontSize(parameter, fontSize) {
  return { type: FONT_SIZE, parameter, fontSize };
}

export function setHAlignment(parameter, hAlignment) {
  return { type: H_ALIGNMENT, parameter, hAlignment };
}

export function setOffset(parameter, offset) {
  return { type: OFFSET, parameter, offset };
}

export function setPosition(parameter, position) {
  return { type: POSITION, parameter, position };
}

export function setUnits(parameter, units) {
  return { type: UNITS, parameter, units };
}

export function setVideoMode(parameter, videoMode) {
  return { type: VIDEO_MODE, parameter, videoMode };
}

export function setVisibleOn(parameter, visibleOn) {
  return { type: VISIBLE_ON, parameter, visibleOn };
}
