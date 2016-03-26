import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../Parameters';
import Column from '../Column';

export default class SimpleSettings extends Component {
  static propTypes = {
    name: PropTypes.string,
    children: PropTypes.node,
    numberOfPanels: PropTypes.number.isRequired,
    parameters: ImmutablePropTypes.contains({
      fontSize: PropTypes.number.isRequired,
      hAlignment: PropTypes.number.isRequired,
      positionX: PropTypes.number.isRequired,
      positionY: PropTypes.number.isRequired,
      visibleOn: PropTypes.number.isRequired,
    }).isRequired,
    setFontSize: PropTypes.func.isRequired,
    setHAlignment: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters) ||
      this.props.numberOfPanels !== (nextProps.numberOfPanels);
  }

  render() {
    const {
      children,
      numberOfPanels,
      setFontSize,
      setHAlignment,
      setPosition,
      setVisibleOn,
    } = this.props;
    const {
      fontSize,
      hAlignment,
      positionX,
      positionY,
      visibleOn,
    } = this.props.parameters;

    const name = this.props.name || this.name;

    return (
      <Parameters.ParameterList name={name}>
        <Parameters.Position labelX="position x" labelY="position y"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Column width={50} style={{ paddingRight: '5px' }}>
          <Parameters.FontSize fontSize={fontSize} setFontSize={setFontSize} />
        </Column>
        <Column width={50} style={{ paddingLeft: '5px' }}>
          <Parameters.HorizontalAlignment hAlignment={hAlignment} setHAlignment={setHAlignment} />
        </Column>
        {children}
        <Parameters.VisibleOn visibleOn={visibleOn} setVisibleOn={setVisibleOn}
          numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}
