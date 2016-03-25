import React, { Component, PropTypes } from 'react';
import fonts from '../../utils/fonts';
import canvas from '../../utils/canvas';

export default class ClimbRate extends Component {
  static propTypes = {
    climbRate: PropTypes.number.isRequired,
    fontSize: PropTypes.number.isRequired,
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
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

  clear(context) {
    context.clearRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
  }

  draw() {
    const font = fonts.getFont(this.props.fontSize);
    const context = this.refs.canvas.getContext('2d');
    const arrowLength = this.props.fontSize === 0 ? 6 : 8;
    this.clear(context);

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const xPos = 3;
      const yPos = this.refs.canvas.height / 2;
      canvas.drawString(context, this.content(), xPos + 5, yPos - font.dimensions.height / 2, font);
      if (this.props.climbRate > 0) {
        canvas.drawLine(context, xPos, yPos - arrowLength, xPos, yPos + arrowLength, true);
        canvas.drawLine(context, xPos - 3, yPos - arrowLength + 3, xPos, yPos - arrowLength);
        canvas.drawLine(context, xPos + 3, yPos - arrowLength + 3, xPos, yPos - arrowLength);
      } else if (this.props.climbRate < 0) {
        canvas.drawLine(context, xPos, yPos - arrowLength, xPos, yPos + arrowLength, true);
        canvas.drawLine(context, xPos - 3, yPos + arrowLength - 3, xPos, yPos + arrowLength);
        canvas.drawLine(context, xPos + 3, yPos + arrowLength - 3, xPos, yPos + arrowLength);
      }
    }
  }

  content() {
    return Math.abs(this.props.climbRate).toFixed(2);
  }

  render() {
    const { positionX, positionY } = this.props;
    const hAlignment = 0;
    const vAlignment = 1;
    const font = fonts.getFont(this.props.fontSize);
    const position = canvas.calculateStringPosition(
      this.content(), positionX, positionY, hAlignment, vAlignment, font);
    const arrowLength = this.props.fontSize === 0 ? 6 : 8;
    const visible = (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0;

    return (
      !visible ?
        <canvas ref="canvas" /> :
        <canvas
          ref="canvas"
          style={{ left: position.left, top: position.top }}
          width={position.width + 8}
          height={arrowLength * 2}
          className="preview-widget"
        />
    );
  }
}
