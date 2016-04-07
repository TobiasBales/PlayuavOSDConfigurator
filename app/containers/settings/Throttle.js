import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../../components/parameters';
import Column from '../../components/Column';
import { bindStateForComponent } from '../../utils/parameters';
import CustomPropTypes from '../../utils/PropTypes';

class Throttle extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      scaleEnabled: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      scaleType: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    numberOfPanels: PropTypes.number.isRequired,
    setPosition: PropTypes.func.isRequired,
    setScaleEnabled: PropTypes.func.isRequired,
    setScaleType: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters) ||
      this.props.numberOfPanels !== (nextProps.numberOfPanels);
  }

  render() {
    const { numberOfPanels, setPosition, setVisibleOn, setScaleEnabled, setScaleType } = this.props;
    const { positionX, positionY, visibleOn, scaleEnabled, scaleType } = this.props.parameters;
    const scaleEnabledOptions = [
      { value: 0, label: 'number' }, { value: 1, label: 'scale' },
    ];
    const scaleTypeOptions = [
      { value: 0, label: 'vertical' }, { value: 1, label: 'horizontal' }
    ];

    return (
      <Parameters.ParameterList name="throttle">
        <Parameters.Position labelX="position x" labelY="position y"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Column width={50} >
          <Parameters.Select label="style" value={scaleEnabled}
            options={scaleEnabledOptions} setValue={setScaleEnabled}
          />
        </Column>
        <Column width={50} >
          <Parameters.Select label="scale orientation" value={scaleType}
            options={scaleTypeOptions} setValue={setScaleType}
          />
        </Column>
        <Parameters.VisibleOn visibleOn={visibleOn}
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('throttle', Throttle);
