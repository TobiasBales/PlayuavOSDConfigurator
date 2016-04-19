import React, { Component, PropTypes } from 'react';
import fonts from '../../utils/fonts';
import canvas from '../../utils/canvas';

export default class ThrottlePreview extends Component {
  static propTypes = {
    panel: PropTypes.number.isRequired,
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    scaleEnabled: PropTypes.number.isRequired,
    scaleType: PropTypes.number,
    throttle: PropTypes.number.isRequired,
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
    const font = fonts.getFont(0);
    const context = this.refs.canvas.getContext('2d');
    this.clear(context);

    if ((this.props.visibleOn & Math.pow(2, this.props.panel)) !== 0) {
      if (this.props.scaleEnabled) {
        const string = `${this.props.throttle.toFixed(0)}%`;
        const position = canvas.calculateStringPosition(string, 0, 0, 2, 2, font);
        const posX = 75;
        const posY = 25;
        canvas.drawString(context, string, posX - position.width, posY, font);
        const posThY = Math.round(this.props.throttle * 0.5, 0);
        const posThX = posX - 25 + posThY;

        if (this.props.scaleType === 0) {
          canvas.drawFilledRectangle(context, posX + 3, posY + 25 - posThY, 5, posThY);
          canvas.drawLine(context, posX + 3, posY - 25, posX + 7, posY - 25);
          canvas.drawLine(context, posX + 3, posY + 25 - posThY, posX + 7, posY + 25 - posThY);
          canvas.drawLine(context, posX + 3, posY - 25, posX + 3, posY + 25 - posThY);
          canvas.drawLine(context, posX + 7, posY - 25, posX + 7, posY + 25 - posThY);
        } else {
          canvas.drawFilledRectangle(context, posX - 25, posY + 10, posThY, 5);
          canvas.drawLine(context, posThX, posY + 10, posX + 25, posY + 10);
          canvas.drawLine(context, posThX, posY + 14, posX + 25, posY + 14);
          canvas.drawLine(context, posX + 25, posY + 10, posX + 25, posY + 14);
          canvas.drawLine(context, posX - 25, posY + 10, posX - 25, posY + 14);
        }
      } else {
        const string = `thr ${this.props.throttle.toFixed(0)}%`;
        const position = canvas.calculateStringPosition(string, 0, 0, 2, 2, font);
        const posX = 75;
        const posY = 25;
        canvas.drawString(context, string, posX - position.width, posY, font);
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
          style={{ left: positionX - 75, top: positionY - 25 }}
          width={101}
          height={51}
          className="preview-widget"
        />
    );
  }
}
