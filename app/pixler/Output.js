import React, { Component, PropTypes } from 'react';
import { Card, CardText, CardTitle } from 'react-toolbox/lib/card';
import { setOutline, setShape } from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Input from 'react-toolbox/lib/input';

class Output extends Component {
  static propTypes = {
    outline: PropTypes.arrayOf(PropTypes.number).isRequired,
    shape: PropTypes.arrayOf(PropTypes.number).isRequired,
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

        </CardText>
      </Card>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchersToProps = (dispatch) =>
  bindActionCreators({ setOutline, setShape, }, dispatch);

export default connect(mapStateToProps, mapDispatchersToProps)(Output);
