import fonts from './fonts';

export const H_ALIGNMENT_LEFT = 0;
export const H_ALIGNMENT_CENTER = 1;
export const H_ALIGNMENT_RIGHT = 2;
export const V_ALIGNMENT_TOP = 0;
export const V_ALIGNMENT_MIDDLE = 1;
export const V_ALIGNMENT_BOTTOM = 2;

export default class Canvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.pixel = this.context.createImageData(1, 1);
  }

  _setPixelData(r, g, b, a) {
    this.pixel.data[0] = r;
    this.pixel.data[1] = g;
    this.pixel.data[2] = b;
    this.pixel.data[3] = a;
  }

  _drawRectangle(x, y, width, height, lineWidth, black) {
    this.context.beginPath();
    this.context.rect(x + 0.5, y + 0.5, width, height);
    this.context.lineWidth = 2;
    this.context.strokeStyle = black ? 'black' : 'white';
    this.context.stroke();
  }

  save() {
    this.context.save();
  }

  restore() {
    this.context.restore();
  }

  translate(x, y) {
    this.context.translate(x, y);
  }

  rotate(degrees) {
    this.context.rotate(degrees);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCharacter(char, x, y, font) {
    const charData = font.getData(char);

    for (let row = 0; row < font.dimensions.height; row++) {
      const shape = charData.shape[row];
      const outline = charData.outline[row];

      for (let column = 0; column < font.dimensions.width; column++) {
        if (shape & Math.pow(2, column)) {
          this._setPixelData(255, 255, 255, 255);
          this.context.putImageData(this.pixel, x + (font.dimensions.width - column - 1), y + row);
        }

        if (shape & outline & Math.pow(2, column)) {
          this._setPixelData(0, 0, 0, 255);
          this.context.putImageData(this.pixel, x + (font.dimensions.width - column - 1), y + row);
        }
      }
    }
  }

  drawString(string, x, y, font, xSpacing = 0) {
    const width = font.dimensions.width;

    for (let i = 0; i < string.length; i++) {
      const char = string.charCodeAt(i);
      this.drawCharacter(char, x + i * (width + xSpacing), y, font);
    }
  }

  drawRectangle(x, y, width, height, black = false, outline = false) {
    if (outline) {
      this._drawRectangle(x, y, width, height, 2, black);
    }

    this._drawRectangle(x, y, width, height, 1, !black);
  }

  drawFilledRectangle(x, y, width, height, black = false, outline = false) {
    this.context.beginPath();
    this.context.rect(x + 0.5, y + 0.5, width, height);
    this.context.fillStyle = black ? 'black' : 'white';
    this.context.fill();

    if (outline) {
      this.drawRectangle(x, y, width, height, black, true);
    }
  }

  drawLine(x0, y0, x1, y1, outline = false, black = false) {
    this.drawSegmentedLine(outline, black, [x0, y0, x1, y1]);
  }

  drawSegmentedLine(outline, black, points) {
    this.context.beginPath();
    for (let i = 0; i < points.length - 2; i += 2) {
      this.context.moveTo(points[i] + 0.5, points[i + 1] + 0.5);
      this.context.lineTo(points[i + 2] + 0.5, points[i + 3] + 0.5);
    }
    if (outline) {
      this.context.lineWidth = 3;
      this.context.strokeStyle = black ? 'white' : 'black';
      this.context.stroke();
    }
    this.context.lineWidth = 1;
    this.context.strokeStyle = black ? 'black' : 'white';
    this.context.stroke();
  }

  drawVerticalScale(value, range, alignment,
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
        const textDimensions = Canvas.calculateStringPosition(
          textValue, 0, 0, hAlignment, V_ALIGNMENT_MIDDLE, font);
        const tickPosX = majTickEnd + offset + textDimensions.left;
        this.drawString(textValue, tickPosX, yPos + textDimensions.top, font, 1);
        this.drawLine(majTickStart, yPos, majTickEnd, yPos, true);
      } else if (rr % minTickStep === 0) {
        this.drawLine(minTickStart, yPos, minTickEnd, yPos, true);
      }
    }

    const textValue = value.toFixed(0);
    const textDimensions = Canvas.calculateStringPosition(
      textValue, 0, 0, hAlignment, V_ALIGNMENT_TOP, largeFont
    );

    const boxOffset = alignment === 0 ? textDimensions.width - 1 : - textDimensions.width - 1;
    const xPos = alignment === 0 ? majTickEnd + textXSpacing : majTickEnd - textXSpacing;
    const yPos = y + 1;
    for (let i = 0; i < arrowLength; i++) {
      const xOffset = alignment === 0 ? -i : i;
      this.drawLine(xPos + boxOffset, yPos - arrowLength + i,
        xPos + xOffset, yPos - arrowLength + i, false, true);
      this.drawLine(xPos + boxOffset, yPos + arrowLength - i - 2,
        xPos + xOffset, yPos + arrowLength - i - 2, false, true);
    }

    const arrowOffset = alignment === 0 ? - arrowLength : arrowLength;
    this.drawLine(xPos, yPos - arrowLength, xPos + boxOffset, yPos - arrowLength);
    this.drawLine(xPos, yPos + arrowLength - 2, xPos + boxOffset, yPos + arrowLength - 2);
    this.drawLine(xPos, yPos - arrowLength, xPos + arrowOffset, yPos);
    this.drawLine(xPos, yPos + arrowLength - 2, xPos + arrowOffset, yPos);
    this.drawLine(xPos + boxOffset, yPos - arrowLength, xPos + boxOffset, yPos + arrowLength - 2);

    const textXOffset = alignment === 0 ? 0 : textDimensions.width;
    const textYOffset = textDimensions.height / 2 + 4;
    this.drawString(textValue, xPos - textXOffset, yPos - textYOffset, largeFont, 1);
    this.drawLine(boundaryTickStart, y + (height / 2), boundaryTickEnd, y + (height / 2), true);
    this.drawLine(boundaryTickStart, y - (height / 2), boundaryTickEnd, y - (height / 2), true);
  }

  drawCompass(value, y) {
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
        this.drawLine(stepX, majTickStart, stepX, majTickEnd, true);

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
        const headingPosition = Canvas.calculateStringPosition(
          headingStr, stepX + 1, majTickStart + 8, 1, 1, font, 1);
        this.drawString(headingStr, headingPosition.left, headingPosition.top, font, 1);
      } else if (rr % minTickStep === 0) {
        this.drawLine(stepX, minTickStart, stepX, minTickEnd, true);
      }
    }
    const font = fonts.getFont(2);
    const headingStr = Math.floor(value / 100).toFixed(0) +
      Math.floor((value / 10) % 10).toFixed(0) +
      Math.floor(value % 10).toFixed(0);
    const headingPosition =
      Canvas.calculateStringPosition(headingStr, posX, majTickStart, 1, 1, font);
    this.drawRectangle(headingPosition.left, headingPosition.top + 2,
      (font.dimensions.width + 1) * 3, headingPosition.height, true, true);
    this.drawString(headingStr, headingPosition.left + 1 + headingStr.length * 1.5,
      headingPosition.top, font, -3);
  }

  drawAttitudeMp(width, height, roll, pitch, scale) {
    const xPos = width / 2;
    const yPos = height / 2;
    const font = fonts.getFont(0);
    const yStep = 11;
    const hX = 22;
    const lX = 5;
    const yOffset = pitch;
    const wingStart = Math.round(12 * scale, 0);
    const wingEnd = Math.round(7 * scale, 0);
    this.context.save();
    this.context.translate(width / 2, height / 2);
    this.context.rotate(- roll * Math.PI / 180);
    this.context.scale(scale, scale, width / 2, height / 2);
    this.context.translate(- width / 2, - height / 2);
    for (let i = 1; i <= 18; i += 2) {
      this.drawLine(xPos - lX, i * yStep + yOffset - (height / 2) + 1,
        xPos + lX, i * yStep + yOffset - (height / 2) + 1, true);
    }
    this.drawLine(xPos - hX, yPos + yOffset, xPos + hX, yPos + yOffset, true);

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
      this.drawLine(xPos + x0, yPos + y0, xPos + x1, yPos + y1, true);
    }

    this.context.restore();
    this.drawLine(xPos, yPos, xPos - 9, yPos + 5, true);
    this.drawLine(xPos, yPos, xPos + 9, yPos + 5, true);
    this.drawLine(xPos - wingStart, yPos, xPos - wingEnd, yPos, true);
    this.drawLine(xPos + wingStart, yPos, xPos + wingEnd, yPos, true);
    this.drawFilledRectangle(xPos - 9, yPos + 6, 15, 9, true);
    const pitchString = pitch.toFixed(0);
    const pitchDimensions = Canvas.calculateStringPosition(
      pitchString, xPos, yPos + 5, 1, 0, font);
    this.drawString(pitchString, pitchDimensions.left, pitchDimensions.top, font);

    const rollYPos = Math.round(yPos - 38 * scale, 0);
    this.drawLine(xPos, rollYPos, xPos - 4, rollYPos + 8, true);
    this.drawLine(xPos, rollYPos, xPos + 4, rollYPos + 8, true);
    this.drawLine(xPos - 4, rollYPos + 8, xPos + 4, rollYPos + 8, true);
    const rollString = roll.toFixed(0);
    const rollDimensions = Canvas.calculateStringPosition(
      pitchString, xPos, rollYPos - 3, 1, 2, font);
    this.drawString(rollString, rollDimensions.left, rollDimensions.top, font);
  }

  drawAttitudeSimple(width, height, roll, pitch, scale) {
    const x = width / 2;
    const y = height / 2;
    const radius = 4 * scale;
    const lineLength = 10;
    const lineSpacing = 10;
    this.drawCircle(x, y, radius, true);
    this.drawLine(x - radius - 1, y, x - 2 * radius - 1, y, true);
    this.drawLine(x + radius + 1, y, x + 2 * radius + 1, y, true);
    this.drawLine(x, y - radius - 1, x, y - 2 * radius, true);

    this.context.save();
    this.context.translate(x, y);
    this.context.rotate(roll * Math.PI / 180);
    this.context.scale(scale, scale, x, y);
    this.context.translate(- x, - y);
    const maxPitch = 60;
    let pitchY = pitch;
    if (pitch > maxPitch) {
      pitchY = maxPitch;
    } else if (pitch < -maxPitch) {
      pitchY = -maxPitch;
    }

    let i = 0;
    for (let index = 0; index < 16; index += 4) {
      const xPos = 3 * radius + i * lineLength + i * lineSpacing + lineSpacing;
      this.drawLine(x - xPos, y + pitchY, x - xPos - lineLength, y + pitchY, true);
      this.drawLine(x + xPos, y + pitchY, x + xPos + lineLength, y + pitchY, true);
      i++;
    }
    this.context.restore();
  }


  drawCircle(x, y, radius, outline = false) {
    if (outline) {
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, 2 * Math.PI);
      this.context.lineWidth = 3;
      this.context.strokeStyle = 'black';
      this.context.stroke();
    }
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    this.context.lineWidth = 1;
    this.context.strokeStyle = 'white';
    this.context.stroke();
  }

  static calculateStringPosition(string, x, y, hAlignment, vAlignment, font, xSpacing = 0) {
    if (!string) {
      return { left: x, top: y, height: 0, width: 0 };
    }

    const fontSize = font.dimensions;
    const split = string.split('\n');
    const numberOfLines = split.length;
    const numberOfCharacters = split.reduce((longestLine, line) => (
      longestLine.length > line.length ? longestLine : line
    ), '').length;

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
}
