import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';

export default class Attitude3d extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      mapRadius: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      numberOfPanels: PropTypes.number.isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      scale: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setPosition: PropTypes.func.isRequired,
    setRadius: PropTypes.func.isRequired,
    setScale: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  render() {
    const {
      setPosition,
      setRadius,
      setScale,
      setVisibleOn,
    } = this.props;
    const {
      numberOfPanels,
      positionX,
      positionY,
      mapRadius,
      scale,
      visibleOn,
    } = this.props.parameters;

    return (
      <Parameters.ParameterList name="attitude 3d">
        <Parameters.Position labelX="position x" labelY="position y" name="attitude3d"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Column width={50} >
          <Parameters.Scale name="attitude3d" setScale={setScale} scale={scale} />
        </Column>
        <Column width={50} >
          <Parameters.Radius label="map radius" radiusKey="mapRadius" step={1}
            radius={mapRadius} setRadius={setRadius} name="attitude3d"
          />
        </Column>
        <Parameters.VisibleOn visibleOn={visibleOn} name="attitude3d"
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}
