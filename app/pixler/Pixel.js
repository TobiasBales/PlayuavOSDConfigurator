import React, { Component, PropTypes } from 'react';
import styles from './Pixel.css';
import classNames from 'classnames';
import { EMPTY, OUTLINE, SHAPE } from './actions';

export default class Pixel extends Component {
  static propTypes = {
    setPixel: PropTypes.func.isRequired,
    type: PropTypes.oneOf([EMPTY, SHAPE, OUTLINE]).isRequired,
  }

  _onClick = (e) => {
    let targetType = EMPTY;

    if (e.button === 0) {
      targetType = SHAPE;
    } else if (e.button === 2) {
      targetType = OUTLINE;
    }

    if (targetType === this.props.type) {
      targetType = EMPTY;
    }
    this.props.setPixel(targetType);
  };

  render() {
    const classDescriptions = {};
    classDescriptions[styles.empty] = this.props.type === EMPTY;
    classDescriptions[styles.outline] = this.props.type === OUTLINE;
    classDescriptions[styles.shape] = this.props.type === SHAPE;
    const classes = classNames(styles.pixel, classDescriptions);
    return (
      <div onClick={this._onClick} onContextMenu={this._onClick} className={classes} />
    );
  }
}
