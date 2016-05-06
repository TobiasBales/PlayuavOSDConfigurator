import React, { Component, PropTypes } from 'react';
import { Card, CardText, CardTitle } from 'react-toolbox/lib/card';
import {
  clear, invertOutline, mirror, setFontSize, setOutline, setShape,
  shiftDown, shiftLeft, shiftRight, shiftUp,
} from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Dropdown, Input } from 'react-toolbox';

class Output extends Component {
  static propTypes = {
    clear: PropTypes.func.isRequired,
    fontSize: PropTypes.number.isRequired,
    outline: PropTypes.arrayOf(PropTypes.number).isRequired,
    shape: PropTypes.arrayOf(PropTypes.number).isRequired,
    mirror: PropTypes.func.isRequired,
    invertOutline: PropTypes.func.isRequired,
    setFontSize: PropTypes.func.isRequired,
    setOutline: PropTypes.func.isRequired,
    setShape: PropTypes.func.isRequired,
    shiftDown: PropTypes.func.isRequired,
    shiftLeft: PropTypes.func.isRequired,
    shiftRight: PropTypes.func.isRequired,
    shiftUp: PropTypes.func.isRequired,
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

  render() {
    const toHex = (byte) => `0x${byte.toString(16)}`;
    const shape = this.props.shape.map(toHex).join(', ');
    const outline = this.props.outline.map(toHex).join(', ');
    const fontSizes = [
      { label: 'small', value: 0 },
      { label: 'medium', value: 1 },
      { label: 'large', value: 2 },
    ];

    return (
      <Card>
        <CardTitle title="output" subtitle="this can be copied to the font file" />
        <CardText>
          <Input label="shape" value={shape} onChange={this._onShapeChanged} />
          <Input label="outline" value={outline} onChange={this._onOutlineChanged} />
          <Dropdown
            auto
            value={this.props.fontSize}
            onChange={this.props.setFontSize}
            label="font size"
            source={fontSizes}
          />
          <Button onClick={this.props.clear} label="clear" raised />
          <Button onClick={this.props.mirror} label="mirror" raised />
          <Button onClick={this.props.invertOutline} label="invert outline" raised />
          <br />
          <br />
          <Button icon="arrow_back" onClick={this.props.shiftLeft} raised />
          <Button icon="arrow_forward" onClick={this.props.shiftRight} raised />
          <Button icon="arrow_upward" onClick={this.props.shiftUp} raised />
          <Button icon="arrow_downward" onClick={this.props.shiftDown} raised />
        </CardText>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  fontSize: state.pixler.get('fontSize'),
});

const mapDispatchersToProps = (dispatch) =>
  bindActionCreators({
    clear, invertOutline, mirror, setFontSize, setOutline, setShape,
    shiftDown, shiftLeft, shiftRight, shiftUp,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchersToProps)(Output);
