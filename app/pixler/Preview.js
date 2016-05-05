import React, { Component, PropTypes } from 'react';
import fonts from '../utils/fonts';
import Canvas from '../utils/Canvas';
import styles from './Preview.css';

export default class Preview extends Component {
  static propTypes = {
    fontSize: PropTypes.number.isRequired,
    outline: PropTypes.arrayOf(PropTypes.number).isRequired,
    shape: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  componentDidMount() {
    this.canvas = new Canvas(this.refs.canvas);
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  draw() {
    const font = fonts.getFont(this.props.fontSize);
    const { height, width } = font.dimensions;
    const { shape, outline } = this.props;
    const invertedOutline = outline.map((b) => ~b >>> 0);
    this.canvas.clear();
    this.canvas.drawCharacterData(height / 2, width / 2, shape, invertedOutline, width, height);
  }

  render() {
    const { height, width } = fonts.getFont(this.props.fontSize).dimensions;
    return (
      <canvas ref="canvas" width={width * 2} height={height * 2} className={styles.canvas} />
    );
  }
}
