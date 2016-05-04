import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from '../../components/Input';
import Parameters from '../parameters';
import { bindStateForComponent } from '../../utils/parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';

class Video extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      maxPanels: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      offsetX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      offsetY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      units: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      videoMode: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setMaxPanels: PropTypes.func.isRequired,
    setOffset: PropTypes.func.isRequired,
    setUnits: PropTypes.func.isRequired,
    setMode: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  render() {
    const { setMode, setUnits, setMaxPanels, setOffset } = this.props;
    const { videoMode, units, offsetX, offsetY, maxPanels } = this.props.parameters;

    return (
      <Parameters.ParameterList name="video">
        <Column width={50} >
          <Parameters.VideoMode videoMode={videoMode} setVideoMode={setMode.bind(this, 'video')} />
        </Column>
        <Column width={50}>
          <Parameters.Units units={units} setUnits={setUnits} />
        </Column>
        <Parameters.Position labelX="offset x" labelY="offset y" xMin={-20} xMax={20}
          yMin={0} yMax={20} positionX={offsetX} positionY={offsetY} setPosition={setOffset}
        />
        <Column width={50} >
          <Input
            type="number"
            label="number of panels"
            value={maxPanels}
            onChange={setMaxPanels}
          />
        </Column>
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('video', Video);
