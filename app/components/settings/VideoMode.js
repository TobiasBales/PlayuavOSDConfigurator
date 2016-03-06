import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import Parameters from '../Parameters';
import { bindStateForComponent } from '../../utils/parameters';

class VideoMode extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      videoMode: PropTypes.number.isRequired,
    }).isRequired,
    setVideoMode: PropTypes.func.isRequired,
  }

  render() {
    const { setVideoMode } = this.props;
    const { videoMode } = this.props.parameters;

    return (
      <Parameters.ParameterList name="video mode">
        {[<Parameters.VideoMode key="videoMode" videoMode={videoMode} setVideoMode={setVideoMode} />]}
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('videoMode', VideoMode);
