/* eslint max-len: 0 */

const shape = [
  [0x38, 0x7c, 0xfe, 0xfe, 0xfe, 0x7c, 0x38, 0x38, 0x7c, 0xfe],
  [0x0, 0x38, 0x7c, 0xfe, 0xfe, 0xfe, 0x7c, 0x38, 0x0, 0x0],
  [0x0, 0x38, 0x7c, 0xfe, 0xfe, 0xfe, 0x7c, 0x38, 0x0, 0x0],
  [0xf8, 0xf8, 0xfe, 0xff, 0xff, 0xef, 0xe0, 0xe0, 0xe0, 0xe0],
  [0xfc, 0x1fe, 0xfc, 0x70, 0x38, 0x38, 0x70, 0xfc, 0x1fe, 0xfc],
  [0x1c0, 0x1c0, 0x1f0, 0x1f0, 0x1fc, 0x1fc, 0x1fc, 0x1fc, 0x1fc, 0x0],
  [0x10, 0x38, 0xba, 0x1ff, 0xfe, 0x7c, 0x38, 0x38, 0x38, 0x38],
  [0x0, 0x48, 0xfc, 0x1fe, 0x1fe, 0x1fe, 0xfc, 0x48, 0x0, 0x0],
];

const outline = [
  [0xc7, 0xbb, 0x7d, 0x6d, 0x7d, 0xbb, 0xc7, 0xd7, 0xbb, 0x1],
  [0x0, 0xc7, 0xab, 0x6d, 0x1, 0x6d, 0xab, 0xc7, 0x0, 0x0],
  [0x0, 0xc7, 0xab, 0x6d, 0x61, 0x7d, 0xbb, 0xc7, 0x0, 0x0],
  [0x7, 0x57, 0x51, 0x54, 0x45, 0x50, 0x5f, 0x5f, 0x5f, 0x1f],
  [0x3, 0xfd, 0x43, 0xaf, 0xd7, 0xd7, 0xaf, 0x43, 0xfd, 0x3],
  [0x3f, 0xbf, 0x8f, 0xaf, 0xa3, 0xab, 0xab, 0xab, 0x3, 0x0],
  [0xee, 0xd6, 0x54, 0x92, 0x7c, 0x92, 0xd6, 0xd6, 0xd6, 0xc6],
  [0x0, 0x5b, 0x25, 0x42, 0x7e, 0x42, 0x25, 0x5b, 0x0, 0x0],
];

const dimensions = { width: 8, height: 14 };

function getData(index) {
  return { shape: shape[index], outline: outline[index] };
}

export default { dimensions, getData };
