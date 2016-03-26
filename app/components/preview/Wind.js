import React, { Component, PropTypes } from 'react';
import canvas from '../../utils/canvas';
import fonts from '../../utils/fonts';
import units from '../../utils/units';

export default class Wind extends Component {
  static propTypes = {
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
    windDirection: PropTypes.number.isRequired,
    windSpeed: PropTypes.number.isRequired,
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
    const context = this.refs.canvas.getContext('2d');
    this.clear(context);
    const height = this.refs.canvas.height;
    const posY = height / 2;
    const font = fonts.getFont(0);

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const windString = units.convertSpeed(this.props.windSpeed, this.props.units);
      const windPosition = canvas.calculateStringPosition(windString, 20, posY, 0, 1, font);
      canvas.drawString(context, windString, windPosition.left, windPosition.top, font);

      context.save();
      context.translate(9, 9);
      context.rotate(this.props.windDirection * Math.PI / 180);
      context.translate(-9, -9);
      canvas.drawLine(context, 6, 7, 9, 1);
      canvas.drawLine(context, 9, 1, 12, 7);
      canvas.drawLine(context, 9, 16, 9, 7, true);
      context.restore();
    }
  }

  render() {
    const { positionX, positionY } = this.props;
    const font = fonts.getFont(0);
    const windString = units.convertSpeed(this.props.windSpeed, this.props.units);
    const windPosition = canvas.calculateStringPosition(windString, 0, 0, 0, 1, font);
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
