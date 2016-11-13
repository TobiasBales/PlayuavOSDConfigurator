import React, { PropTypes } from 'react';
import Canvas from '../utils/Canvas';
import PreviewBase from './PreviewBase';
import fonts from '../utils/fonts';
import units from '../utils/units';

export default class SpeedScale extends PreviewBase {
  static propTypes = {
    speedGround: PropTypes.number.isRequired,
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    scaleAlignment: PropTypes.number.isRequired,
    scaleType: PropTypes.number.isRequired,
    speedAir: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
  }

  draw() {
    const font = fonts.getFont(0);
    this.canvas.clear();

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const { speedAir, speedGround, scaleAlignment } = this.props;
      const hAlignment = scaleAlignment === 0 ? 0 : 2;
      const prefix = this.props.scaleType === 0 ? 'GS' : 'AS';
      const prefixPosition = Canvas.calculateStringPosition(prefix, 0, 0, hAlignment, 0, font);
      var unitString = ''
      if (this.props.units === 0) {
        unitString = 'KM/H';
      } else {
        unitString = 'M/H';
      }
      const unitPosition = Canvas.calculateStringPosition(
        unitString, 0, 0, hAlignment, 0, font);
      const speed = this.props.scaleType === 0 ? speedGround : speedAir;
      const posX = scaleAlignment === 0 ? 0 : 75;
      const posY = 50;
      const scaleSpeed = units.convertSpeedWithoutUnits(speed, this.props.units);
      this.canvas.drawVerticalScale(
        Math.round(scaleSpeed, 0),
        60, scaleAlignment, posX, posY, 72, 10, 20, 5, 8, 11, 100, font);
      this.canvas.drawString(prefix, posX + prefixPosition.left, posY - 50, font);
      this.canvas.drawString(unitString, posX + unitPosition.left, posY + 40, font);
    }
  }

  render() {
    const { positionX, positionY, scaleAlignment } = this.props;
    const xOffset = scaleAlignment === 0 ? 0 : 75;
    const visible = (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0;

    return (
      !visible ?
        <canvas ref="canvas" /> :
        <canvas
          ref="canvas"
          style={{ left: positionX - xOffset, top: positionY - 50 }}
          width={75}
          height={100}
          className="preview-widget"
        />
    );
  }
}
