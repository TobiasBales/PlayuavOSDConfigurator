import React, { Component, PropTypes } from 'react';
import { Card, CardText, CardTitle } from 'react-toolbox/lib/card';
import styles from './Output.css';

export default class Output extends Component {
  static propTypes = {
    outline: PropTypes.arrayOf(PropTypes.number).isRequired,
    shape: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  _renderShape() {
    return this.props.shape.map((byte, i) => {
      const text = `0x${byte.toString(16)}, `;
      return <span key={i} className={styles.data}>{text}</span>;
    });
  }

  _renderOutline() {
    return this.props.outline.map((byte, i) => {
      const text = `0x${byte.toString(16)}, `;
      return <span key={i} className={styles.data}>{text}</span>;
    });
  }

  render() {
    return (
      <Card>
        <CardTitle title="output" subtitle="this can be copied to the font file" />
        <CardText>
          <div>Shape</div>
          <div className={styles.data}>{this._renderShape()}</div>
        </CardText>
        <CardText>
          <div>Outline</div>
          <div className={styles.data}>{this._renderOutline()}</div>
        </CardText>
      </Card>
    );
  }
}
