import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Parameters from '../Parameters';
import { bindStateForComponent } from '../../utils/parameters';
import Column from '../Column';

class Video extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      videoMode: PropTypes.number.isRequired,
      units: PropTypes.number.isRequired,
      offsetX: PropTypes.number.isRequired,
      offsetY: PropTypes.number.isRequired,
    }).isRequired,
    setVideoMode: PropTypes.func.isRequired,
    setUnits: PropTypes.func.isRequired,
    setOffset: PropTypes.func.isRequired,
  }

  render() {
    const { setVideoMode, setUnits, setOffset } = this.props;
    const { videoMode, units, offsetX, offsetY } = this.props.parameters;

    return (
      <Parameters.ParameterList name="video">
        <Column width={50} style={{ 'paddingRight': '5px' }}>
          <Parameters.VideoMode videoMode={videoMode} setVideoMode={setVideoMode} />
        </Column>
        <Column width={50} style={{ 'paddingLeft': '5px' }}>
          <Parameters.Units units={units} setUnits={setUnits} />
        </Column>
        <Parameters.Position labelX="offset x" labelY="offset y" positionX={offsetX} positionY={offsetY} setPosition={setOffset} />
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('video', Video);
