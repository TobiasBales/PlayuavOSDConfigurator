import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';

export default class Radar extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      homeRadius: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      numberOfPanels: PropTypes.number.isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      radius: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      wpRadius: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setPosition: PropTypes.func.isRequired,
    setRadius: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  render() {
    const {
      setPosition,
      setRadius,
      setVisibleOn,
    } = this.props;
    const {
      homeRadius,
      numberOfPanels,
      positionX,
      positionY,
      radius,
      visibleOn,
      wpRadius,
    } = this.props.parameters;

    return (
      <Parameters.ParameterList name="radar">
        <Parameters.Position labelX="position x" labelY="position y" name="radar"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Column width={33} >
          <Parameters.Radius label="radius" radiusKey="radius"
            radius={radius} setRadius={setRadius} name="radar"
          />
        </Column>
        <Column width={33}>
          <Parameters.Radius label="home radius" radiusKey="homeRadius"
            radius={homeRadius} setRadius={setRadius} name="radar"
          />
        </Column>
        <Column width={33} >
          <Parameters.Radius label="wp radius" radiusKey="wpRadius"
            radius={wpRadius} setRadius={setRadius} name="radar"
          />
        </Column>
        <Parameters.VisibleOn visibleOn={visibleOn} name="radar"
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}
