import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../../components/parameters';
import { bindStateForComponent } from '../../utils/parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';

class AltitudeScale extends Component {
  static propTypes = {
    numberOfPanels: PropTypes.number.isRequired,
    parameters: ImmutablePropTypes.contains({
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
    return !this.props.parameters.equals(nextProps.parameters) ||
      this.props.numberOfPanels !== (nextProps.numberOfPanels);
  }

  render() {
    const {
      setPosition, setScaleAlignment, setScaleType, setVisibleOn, numberOfPanels
    } = this.props;
    const { positionX, positionY, scaleAlignment, scaleType, visibleOn } = this.props.parameters;

    return (
      <Parameters.ParameterList name="altitude scale">
        <Column width={50} >
          <Parameters.AltitudeScaleType setScaleType={setScaleType} scaleType={scaleType} />
        </Column>
        <Column width={50} >
          <Parameters.ScaleAlignment setScaleAlignment={setScaleAlignment}
            scaleAlignment={scaleAlignment}
          />
        </Column>
        <Parameters.Position labelX="position x" labelY="offset y"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Parameters.VisibleOn visibleOn={visibleOn} setVisibleOn={setVisibleOn}
          numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('altitudeScale', AltitudeScale);
