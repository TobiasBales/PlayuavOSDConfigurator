import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Parameters from '../Parameters';
import Column from '../Column';

export default class BasicSettings extends Component {
  static propTypes = {
    name: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.element),
    parameters: ImmutablePropTypes.contains({
      enabled: PropTypes.bool.isRequired,
      fontSize: PropTypes.number.isRequired,
      hAlignment: PropTypes.number.isRequired,
      panels: ImmutablePropTypes.listOf(PropTypes.bool).isRequired,
      position: ImmutablePropTypes.contains({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
    numberOfPanels: PropTypes.number.isRequired,
    setEnabled: PropTypes.func.isRequired,
    setFontSize: PropTypes.func.isRequired,
    setPanels: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    setHAlignment: PropTypes.func.isRequired,
  }

  render() {
    const {
      children,
      name,
      numberOfPanels,
      setEnabled,
      setFontSize,
      setHAlignment,
      setPanels,
      setPosition,
    } = this.props;
    const {
      enabled,
      fontSize,
      hAlignment,
      panels,
      position,
    } = this.props.parameters;

    return (
      <Parameters.ParameterList name={name}>
        <Parameters.Enabled enabled={enabled} setEnabled={setEnabled} />
        <Parameters.Position position={position} setPosition={setPosition} />
        <Column width={50}>
          <Parameters.FontSize fontSize={fontSize} setFontSize={setFontSize} />
        </Column>
        <Column width={50}>
          <Parameters.HorizontalAlignment hAlignment={hAlignment} setHAlignment={setHAlignment} />
        </Column>
        <Parameters.VisibleOn panels={panels} setPanels={setPanels} numberOfPanels={numberOfPanels} />
        {children}
      </Parameters.ParameterList>
    );
  }
}
