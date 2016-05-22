import React, { PropTypes } from 'react';
import Canvas from '../utils/Canvas';
import PreviewBase from './PreviewBase';
import fonts from '../utils/fonts';
import icons from '../utils/icons';

export default class StringPreview extends PreviewBase {
  static propTypes = {
    fontSize: PropTypes.number.isRequired,
    hAlignment: PropTypes.number.isRequired,
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    setPosition: PropTypes.func.isRequired,
    vAlignment: PropTypes.number,
    visibleOn: PropTypes.number.isRequired,
  }

  static defaultProps = {
    vAlignment: 0,
  }

  icon() {
    return null;
  }

  content() {
    return '';
  }

  draw() {
    const font = fonts.getFont(this.props.fontSize);
    const content = this.content();
    this.canvas.clear();

    if (content && (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      const icon = this.icon();
      const hasIcon = icon !== null;
      const x = hasIcon ? font.dimensions.width + 2 : 0;
      if (hasIcon) {
        const iconFont = icons.getFont(this.props.fontSize);
        this.canvas.drawCharacter(icon, 0, 0, iconFont);
      }
      this.canvas.drawString(content, x, 0, font);
    }
  }

  render() {
    const { hAlignment, positionX, positionY, vAlignment } = this.props;
    const content = this.content();
    const font = fonts.getFont(this.props.fontSize);
    const hasIcon = this.icon() !== null;
    const position = Canvas.calculateStringPosition(
      content, positionX, positionY, hAlignment, vAlignment, font, 0, hasIcon);

    const visible = this.content() &&
      (this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0;

    return (
      !visible ?
        <canvas ref="canvas" /> :
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
