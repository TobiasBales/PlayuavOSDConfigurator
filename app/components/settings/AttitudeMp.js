import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../Parameters';

import { bindStateForComponent } from '../../utils/parameters';

class AttitudeMp extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      positionX: PropTypes.number.isRequired,
      positionY: PropTypes.number.isRequired,
      scale: PropTypes.number.isRequired,
      visibleOn: PropTypes.number.isRequired,
    }).isRequired,
    numberOfPanels: PropTypes.number.isRequired,
    setPosition: PropTypes.func.isRequired,
    setScale: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  render() {
    const {
      numberOfPanels,
      setPosition,
      setScale,
      setVisibleOn,
    } = this.props;
    const {
      positionX,
      positionY,
      scale,
      visibleOn,
    } = this.props.parameters;

    return (
      <Parameters.ParameterList name="attitude mp">
        <Parameters.Position labelX="position x" labelY="position y" positionX={positionX} positionY={positionY} setPosition={setPosition} />
        <Parameters.Scale setScale={setScale} scale={scale} />
        <Parameters.VisibleOn visibleOn={visibleOn} setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels} />
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('attitudeMp', AttitudeMp);
