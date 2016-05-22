import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';

export default class SimpleSettings extends Component {
  static propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    children: PropTypes.node,
    parameters: ImmutablePropTypes.contains({
      fontSize: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      hAlignment: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      numberOfPanels: PropTypes.number.isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setFontSize: PropTypes.func.isRequired,
    setHAlignment: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  parameterModified(key) {
    return this.props.parameters.get(key) !== this.props.parameters.get(`base${key}`);
  }

  render() {
    const {
      children,
      setFontSize,
      setHAlignment,
      setPosition,
      setVisibleOn,
    } = this.props;
    const {
      fontSize,
      hAlignment,
      numberOfPanels,
      positionX,
      positionY,
      visibleOn,
    } = this.props.parameters;

    const name = this.props.name || this.name;
    const label = this.props.label || this.label || name;

    return (
      <Parameters.ParameterList name={label}>
        <Parameters.Position labelX="position x" labelY="position y" name={name}
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Column width={50} >
          <Parameters.FontSize name={name} fontSize={fontSize} setFontSize={setFontSize} />
        </Column>
        <Column width={50} >
          <Parameters.HorizontalAlignment name={name}
            hAlignment={hAlignment} setHAlignment={setHAlignment}
          />
        </Column>
        {children}
        <Parameters.VisibleOn name={name} visibleOn={visibleOn} setVisibleOn={setVisibleOn}
          numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}
