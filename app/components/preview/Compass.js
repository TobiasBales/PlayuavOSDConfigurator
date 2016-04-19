import React, { PropTypes } from 'react';
import PreviewBase from './PreviewBase';

export default class Compass extends PreviewBase {
  static propTypes = {
    heading: PropTypes.number.isRequired,
    panel: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
  }

  draw() {
    this.canvas.clear();
    const posY = 8;

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      this.canvas.drawCompass(this.props.heading, posY);
    }
  }

  render() {
    const { positionY } = this.props;
    const positionX = 180; // should be half width
    const width = 180;
    const height = 40;

    const visible = (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0;

    return (
      !visible ?
        <canvas ref="canvas" /> :
        <canvas
          ref="canvas"
          style={{ left: positionX - width / 2, top: positionY - 8 }}
          width={width}
          height={height}
          className="preview-widget"
        />
    );
  }
}
