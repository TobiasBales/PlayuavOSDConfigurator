import React, { Component, PropTypes } from 'react';
import { Card, CardText, CardTitle } from 'react-toolbox/lib/card';
import {
  clear, invertOutline, mirror, loadCharacter, loadIcon, setFontSize,
  setOutline, setShape, shiftDown, shiftLeft, shiftRight, shiftUp,
} from './actions';
import { bindActionCreators } from 'redux';
import Column from '../components/Column';
import { connect } from 'react-redux';
import { Button, Dropdown, Input } from 'react-toolbox';
import fonts from '../utils/fonts';

class Output extends Component {
  static propTypes = {
    clear: PropTypes.func.isRequired,
    fontSize: PropTypes.number.isRequired,
    invertOutline: PropTypes.func.isRequired,
    loadCharacter: PropTypes.func.isRequired,
    loadIcon: PropTypes.func.isRequired,
    mirror: PropTypes.func.isRequired,
    outline: PropTypes.arrayOf(PropTypes.number).isRequired,
    setFontSize: PropTypes.func.isRequired,
    setOutline: PropTypes.func.isRequired,
    setShape: PropTypes.func.isRequired,
    shape: PropTypes.arrayOf(PropTypes.number).isRequired,
    shiftDown: PropTypes.func.isRequired,
    shiftLeft: PropTypes.func.isRequired,
    shiftRight: PropTypes.func.isRequired,
    shiftUp: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      selectedIcon: null,
      selectedCharacter: null,
    };
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

  _onIconChanged = (icon) => {
    this.setState({ ...this.state, selectedCharacter: null, selectedIcon: icon });
    this.props.loadIcon(icon);
  }

  _onCharacterChanged = (character) => {
    this.setState({ ...this.state, selectedCharacter: character, selectedIcon: null });
    this.props.loadCharacter(character);
  }

  render() {
    const toHex = (byte) => `0x${byte.toString(16)}`;
    const { width } = fonts.getFont(this.props.fontSize).dimensions;
    const invert = (byte) => ((~byte >>> 0) & Math.pow(2, width) - 1);
    const shape = this.props.shape.map(toHex).join(', ');
    const outline = this.props.outline.map(invert).map(toHex).join(', ');
    const fontSizes = [
      { label: 'small', value: 0 },
      { label: 'medium', value: 1 },
      { label: 'large', value: 2 },
    ];
    const icons = [
      { label: 'GPS', value: 0 },
      { label: 'HDOP', value: 1 },
      { label: 'TIME', value: 2 },
      { label: 'WP_DISTANCE', value: 3 },
      { label: 'TOTAL_TRIP', value: 4 },
      { label: 'RSSI', value: 5 },
      { label: 'LINK_QUALITY', value: 6 },
      { label: 'HOME_DISTANCE', value: 7 },
    ];
    const font = fonts.getFont(this.props.fontSize);
    const characters = [...Array(font.length)].map((_, i) => (
      { value: i, label: String.fromCharCode(i) }
    )).filter((a, i) => i > 32);

    return (
      <Card>
        <CardTitle title="output" subtitle="this can be copied to the font file" />
        <CardText>
          <Input label="shape" value={shape} onChange={this._onShapeChanged} />
          <Input label="outline" value={outline} onChange={this._onOutlineChanged} />
          <Column width={33}>
            <Dropdown auto value={this.props.fontSize} label="font size"
              onChange={this.props.setFontSize} source={fontSizes}
            />
          </Column>
          <Column width={33}>
            <Dropdown auto value={this.state.selectedIcon}
              onChange={this._onIconChanged} label="load icon" source={icons}
            />
          </Column>
          <Column width={33}>
            <Dropdown auto value={this.state.selectedCharacter}
              onChange={this._onCharacterChanged} label="load character" source={characters}
            />
          </Column>
          <Column width={100}>
            <Button onClick={this.props.clear} label="clear" raised />
            <Button onClick={this.props.mirror} label="mirror" raised />
            <Button onClick={this.props.invertOutline} label="invert outline" raised />
          </Column>
          <br />
          <br />
          <Column width={100}>
            <Button icon="arrow_back" onClick={this.props.shiftLeft} raised />
            <Button icon="arrow_forward" onClick={this.props.shiftRight} raised />
            <Button icon="arrow_upward" onClick={this.props.shiftUp} raised />
            <Button icon="arrow_downward" onClick={this.props.shiftDown} raised />
          </Column>
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
    clear, invertOutline, mirror, loadCharacter, loadIcon, setFontSize,
    setOutline, setShape, shiftDown, shiftLeft, shiftRight, shiftUp,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchersToProps)(Output);
