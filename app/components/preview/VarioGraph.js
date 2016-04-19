import React, { PropTypes } from 'react';
import PreviewBase from './PreviewBase';

export default class VarioGraphPreview extends PreviewBase {
  static propTypes = {
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    varioData: PropTypes.arrayOf(PropTypes.number).isRequired,
    visibleOn: PropTypes.number.isRequired,
  }

  draw() {
    this.canvas.clear();

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const { height, width } = this.refs.canvas;
      const { varioData } = this.props;
      this.canvas.drawRectangle(2, 2, width - 4, height - 4, true, true);
      const points = [];

      for (let i = 0; i < varioData.length - 1; i++) {
        const x = i;
        const y = height - (varioData[x] + height / 2);
        points.push(x + 3, y + 2);
      }
      this.canvas.drawSegmentedLine(true, points);
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
          style={{ left: positionX, top: positionY }}
          width={54}
          height={24}
          className="preview-widget"
        />
    );
  }
}
