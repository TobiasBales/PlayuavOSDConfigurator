import React, { Component, PropTypes } from 'react';
import { Card, CardText, CardTitle } from 'react-toolbox/lib/card';
import { clear, mirror, setFontSize, setOutline, setShape } from './actions';
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
    setFontSize: PropTypes.func.isRequired,
    setOutline: PropTypes.func.isRequired,
    setShape: PropTypes.func.isRequired,
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
          <Button onClick={this.props.clear} label="clear" raised />
          <Button onClick={this.props.mirror} label="mirror" raised />
          <Dropdown
            auto
            value={this.props.fontSize}
            onChange={this.props.setFontSize}
            label="font size"
            source={fontSizes}
          />
        </CardText>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  fontSize: state.pixler.get('fontSize'),
});

const mapDispatchersToProps = (dispatch) =>
  bindActionCreators({ clear, mirror, setFontSize, setOutline, setShape }, dispatch);

export default connect(mapStateToProps, mapDispatchersToProps)(Output);
