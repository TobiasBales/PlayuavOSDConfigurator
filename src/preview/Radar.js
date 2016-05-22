import React, { PropTypes } from 'react';
import Canvas from '../utils/Canvas';
import PreviewBase from './PreviewBase';
import fonts from '../utils/fonts';

export default class Radar extends PreviewBase {
  static propTypes = {
    heading: PropTypes.number.isRequired,
    homeBearing: PropTypes.number.isRequired,
    homeRadius: PropTypes.number.isRequired,
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
    wpBearing: PropTypes.number.isRequired,
    wpNumber: PropTypes.number.isRequired,
    wpRadius: PropTypes.number.isRequired,
  }

  draw() {
    this.canvas.clear();

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const width = this.refs.canvas.width;
      const height = this.refs.canvas.height;
      const { homeRadius, radius, wpRadius } = this.props;

      const posX = width / 2;
      const posY = height / 2;
      this.canvas.drawCircle(posX, posY, radius, true);
      this.canvas.save();
      this.canvas.translate(width / 2, height / 2);
      this.canvas.rotate(this.props.heading * Math.PI / 180);
      this.canvas.translate(- width / 2, - height / 2);
      this.canvas.drawLine(posX, posY - 7, posX - 3, posY + 7, true);
      this.canvas.drawLine(posX, posY - 7, posX + 3, posY + 7, true);
      this.canvas.restore();

      const font = fonts.getFont(0);
      const homeString = 'H';
      const homeHeading = this.props.homeBearing;
      const homeX = posX + homeRadius * Math.sin(homeHeading * Math.PI / 180);
      const homeY = posY - homeRadius * Math.cos(homeHeading * Math.PI / 180);
      const homePosition = Canvas.calculateStringPosition(
        homeString, homeX, homeY, 1, 1, font);
      this.canvas.drawString(homeString, homePosition.left, homePosition.top, font);

      const wpString = this.props.wpNumber.toFixed(0);
      const wpHeading = this.props.wpBearing;
      const wpX = posX + wpRadius * Math.sin(wpHeading * Math.PI / 180);
      const wpY = posY - wpRadius * Math.cos(wpHeading * Math.PI / 180);
      const wpPosition = Canvas.calculateStringPosition(wpString, wpX, wpY, 1, 1, font);
      this.canvas.drawString(wpString, wpPosition.left, wpPosition.top, font);
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
