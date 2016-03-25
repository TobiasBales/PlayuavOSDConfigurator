import React, { Component, PropTypes } from 'react';
import canvas from '../../utils/canvas';
import fonts from '../../utils/fonts';

export default class Radar extends Component {
  static propTypes = {
    heading: PropTypes.number.isRequired,
    homeBearing: PropTypes.number.isRequired,
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
    wpBearing: PropTypes.number.isRequired,
    wpNumber: PropTypes.number.isRequired,
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
    const context = this.refs.canvas.getContext('2d');
    this.clear(context);

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const width = this.refs.canvas.width;
      const height = this.refs.canvas.height;
      const radius = this.props.radius;
      const posX = width / 2;
      const posY = height / 2;
      canvas.drawCircle(context, posX, posY, radius, true);
      context.save();
      context.translate(width / 2, height / 2);
      context.rotate(this.props.heading * Math.PI / 180);
      context.translate(- width / 2, - height / 2);
      canvas.drawLine(context, posX, posY - 7, posX - 3, posY + 7, true);
      canvas.drawLine(context, posX, posY - 7, posX + 3, posY + 7, true);
      context.restore();

      const font = fonts.getFont(0);
      const homeString = 'H';
      const homeHeading = this.props.homeBearing;
      const homeX = posX + (radius + 4) * Math.sin(homeHeading * Math.PI / 180);
      const homeY = posY - (radius + 4) * Math.cos(homeHeading * Math.PI / 180);
      const homePosition = canvas.calculateStringPosition(homeString, homeX, homeY, 1, 1, font);
      canvas.drawString(context, homeString, homePosition.left, homePosition.top, font);

      const wpString = this.props.wpNumber.toFixed(0);
      const wpHeading = this.props.wpBearing;
      const wpX = posX + (radius + 4) * Math.sin(wpHeading * Math.PI / 180);
      const wpY = posY - (radius + 4) * Math.cos(wpHeading * Math.PI / 180);
      const wpPosition = canvas.calculateStringPosition(wpString, wpX, wpY, 1, 1, font);
      canvas.drawString(context, wpString, wpPosition.left, wpPosition.top, font);
    }
  }

  render() {
    const { positionX, positionY } = this.props;
    const radius = this.props.radius;
    const width = radius * 2 + 20;
    const height = radius * 2 + 20;
    const visible = (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0;

    return (
      !visible ?
        <canvas ref="canvas" /> :
        <canvas
          ref="canvas"
          style={{ left: positionX - radius - 10, top: positionY - radius - 10 }}
          width={width}
          height={height}
          className="preview-widget"
        />
    );
  }
}
