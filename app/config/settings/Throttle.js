import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';

export default class Throttle extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      numberOfPanels: PropTypes.number.isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      scaleEnabled: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      scaleType: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setPosition: PropTypes.func.isRequired,
    setScaleEnabled: PropTypes.func.isRequired,
    setScaleType: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  _setScaleEnabled = (enabled) => {
    this.props.setScaleEnabled('throttle', enabled);
  }

  _setScaleType = (type) => {
    this.props.setScaleType('throttle', type);
  }

  render() {
    const { setPosition, setVisibleOn } = this.props;
    const {
      numberOfPanels, positionX, positionY, visibleOn, scaleEnabled, scaleType
    } = this.props.parameters;
    const scaleEnabledOptions = [
      { value: 0, label: 'number' }, { value: 1, label: 'scale' },
    ];
    const scaleTypeOptions = [
      { value: 0, label: 'vertical' }, { value: 1, label: 'horizontal' }
    ];

    return (
      <Parameters.ParameterList name="throttle">
        <Parameters.Position labelX="position x" labelY="position y" name="throttle"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Column width={50} >
          <Parameters.Select label="style" value={scaleEnabled}
            options={scaleEnabledOptions} setValue={this._setScaleEnabled}
          />
        </Column>
        <Column width={50} >
          <Parameters.Select label="scale orientation" value={scaleType}
            options={scaleTypeOptions} setValue={this._setScaleType} name="throttle"
          />
        </Column>
        <Parameters.VisibleOn visibleOn={visibleOn} name="throttle"
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}
