import React, { PropTypes } from 'react';
import PreviewBase from './PreviewBase';

export default class Wind extends PreviewBase {
  static propTypes = {
    heading: PropTypes.number.isRequired,
    homeBearing: PropTypes.number.isRequired,
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
  }

  draw() {
    this.canvas.clear();
    const height = this.refs.canvas.height;

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const { homeBearing, heading } = this.props;
      const bearing = homeBearing - heading;

      this.canvas.save();
      this.canvas.translate(height / 2, height / 2);
      this.canvas.rotate(bearing * Math.PI / 180);

      this.canvas.drawLine(-2, -2, -2, 8);
      this.canvas.drawLine(-1, -2, -1, 8);
      this.canvas.drawLine(0, -2, 0, 8);
      this.canvas.drawLine(1, -2, 1, 8);
      this.canvas.drawLine(2, -2, 2, 8);
      this.canvas.drawLine(-5, -3, 5, -3);
      this.canvas.drawLine(-4, -4, 4, -4);
      this.canvas.drawLine(-3, -5, 3, -5);
      this.canvas.drawLine(-2, -6, 2, -6);
      this.canvas.drawLine(-1, -7, 1, -7);
      this.canvas.drawLine(0, -8, 0, -8);

      this.canvas.drawLine(-7, -2, 0, -9, false, true);
      this.canvas.drawLine(0, -9, 7, -2, false, true);
      this.canvas.drawLine(7, -2, 3, -2, false, true);
      this.canvas.drawLine(-7, -2, -3, -2, false, true);
      this.canvas.drawLine(3, -2, 3, 9, false, true);
      this.canvas.drawLine(-3, -2, -3, 9, false, true);
      this.canvas.drawLine(-3, 9, 3, 9, false, true);
      this.canvas.restore();
    }
  }

  render() {
    const { positionX, positionY } = this.props;
    const height = 20;
    const width = 20;
    const visible = (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0;

    return (
      !visible ?
        <canvas ref="canvas" /> :
        <canvas
          ref="canvas"
          style={{ left: positionX - 6, top: positionY }}
          width={height}
          height={width}
          className="preview-widget"
        />
    );
  }
}
