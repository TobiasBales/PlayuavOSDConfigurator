export const ENABLED = 'parameter/enabled';
export const FONT_SIZE = 'parameters/font_size';
export const H_ALIGNMENT = 'parameters/h_alignment';
export const POSITION = 'parameters/position';
export const VISIBLE_ON = 'parameter/visible_on';
export const VIDEO_MODE = 'parameter/video_mode';

export function setEnabled(parameter, enabled) {
  return { type: ENABLED, parameter, enabled };
}

export function setFontSize(parameter, fontSize) {
  return { type: FONT_SIZE, parameter, fontSize };
}

export function setHAlignment(parameter, hAlignment) {
  return { type: H_ALIGNMENT, parameter, hAlignment };
}

export function setPosition(parameter, position) {
  return { type: POSITION, parameter, position };
}

export function setPanels(parameter, panels) {
  return { type: VISIBLE_ON, parameter, panels };
}

export function setVideoMode(parameter, videoMode) {
  return { type: VIDEO_MODE, parameter, videoMode} ;
}
