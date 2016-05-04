import React, { Component, PropTypes } from 'react';
import Pixel from './Pixel';
import { EMPTY, OUTLINE, SHAPE } from './actions';
import styles from './Editor.css';
import fonts from '../utils/fonts';
import { Card, CardText, CardTitle } from 'react-toolbox/lib/card';

export default class Editor extends Component {
  static propTypes = {
    setPixel: PropTypes.func.isRequired,
    outline: PropTypes.arrayOf(PropTypes.number).isRequired,
    shape: PropTypes.arrayOf(PropTypes.number).isRequired,
    fontSize: PropTypes.number.isRequired,
  }

  _setPixel = (row, column, type) => {
    this.props.setPixel(row, column, type);
  }

  render() {
    const { height, width } = fonts.getFont(this.props.fontSize).dimensions;

    const pixels = [...Array(height)].map((_, row) => {
      const shape = this.props.shape[row];
      const outline = this.props.outline[row];

      const rowPixels = [...Array(width)].map((__, i) => {
        const column = width - i;
        const key = `${row}${column}`;
        let type = null;
        if (shape & outline & Math.pow(2, column)) {
          type = OUTLINE;
        } else if (shape & Math.pow(2, column)) {
          type = SHAPE;
        } else {
          type = EMPTY;
        }

        return (<Pixel key={key} setPixel={this._setPixel.bind(this, row, column)} type={type} />);
      });

      return (
        <div key={row} className={styles.row}>
          {rowPixels}
          <div className={styles.square}>{row + 1}</div>
        </div>
      );
    });

    const columnNumbers = [...Array(width)].map((_, i) => (
      <div key={i} className={styles.square}>{i + 1}</div>
    ));

    return (
      <Card>
        <CardTitle
          title="pixler"
          subtitle="left click to set shape, right click to set outline, second click to clear"
        />
        <CardText>
          <div className={styles.row}>
            {columnNumbers}
          </div>
          {pixels}
        </CardText>
      </Card>
    );
  }
}
