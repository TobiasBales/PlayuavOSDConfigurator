export const EMPTY = Symbol('pixler/empty');
export const SHAPE = Symbol('pixler/shape');
export const OUTLINE = Symbol('pixler/outline');
export const SET_PIXEL = Symbol('pixler/set_pixel');

export function setPixel(row, column, pixelType) {
  return { type: SET_PIXEL, column, row, pixelType };
}
