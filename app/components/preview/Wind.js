import React, { PropTypes } from 'react';
import Canvas from '../../utils/Canvas';
import PreviewBase from './PreviewBase';
import fonts from '../../utils/fonts';
import units from '../../utils/units';

export default class Wind extends PreviewBase {
  static propTypes = {
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
    windDirection: PropTypes.number.isRequired,
    windSpeed: PropTypes.number.isRequired,
  }

  draw() {
    this.canvas.clear();
    const height = this.refs.canvas.height;
    const posY = height / 2;
    const font = fonts.getFont(0);

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const windString = units.convertSpeed(this.props.windSpeed, this.props.units);
      const windPosition = Canvas.calculateStringPosition(windString, 20, posY, 0, 1, font);
      this.canvas.drawString(windString, windPosition.left, windPosition.top, font);

      this.canvas.save();
      this.canvas.translate(9, 9);
      this.canvas.rotate(this.props.windDirection * Math.PI / 180);
      this.canvas.translate(-9, -9);
      this.canvas.drawLine(6, 7, 9, 1);
      this.canvas.drawLine(9, 1, 12, 7);
      this.canvas.drawLine(9, 16, 9, 7, true);
      this.canvas.restore();
    }
  }

  render() {
    const { positionX, positionY } = this.props;
    const font = fonts.getFont(0);
    const windString = units.convertSpeed(this.props.windSpeed, this.props.units);
    const windPosition = Canvas.calculateStringPosition(windString, 0, 0, 0, 1, font);
    const width = windPosition.width + 20;
    const height = 18;
    const visible = (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0;

    return (
      !visible ?
        <canvas ref="canvas" /> :
        <canvas
          ref="canvas"
          style={{ left: positionX - 6, top: positionY }}
          width={width}
          height={height}
          className="preview-widget"
        />
    );
  }
}
