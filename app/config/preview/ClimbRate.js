import React, { PropTypes } from 'react';
import Canvas from '../../utils/Canvas';
import PreviewBase from './PreviewBase';
import fonts from '../../utils/fonts';

export default class ClimbRate extends PreviewBase {
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

  draw() {
    const font = fonts.getFont(this.props.fontSize);
    const arrowLength = this.props.fontSize === 0 ? 6 : 8;
    this.canvas.clear();

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const xPos = 3;
      const yPos = this.refs.canvas.height / 2;
      this.canvas.drawString(this.content(), xPos + 5, yPos - font.dimensions.height / 2, font);
      if (this.props.climbRate > 0) {
        this.canvas.drawLine(xPos, yPos - arrowLength, xPos, yPos + arrowLength, true);
        this.canvas.drawLine(xPos - 3, yPos - arrowLength + 3, xPos, yPos - arrowLength);
        this.canvas.drawLine(xPos + 3, yPos - arrowLength + 3, xPos, yPos - arrowLength);
      } else if (this.props.climbRate < 0) {
        this.canvas.drawLine(xPos, yPos - arrowLength, xPos, yPos + arrowLength, true);
        this.canvas.drawLine(xPos - 3, yPos + arrowLength - 3, xPos, yPos + arrowLength);
        this.canvas.drawLine(xPos + 3, yPos + arrowLength - 3, xPos, yPos + arrowLength);
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
    const position = Canvas.calculateStringPosition(
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
