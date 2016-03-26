import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../Parameters';
import Column from '../Column';
import { bindStateForComponent } from '../../utils/parameters';

class Throttle extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      positionX: PropTypes.number.isRequired,
      positionY: PropTypes.number.isRequired,
      scaleEnabled: PropTypes.number.isRequired,
      scaleType: PropTypes.number.isRequired,
      visibleOn: PropTypes.number.isRequired,
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
        <Column width={50} style={{ paddingRight: '5px' }}>
          <Parameters.Select label="style" value={scaleEnabled}
            options={scaleEnabledOptions} setValue={setScaleEnabled}
          />
        </Column>
        <Column width={50} style={{ paddingLeft: '5px' }}>
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
