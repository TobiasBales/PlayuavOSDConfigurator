import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';

export default class SpeedScale extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      numberOfPanels: PropTypes.number.isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      scaleAlignment: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      scaleType: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setPosition: PropTypes.func.isRequired,
    setScaleAlignment: PropTypes.func.isRequired,
    setScaleType: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  render() {
    const {
      setPosition, setScaleAlignment, setScaleType, setVisibleOn
    } = this.props;
    const {
      numberOfPanels, positionX, positionY, scaleAlignment, scaleType, visibleOn
    } = this.props.parameters;

    return (
      <Parameters.ParameterList name="speed scale">
        <Column width={50} >
          <Parameters.SpeedScaleType name="speedScale"
            setScaleType={setScaleType} scaleType={scaleType}
          />
        </Column>
        <Column width={50} >
          <Parameters.ScaleAlignment setScaleAlignment={setScaleAlignment}
            scaleAlignment={scaleAlignment} name="speedScale"
          />
        </Column>
        <Parameters.Position labelX="position x" labelY="offset y" name="speedScale"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Parameters.VisibleOn visibleOn={visibleOn} name="speedScale"
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}
