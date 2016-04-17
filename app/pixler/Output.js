import React, { Component, PropTypes } from 'react';
import { Card, CardText, CardTitle } from 'react-toolbox/lib/card';

export default class Output extends Component {
  static propTypes = {
    outline: PropTypes.arrayOf(PropTypes.number).isRequired,
    shape: PropTypes.arrayOf(PropTypes.number).isRequired,
  }

  _renderShape() {
    return this.props.shape.map((byte, i) => (
      <span key={i}>0x{byte.toString(16)}, </span>
    ));
  }

  _renderOutline() {
    return this.props.outline.map((byte, i) => (
      <span key={i}>0x{byte.toString(16)}, </span>
    ));
  }

  render() {
    return (
      <Card>
        <CardTitle title="output" subtitle="this can be copied to the font file" />
        <CardText>
          <div>Shape</div>
          <div>{this._renderShape()}</div>
        </CardText>
        <CardText>
          <div>Outline</div>
          <div>{this._renderOutline()}</div>
        </CardText>
      </Card>
    );
  }
}
