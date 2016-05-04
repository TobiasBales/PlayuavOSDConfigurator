import React, { PropTypes } from 'react';
import Canvas from '../../utils/Canvas';
import PreviewBase from './PreviewBase';
import fonts from '../../utils/fonts';

export default class ThrottlePreview extends PreviewBase {
  static propTypes = {
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    scaleEnabled: PropTypes.number.isRequired,
    scaleType: PropTypes.number,
    throttle: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
  }

  draw() {
    const font = fonts.getFont(0);
    this.canvas.clear();

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      if (this.props.scaleEnabled) {
        const string = `${this.props.throttle.toFixed(0)}%`;
        const position = Canvas.calculateStringPosition(string, 0, 0, 2, 2, font);
        const posX = 75;
        const posY = 25;
        this.canvas.drawString(string, posX - position.width, posY, font);
        const posThY = Math.round(this.props.throttle * 0.5, 0);
        const posThX = posX - 25 + posThY;

        if (this.props.scaleType === 0) {
          this.canvas.drawFilledRectangle(posX + 3, posY + 25 - posThY, 5, posThY);
          this.canvas.drawLine(posX + 3, posY - 25, posX + 7, posY - 25);
          this.canvas.drawLine(posX + 3, posY + 25 - posThY, posX + 7, posY + 25 - posThY);
          this.canvas.drawLine(posX + 3, posY - 25, posX + 3, posY + 25 - posThY);
          this.canvas.drawLine(posX + 7, posY - 25, posX + 7, posY + 25 - posThY);
        } else {
          this.canvas.drawFilledRectangle(posX - 25, posY + 10, posThY, 5);
          this.canvas.drawLine(posThX, posY + 10, posX + 25, posY + 10);
          this.canvas.drawLine(posThX, posY + 14, posX + 25, posY + 14);
          this.canvas.drawLine(posX + 25, posY + 10, posX + 25, posY + 14);
          this.canvas.drawLine(posX - 25, posY + 10, posX - 25, posY + 14);
        }
      } else {
        const string = `thr ${this.props.throttle.toFixed(0)}%`;
        const position = Canvas.calculateStringPosition(string, 0, 0, 2, 2, font);
        const posX = 75;
        const posY = 25;
        this.canvas.drawString(string, posX - position.width, posY, font);
      }
    }
  }

  render() {
    const { positionX, positionY } = this.props;
    const visible = (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0;

    return (
      !visible ?
        <canvas ref="canvas" /> :
        <canvas
          ref="canvas"
          style={{ left: positionX - 75, top: positionY - 25 }}
          width={101}
          height={51}
          className="preview-widget"
        />
    );
  }
}
