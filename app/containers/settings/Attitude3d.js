import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../../components/parameters';
import Column from '../../components/Column';
import { bindStateForComponent } from '../../utils/parameters';

class Attitude3d extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      positionX: PropTypes.number.isRequired,
      positionY: PropTypes.number.isRequired,
      mapRadius: PropTypes.number.isRequired,
      scale: PropTypes.number.isRequired,
      visibleOn: PropTypes.number.isRequired,
    }).isRequired,
    numberOfPanels: PropTypes.number.isRequired,
    setPosition: PropTypes.func.isRequired,
    setRadius: PropTypes.func.isRequired,
    setScale: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters) ||
      this.props.numberOfPanels !== (nextProps.numberOfPanels);
  }

  render() {
    const {
      numberOfPanels,
      setPosition,
      setRadius,
      setScale,
      setVisibleOn,
    } = this.props;
    const {
      positionX,
      positionY,
      mapRadius,
      scale,
      visibleOn,
    } = this.props.parameters;

    return (
      <Parameters.ParameterList name="attitude 3d">
        <Parameters.Position labelX="position x" labelY="position y"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Column width={50} style={{ paddingRight: '5px' }}>
          <Parameters.Scale setScale={setScale} scale={scale} />
        </Column>
        <Column width={50} style={{ paddingLeft: '5px' }}>
          <Parameters.Radius label="map radius" radiusKey="mapRadius"
            radius={mapRadius} setRadius={setRadius}
          />
        </Column>
        <Parameters.VisibleOn visibleOn={visibleOn}
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('attitude3d', Attitude3d);
