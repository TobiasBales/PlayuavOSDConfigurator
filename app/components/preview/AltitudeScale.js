import React, { Component, PropTypes } from 'react';
import fonts from '../../utils/fonts';
import canvas from '../../utils/canvas';
import units from '../../utils/units';

export default class AltitudeScale extends Component {
  static propTypes = {
    absoluteAltitude: PropTypes.number.isRequired,
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    relativeAltitude: PropTypes.number.isRequired,
    scaleAlignment: PropTypes.number.isRequired,
    scaleType: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.draw();
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
      const { absoluteAltitude, relativeAltitude, scaleAlignment } = this.props;
      const hAlignment = scaleAlignment === 0 ? 0 : 2;
      const prefix = this.props.scaleType === 0 ? 'AALT' : 'RALT';
      const prefixPosition = canvas.calculateStringPosition(prefix, 0, 0, hAlignment, 0, font);
      const unitString = 'M';
      const unitPosition = canvas.calculateStringPosition(
        unitString, 0, 0, hAlignment, 0, font);
      const altitude = this.props.scaleType === 0 ? absoluteAltitude : relativeAltitude;
      const posX = scaleAlignment === 0 ? 0 : 75;
      const posY = 50;
      const scaleAltitude = units.convertDistanceWithoutUnits(altitude, this.props.units);
      canvas.drawVerticalScale(context,
        Math.round(scaleAltitude, 0),
        60, scaleAlignment, posX, posY, 72, 10, 20, 5, 8, 11, 10000, font);
      canvas.drawString(context, prefix, posX + prefixPosition.left, posY - 50, font);
      canvas.drawString(context, unitString, posX + unitPosition.left, posY + 40, font);
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
          style={{ left: positionX - 75, top: positionY - 50 }}
          width={75}
          height={100}
          className="preview-widget"
        />
    );
  }
}
