import fonts from './fonts';

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

function calculateStringPosition(string, x, y, hAlignment, vAlignment, font, xSpacing = 0) {
  if (!string) {
    return { left: x, top: y, height: 0, width: 0 };
  }

  const fontSize = font.dimensions;
  const split = string.split('\n');
  const numberOfLines = split.length;
  const numberOfCharacters = split.reduce((longestLine, line) => {
    return longestLine.length > line.length ? longestLine : line;
  }, '').length;

  const height = numberOfLines * fontSize.height;
  const width = numberOfCharacters * (fontSize.width + xSpacing);

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
      throw new Error(`unexpected horizontal alignment ${hAlignment}`);
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
      throw new Error(`unexpected vertical alignment ${vAlignment}`);
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

function drawString(context, string, x, y, font, xSpacing = 0) {
  const width = font.dimensions.width;

  for (let i = 0; i < string.length; i++) {
    const char = string.charCodeAt(i);
    drawCharacter(context, char, x + i * (width + xSpacing), y, font);
  }
}

function drawFilledRectangle(context, x, y, width, height, black = false, outline = false) {
  context.beginPath();
  context.rect(x + 0.5, y + 0.5, width, height);
  context.fillStyle = black ? 'black' : 'white';
  context.fill();

  if (outline) {
    context.beginPath();
    context.rect(x + 0.5, y + 0.5, width, height);
    context.lineWidth = 3;
    context.strokeStyle = black ? 'black' : 'white';
    context.stroke();
    context.beginPath();
    context.rect(x + 0.5, y + 0.5, width, height);
    context.lineWidth = 1;
    context.strokeStyle = black ? 'white' : 'black';
    context.stroke();
  }
}

function drawRectangle(context, x, y, width, height, black = false, outline = false) {
  if (outline) {
    context.beginPath();
    context.rect(x + 0.5, y + 0.5, width, height);
    context.lineWidth = 3;
    context.strokeStyle = black ? 'black' : 'white';
    context.stroke();
  }
  context.beginPath();
  context.rect(x + 0.5, y + 0.5, width, height);
  context.lineWidth = 1;
  context.strokeStyle = black ? 'white' : 'black';
  context.stroke();
}

function drawLine(context, x0, y0, x1, y1, outline = false, black = false) {
  context.beginPath();
  context.moveTo(x0 + 0.5, y0 + 0.5);
  context.lineTo(x1 + 0.5, y1 + 0.5);
  if (outline) {
    context.lineWidth = 3;
    context.strokeStyle = black ? 'white' : 'black';
    context.stroke();
  }
  context.lineWidth = 1;
  context.strokeStyle = black ? 'black' : 'white';
  context.stroke();
}

function drawVerticalScale(context, value, range, alignment,
  x, y, height, minTickStep, majTickStep, minTickLength, majTickLength,
  boundaryTickLength, maxValue, font) {
  const majTickStart = x;
  const majTickEnd = alignment === 0 ? x + majTickLength : x - majTickLength;
  const minTickStart = x;
  const minTickEnd = alignment === 0 ? x + minTickLength : x - minTickLength;
  const boundaryTickStart = x;
  const boundaryTickEnd = alignment === 0 ? x + boundaryTickLength : x - boundaryTickLength;
  const largeFont = fonts.getFont(2);
  const arrowLength = (largeFont.dimensions.height / 2);
  const textXSpacing = largeFont.dimensions.width / 2;
  const hAlignment = alignment === 0 ? H_ALIGNMENT_LEFT : H_ALIGNMENT_RIGHT;
  const halfRange = Math.round(range / 2, 0);

  for (let step = -halfRange; step <= halfRange; step++) {
    const rr = step + halfRange - value;
    const stepValue = -rr + halfRange;
    const textValue = stepValue.toFixed(0);

    const yPos = Math.round((step * height / range) + y, 0);
    if (rr % majTickStep === 0) {
      const offset = alignment === 0 ? + textXSpacing + 1 : - textXSpacing + 1;
      const textDimensions = calculateStringPosition(
        textValue, 0, 0, hAlignment, V_ALIGNMENT_MIDDLE, font);
      const tickPosX = majTickEnd + offset + textDimensions.left;
      drawString(context, textValue, tickPosX, yPos + textDimensions.top, font, 1);
      drawLine(context, majTickStart, yPos, majTickEnd, yPos, true);
    } else if (rr % minTickStep === 0) {
      drawLine(context, minTickStart, yPos, minTickEnd, yPos, true);
    }
  }
  const textValue = value.toFixed(0);
  const textDimensions = calculateStringPosition(
    textValue, 0, 0, hAlignment, V_ALIGNMENT_TOP, largeFont
  );

  const boxOffset = alignment === 0 ? textDimensions.width - 1 : - textDimensions.width - 1;
  const xPos = alignment === 0 ? majTickEnd + textXSpacing : majTickEnd - textXSpacing;
  const yPos = y + 1;
  for (let i = 0; i < arrowLength; i++) {
    const xOffset = alignment === 0 ? -i : i;
    drawLine(context, xPos + boxOffset, yPos - arrowLength + i,
      xPos + xOffset, yPos - arrowLength + i, false, true);
    drawLine(context, xPos + boxOffset, yPos + arrowLength - i - 2,
      xPos + xOffset, yPos + arrowLength - i - 2, false, true);
  }
  const arrowOffset = alignment === 0 ? - arrowLength : arrowLength;
  drawLine(context, xPos, yPos - arrowLength, xPos + boxOffset, yPos - arrowLength);
  drawLine(context, xPos, yPos + arrowLength - 2, xPos + boxOffset, yPos + arrowLength - 2);
  drawLine(context, xPos, yPos - arrowLength, xPos + arrowOffset, yPos);
  drawLine(context, xPos, yPos + arrowLength - 2, xPos + arrowOffset, yPos);
  drawLine(context, xPos + boxOffset, yPos - arrowLength, xPos + boxOffset, yPos + arrowLength - 2);
  const textXOffset = alignment === 0 ? 0 : textDimensions.width;
  const textYOffset = textDimensions.height / 2 + 4;
  drawString(context, textValue, xPos - textXOffset, yPos - textYOffset, largeFont, 1);
  drawLine(context, boundaryTickStart, y + (height / 2), boundaryTickEnd, y + (height / 2), true);
  drawLine(context, boundaryTickStart, y - (height / 2), boundaryTickEnd, y - (height / 2), true);
}

function drawCompass(context, value, y) {
  const range = 120;
  const width = 180;
  const majTickStart = y;
  const majTickLength = 8;
  const majTickEnd = y - majTickLength;
  const majTickStep = 30;
  const minTickStart = y;
  const minTickLength = 5;
  const minTickEnd = y - minTickLength;
  const minTickStep = 15;
  const halfRange = range / 2;
  const posX = width / 2;

  for (let step = -halfRange; step <= halfRange; step++) {
    const font = fonts.getFont(0);
    const rr = (value + step + 360) % 360;
    const stepX = (step * width) / range + posX;
    if (rr % majTickStep === 0) {
      drawLine(context, stepX, majTickStart, stepX, majTickEnd, true);

      let headingStr = '';
      if (rr % 90 !== 0) {
        headingStr = Math.floor(rr / 100).toFixed(0) + Math.floor((rr / 10) % 10).toFixed(0);
      } else {
        switch (rr) {
          case 0:
            headingStr = 'N';
            break;
          case 90:
            headingStr = 'E';
            break;
          case 180:
            headingStr = 'S';
            break;
          case 270:
            headingStr = 'W';
            break;
          default:
            break;
        }
      }
      const headingPosition = calculateStringPosition(
        headingStr, stepX + 1, majTickStart + 8, 1, 1, font, 1);
      drawString(context, headingStr, headingPosition.left, headingPosition.top, font, 1);
    } else if (rr % minTickStep === 0) {
      drawLine(context, stepX, minTickStart, stepX, minTickEnd, true);
    }
  }
  const font = fonts.getFont(2);
  const headingStr = Math.floor(value / 100).toFixed(0) +
    Math.floor((value / 10) % 10).toFixed(0) +
    Math.floor(value % 10).toFixed(0);
  const headingPosition = calculateStringPosition(headingStr, posX, majTickStart, 1, 1, font);
  drawRectangle(context, headingPosition.left, headingPosition.top + 2,
    (font.dimensions.width + 1) * 3, headingPosition.height, true, true);
  drawString(context, headingStr, headingPosition.left + 1 + headingStr.length * 1.5, headingPosition.top, font, -3);
}

function drawCircle(context, x, y, radius, outline = false) {
  if (outline) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.lineWidth = 3;
    context.strokeStyle = 'black';
    context.stroke();
  }
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.lineWidth = 1;
  context.strokeStyle = 'white';
  context.stroke();
}

function drawAttitudeMp(context, width, height, roll, pitch, scale) {
  const xPos = width / 2;
  const yPos = height / 2;
  const font = fonts.getFont(0);
  const yStep = 11;
  const hX = 22;
  const lX = 5;
  const yOffset = pitch;
  const wingStart = Math.round(12 * scale, 0);
  const wingEnd = Math.round(7 * scale, 0);
  context.save();
  context.translate(width / 2, height / 2);
  context.rotate(- roll * Math.PI / 180);
  context.scale(scale, scale, width / 2, height / 2);
  context.translate(- width / 2, - height / 2);
  for (let i = 1; i <= 18; i += 2) {
    drawLine(context, xPos - lX, i * yStep + yOffset - (height / 2) + 1,
      xPos + lX, i * yStep + yOffset - (height / 2) + 1, true);
  }
  drawLine(context, xPos - hX, yPos + yOffset, xPos + hX, yPos + yOffset, true);

  let circleX = 0;
  let circleY = 0;
  let theta = 0;
  const mp = 6;
  let i = mp;
  const radius = 38;
  const arcStep = (mp * 10) / 6;
  const points = new Array(mp * 2);
  for (let index = 0; index < mp; index++) {
    theta = i * arcStep;
    circleX = radius * Math.sin(theta * Math.PI / 180);
    circleY = radius * Math.cos(theta * Math.PI / 180);
    points[index] = [-circleX, -circleY];
    points[points.length - index - 1] = [circleX, -circleY];
    i--;
  }
  for (i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    drawLine(context, xPos + x0, yPos + y0, xPos + x1, yPos + y1, true);
  }

  context.restore();
  drawLine(context, xPos, yPos, xPos - 9, yPos + 5, true);
  drawLine(context, xPos, yPos, xPos + 9, yPos + 5, true);
  drawLine(context, xPos - wingStart, yPos, xPos - wingEnd, yPos, true);
  drawLine(context, xPos + wingStart, yPos, xPos + wingEnd, yPos, true);
  drawFilledRectangle(context, xPos - 9, yPos + 6, 15, 9, true);
  const pitchString = pitch.toFixed(0);
  const pitchDimensions = calculateStringPosition(
    pitchString, xPos, yPos + 5, 1, 0, font);
  drawString(context, pitchString, pitchDimensions.left, pitchDimensions.top, font);

  const rollYPos = Math.round(yPos - 38 * scale, 0);
  drawLine(context, xPos, rollYPos, xPos - 4, rollYPos + 8, true);
  drawLine(context, xPos, rollYPos, xPos + 4, rollYPos + 8, true);
  drawLine(context, xPos - 4, rollYPos + 8, xPos + 4, rollYPos + 8, true);
  const rollString = roll.toFixed(0);
  const rollDimensions = calculateStringPosition(
    pitchString, xPos, rollYPos - 3, 1, 2, font);
  drawString(context, rollString, rollDimensions.left, rollDimensions.top, font);
}

function drawAttitudeSimple(context, width, height, roll, pitch, scale) {
  const x = width / 2;
  const y = height / 2;
  const radius = 4 * scale;
  const lineLength = 10;
  const lineSpacing = 10;
  drawCircle(context, x, y, radius, true);
  drawLine(context, x - radius - 1, y, x - 2 * radius - 1, y, true);
  drawLine(context, x + radius + 1, y, x + 2 * radius + 1, y, true);
  drawLine(context, x, y - radius - 1, x, y - 2 * radius, true);

  context.save();
  context.translate(x, y);
  context.rotate(roll * Math.PI / 180);
  context.scale(scale, scale, x, y);
  context.translate(- x, - y);
  const maxPitch = 60;
  const pitchY = pitch > maxPitch ? maxPitch : pitch < - maxPitch ? - maxPitch : pitch;
  for (let i = 0; i < 4; i++) {
    const lineOffset = 3 * radius + i * lineLength + i * lineSpacing + lineSpacing;
    const lineY = y + pitchY;
    drawLine(context, x - lineOffset, lineY, x - lineOffset - lineLength, lineY, true);
    drawLine(context, x + lineOffset, lineY, x + lineOffset + lineLength, lineY, true);
  }
  context.restore();
}

export default {
  calculateStringPosition,
  drawAttitudeMp,
  drawAttitudeSimple,
  drawCircle,
  drawCompass,
  drawFilledRectangle,
  drawLine,
  drawString,
  drawVerticalScale,
};
