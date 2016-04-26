import React, { Component, PropTypes } from 'react';
import Pixel from './Pixel';
import { EMPTY, OUTLINE, SHAPE } from './actions';
import styles from './Editor.css';
import { Card, CardText, CardTitle } from 'react-toolbox/lib/card';

export default class Editor extends Component {
  static propTypes = {
    setPixel: PropTypes.func.isRequired,
    outline: PropTypes.arrayOf(PropTypes.number).isRequired,
    shape: PropTypes.arrayOf(PropTypes.number).isRequired,
    wide: PropTypes.bool.isRequired,
  }

  _setPixel = (row, column, type) => {
    this.props.setPixel(row, column, type);
  }

  render() {
    const width = 8;
    const height = 14;

    const pixels = [...Array(height)].map((_, row) => {
      const shape = this.props.shape[row];
      const outline = this.props.outline[row];

      const rowPixels = [...Array(width)].map((__, column) => {
        const key = `${row}${column}`;
        if (shape & outline & Math.pow(2, column)) {
          return (
            <Pixel key={key} setPixel={this._setPixel.bind(this, row, column)} type={OUTLINE} />
          );
        }
        if (shape & Math.pow(2, column)) {
          return <Pixel key={key} setPixel={this._setPixel.bind(this, row, column)} type={SHAPE} />;
        }
        return <Pixel key={key} setPixel={this._setPixel.bind(this, row, column)} type={EMPTY} />;
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
