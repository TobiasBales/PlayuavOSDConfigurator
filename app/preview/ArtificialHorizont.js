import React, { PropTypes } from 'react';
import PreviewBase from './PreviewBase';

export default class AttitudeMp extends PreviewBase {
  static propTypes = {
    panel: PropTypes.number.isRequired,
    pitch: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    roll: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
    yaw: PropTypes.number.isRequired,
  }

  draw() {
    this.canvas.clear();
    const width = this.refs.canvas.width;
    const height = this.refs.canvas.height;

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      if (this.props.type === 0) {
        this.canvas.drawAttitudeMp(width, height,
          this.props.roll, this.props.pitch, this.props.scale);
      } else {
        this.canvas.drawAttitudeSimple(width, height,
          this.props.roll, this.props.pitch, this.props.scale);
      }
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
          style={{ left: positionX - 100, top: positionY - 70 }}
          width={200}
          height={140}
          className="preview-widget"
        />
    );
  }
}
