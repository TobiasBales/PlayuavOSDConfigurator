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
      this.canvas.translate(- height / 2, - height / 2);
      this.canvas.drawFilledRectangle(7, 8, 5, 10);
      this.canvas.drawLine(4, 8, 15, 8);
      this.canvas.drawLine(5, 7, 14, 7);
      this.canvas.drawLine(6, 6, 13, 6);
      this.canvas.drawLine(7, 5, 12, 5);
      this.canvas.drawLine(8, 4, 11, 4);
      this.canvas.drawLine(9, 3, 10, 3);
      this.canvas.drawLine(4, 8, 10, 2, false, true);
      this.canvas.drawLine(10, 2, 15, 8, false, true);
      this.canvas.drawLine(15, 8, 12, 8, false, true);
      this.canvas.drawLine(4, 8, 7, 8, false, true);
      this.canvas.drawLine(12, 8, 12, 18, false, true);
      this.canvas.drawLine(7, 8, 7, 18, false, true);
      this.canvas.drawLine(7, 18, 12, 18, false, true);
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
