import React, { Component, PropTypes } from 'react';
import { Card, CardText, CardTitle } from 'react-toolbox/lib/card';
import { clear, setOutline, setShape } from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Input } from 'react-toolbox';

class Output extends Component {
  static propTypes = {
    outline: PropTypes.arrayOf(PropTypes.number).isRequired,
    shape: PropTypes.arrayOf(PropTypes.number).isRequired,
    clear: PropTypes.func.isRequired,
    setShape: PropTypes.func.isRequired,
    setOutline: PropTypes.func.isRequired,
  }

  _parseValueString = (value) => {
    const trim = (string) => string.trim();
    const parse = (string) => parseInt(string, 16);
    return value.split(',').map(trim).map(parse);
  }

  _onOutlineChanged = (value) => {
    const outline = this._parseValueString(value);
    this.props.setOutline(outline);
  }

  _onShapeChanged = (value) => {
    const shape = this._parseValueString(value);
    this.props.setShape(shape);
  }

  _mirror = () => {
    const { outline, shape } = this.props;
    const mirror = (byte) => {
      let newByte = 0;
      for (let i = 0; i < 8; i++) {
        if (byte & Math.pow(2, i)) {
          newByte |= Math.pow(2, 7 - i);
        }
      }
      return newByte;
    };
    this.props.setOutline(outline.map(mirror));
    this.props.setShape(shape.map(mirror));
  }

  render() {
    const toHex = (byte) => `0x${byte.toString(16)}`;
    const shape = this.props.shape.map(toHex).join(', ');
    const outline = this.props.outline.map(toHex).join(', ');
    return (
      <Card>
        <CardTitle title="output" subtitle="this can be copied to the font file" />
        <CardText>
          <Input label="shape" value={shape} onChange={this._onShapeChanged} />
          <Input label="outline" value={outline} onChange={this._onOutlineChanged} />
          <Button onClick={this.props.clear} label="clear" raised />
          <Button onClick={this._mirror} label="mirror" raised />
        </CardText>
      </Card>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchersToProps = (dispatch) =>
  bindActionCreators({ clear, setOutline, setShape }, dispatch);

export default connect(mapStateToProps, mapDispatchersToProps)(Output);
