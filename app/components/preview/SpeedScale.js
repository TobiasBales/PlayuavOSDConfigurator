import React, { Component, PropTypes } from 'react';
import fonts from '../../utils/fonts';
import canvas from '../../utils/canvas';
import units from '../../utils/units';

export default class SpeedScale extends Component {
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

  componentDidMount() {
    this.draw();
  }

  shouldComponentUpdate(nextProps) {
    return Object.keys(this.props).reduce((shouldUpdate, key) => {
      if (key.startsWith('set')) {
        return shouldUpdate;
      }
      return shouldUpdate || this.props[key] !== nextProps[key];
    }, false);
  }

  componentDidUpdate() {
    this.draw();
  }

  clear(context) {
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  }

  draw() {
    const font = fonts.getFont(0);
    const context = this.refs.canvas.getContext('2d');
    this.clear(context);

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const { speedAir, speedGround, scaleAlignment } = this.props;
      const hAlignment = scaleAlignment === 0 ? 0 : 2;
      const prefix = this.props.scaleType === 0 ? 'GSPD' : 'ASPD';
      const prefixPosition = canvas.calculateStringPosition(prefix, 0, 0, hAlignment, 0, font);
      const unitString = 'KM/H';
      const unitPosition = canvas.calculateStringPosition(
        unitString, 0, 0, hAlignment, 0, font);
      const speed = this.props.scaleType === 0 ? speedGround : speedAir;
      const posX = scaleAlignment === 0 ? 0 : 75;
      const posY = 50;
      const scaleSpeed = units.convertSpeedWithoutUnits(speed, this.props.units);
      canvas.drawVerticalScale(context,
        Math.round(scaleSpeed, 0),
        60, scaleAlignment, posX, posY, 72, 10, 20, 5, 8, 11, 100, font);
      canvas.drawString(context, prefix, posX + prefixPosition.left, posY - 50, font);
      canvas.drawString(context, unitString, posX + unitPosition.left, posY + 40, font);
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
