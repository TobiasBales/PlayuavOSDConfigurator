import React, { Component, PropTypes } from 'react';
import canvas from '../../utils/canvas';

export default class AttitudeMp extends Component {
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
    const width = this.refs.canvas.width;
    const height = this.refs.canvas.height;

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      if (this.props.type === 0) {
        canvas.drawAttitudeMp(context, width, height,
          this.props.roll, this.props.pitch, this.props.scale);
      } else {
        canvas.drawAttitudeSimple(context, width, height,
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
