import React, { Component, PropTypes } from 'react';
import canvas from '../../utils/canvas';

export default class Compass extends Component {
  static propTypes = {
    heading: PropTypes.number.isRequired,
    panel: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    visibleOn: PropTypes.number.isRequired,
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
    const posY = 8;

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      canvas.drawCompass(context, this.props.heading, posY);
    }
  }

  render() {
    const { positionY } = this.props;
    const positionX = 180; // should be half width
    const width = 180;
    const height = 40;

    return (
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
