import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import CustomPropTypes from '../../utils/PropTypes';

export default class Wind extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      numberOfPanels: PropTypes.number.isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setPosition: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  render() {
    const {
      setPosition,
      setVisibleOn,
    } = this.props;
    const {
      numberOfPanels,
      positionX,
      positionY,
      visibleOn,
    } = this.props.parameters;

    return (
      <Parameters.ParameterList name="wind">
        <Parameters.Position labelX="position x" labelY="position y" name="wind"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Parameters.VisibleOn visibleOn={visibleOn} name="wind"
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}
