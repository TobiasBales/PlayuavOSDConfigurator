const H_ALIGNMENT_LEFT = 0;
const H_ALIGNMENT_CENTER = 1;
const H_ALIGNMENT_RIGHT = 2;
const V_ALIGNMENT_TOP = 0;
const V_ALIGNMENT_MIDDLE = 1;
const V_ALIGNMENT_BOTTOM = 2;

function setPixelData(pixel, r, g, b, a) {
  pixel.data[0] = r;
  pixel.data[1] = g;
  pixel.data[2] = b;
  pixel.data[3] = a;
}

function calculateStringPosition(string, x, y, hAlignment, vAlignment, font) {
  const fontSize = font.dimensions;

  const split = string.split('\n');
  const numberOfLines = split.length;
  const numberOfCharacters = split.reduce((longestLine, line) => {
    return longestLine.length > line.length ? longestLine : line;
  }, '').length;

  const height = numberOfLines * fontSize.height;
  const width = numberOfCharacters * fontSize.width;

  const position = { left: x, top: y };

  switch (hAlignment) {
    case H_ALIGNMENT_LEFT:
      break;
    case H_ALIGNMENT_CENTER:
      position.left -= width / 2;
      break;
    case H_ALIGNMENT_RIGHT:
      position.left -= width;
      break;
    default:
      throw new Error('unexpected horizontal alignment ' + hAlignment);
  }
  switch (vAlignment) {
    case V_ALIGNMENT_TOP:
      break;
    case V_ALIGNMENT_MIDDLE:
      position.top -= height / 2;
      break;
    case V_ALIGNMENT_BOTTOM:
      position.top -= height;
      break;
    default:
      throw new Error('unexpected vertical alignment ' + vAlignment);
  }

  return {
    height,
    left: position.left,
    top: position.top,
    width,
  };
}

function drawCharacter(context, char, x, y, font) {
  const pixel = context.createImageData(1, 1);
  const charData = font.getData(char);

  for (let row = 0; row < font.dimensions.height; row++) {
    const shape = charData.shape[row];
    const outline = charData.outline[row];

    for (let column = 0; column < font.dimensions.width; column++) {
      if (shape & Math.pow(2, column)) {
        setPixelData(pixel, 255, 255, 255, 255);
        context.putImageData(pixel, x + (font.dimensions.width - column - 1), y + row);
      }

      if (shape & outline & Math.pow(2, column)) {
        setPixelData(pixel, 0, 0, 0, 255);
        context.putImageData(pixel, x + (font.dimensions.width - column - 1), y + row);
      }
    }
  }
}

function drawString(context, string, x, y, font) {
  const width = font.dimensions.width;

  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    drawCharacter(context, char, x + i * width, y, font);
  }
}

export default {
  calculateStringPosition,
  drawString
};
