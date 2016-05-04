import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import { bindStateForComponent } from '../../utils/parameters';
import CustomPropTypes from '../../utils/PropTypes';

class VarioGraph extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    numberOfPanels: PropTypes.number.isRequired,
    setPosition: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters) ||
      this.props.numberOfPanels !== (nextProps.numberOfPanels);
  }

  render() {
    const { numberOfPanels, setPosition, setVisibleOn } = this.props;
    const { positionX, positionY, visibleOn } = this.props.parameters;

    return (
      <Parameters.ParameterList name="vario graph (not implemented yet)">
        <Parameters.Position labelX="position x" labelY="position y"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Parameters.VisibleOn visibleOn={visibleOn}
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('varioGraph', VarioGraph);
