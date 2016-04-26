export const EMPTY = Symbol('pixler/empty');
export const SHAPE = Symbol('pixler/shape');
export const OUTLINE = Symbol('pixler/outline');
export const CLEAR = Symbol('pixler/clear');
export const MIRROR = Symbol('pixler/mirror');
export const SET_FONT_SIZE = Symbol('pixler/set_font_size');
export const SET_OUTLINE = Symbol('pixler/set_outline');
export const SET_PIXEL = Symbol('pixler/set_pixel');
export const SET_SHAPE = Symbol('pixler/set_outline');

export function clear() {
  return { type: CLEAR };
}

export function mirror() {
  return { type: MIRROR };
}

export function setFontSize(fontSize) {
  return { type: SET_FONT_SIZE, payload: fontSize };
}

export function setOutline(outline) {
  return { type: SET_OUTLINE, payload: outline };
}

export function setPixel(row, column, pixelType) {
  return { type: SET_PIXEL, column, row, pixelType };
}

export function setShape(shape) {
  return { type: SET_SHAPE, payload: shape };
}
