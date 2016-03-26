import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from 'react-toolbox/lib/input';
import Parameters from '../../components/parameters';
import { bindStateForComponent } from '../../utils/parameters';
import Column from '../../components/Column';

class Video extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      maxPanels: PropTypes.number.isRequired,
      offsetX: PropTypes.number.isRequired,
      offsetY: PropTypes.number.isRequired,
      units: PropTypes.number.isRequired,
      videoMode: PropTypes.number.isRequired,
    }).isRequired,
    setMaxPanels: PropTypes.func.isRequired,
    setOffset: PropTypes.func.isRequired,
    setUnits: PropTypes.func.isRequired,
    setVideoMode: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  render() {
    const { setVideoMode, setUnits, setMaxPanels, setOffset } = this.props;
    const { videoMode, units, offsetX, offsetY, maxPanels } = this.props.parameters;

    return (
      <Parameters.ParameterList name="video">
        <Column width={50} style={{ paddingRight: '5px' }}>
          <Parameters.VideoMode videoMode={videoMode} setVideoMode={setVideoMode} />
        </Column>
        <Column width={50} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          <Parameters.Units units={units} setUnits={setUnits} />
        </Column>
        <Parameters.Position labelX="offset x" labelY="offset y" xMin={-20} xMax={20}
          yMin={0} yMax={20} positionX={offsetX} positionY={offsetY} setPosition={setOffset}
        />
        <Column width={50} style={{ paddingRight: '5px' }}>
          <Input type="number" label="number of panels" value={maxPanels} onChange={setMaxPanels} />
        </Column>
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('video', Video);
