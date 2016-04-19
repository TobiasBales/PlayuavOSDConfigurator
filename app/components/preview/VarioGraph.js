import React, { Component, PropTypes } from 'react';
import canvas from '../../utils/canvas';

export default class VarioGraphPreview extends Component {
  static propTypes = {
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    varioData: PropTypes.arrayOf(PropTypes.number).isRequired,
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
    const context = this.refs.canvas.getContext('2d');
    this.clear(context);

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const { height, width } = this.refs.canvas;
      const { varioData } = this.props;
      canvas.drawRectangle(context, 2, 2, width - 4, height - 4, true, true);
      const points = [];

      for (let i = 0; i < varioData.length - 1; i++) {
        const x = i;
        const y = height - (varioData[x] + height / 2);
        points.push(x + 3, y + 2);
      }
      canvas.drawSegmentedLine(context, true, points);
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
