import React, { Component, PropTypes } from 'react';
import fonts from '../../utils/fonts';
import canvas from '../../utils/canvas';

export default class StringPreview extends Component {
  static propTypes = {
    fontSize: PropTypes.number.isRequired,
    hAlignment: PropTypes.number.isRequired,
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    vAlignment: PropTypes.number,
    visibleOn: PropTypes.number.isRequired,
  }

  static defaultProps = {
    vAlignment: 0,
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  content() {
    return '';
  }

  clear(context) {
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  }

  draw() {
    const font = fonts.getFont(this.props.fontSize);
    const context = this.refs.canvas.getContext('2d');
    this.clear(context);

    if (this.props.visibleOn & Math.pow(2, this.props.panel) !== 0) {
      canvas.drawString(context, this.content(), 0, 0, font);
    }
  }

  render() {
    const { hAlignment, positionX, positionY, vAlignment } = this.props;
    const content = this.content();
    const font = fonts.getFont(this.props.fontSize);
    const position = canvas.calculateStringPosition(content, positionX, positionY, hAlignment, vAlignment, font);

    return (
      <canvas
        ref="canvas"
        style={{ left: position.left, top: position.top }}
        width={position.width}
        height={position.height}
        className="preview-widget"
      />
    );
  }
}
