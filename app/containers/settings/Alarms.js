import React, { Component, PropTypes } from 'react';
import Column from '../../components/Column';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from '../../components/Input';
import Parameters from '../../components/parameters';
import { bindStateForComponent } from '../../utils/parameters';
import CustomPropTypes from '../../utils/PropTypes';

class Alarms extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      fontSize: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      hAlignment: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      gpsStatusEnabled: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      lowBatteryEnabled: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      lowBatteryValue: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      underSpeedEnabled: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      underSpeedValue: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      overSpeedEnabled: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      overSpeedValue: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      underAltEnabled: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      underAltValue: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      overAltEnabled: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      overAltValue: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setAlarmEnabled: PropTypes.func.isRequired,
    setAlarmValue: PropTypes.func.isRequired,
    setFontSize: PropTypes.func.isRequired,
    setHAlignment: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  _setEnabled(alarm, enabled) {
    this.props.setAlarmEnabled(alarm, parseInt(enabled, 10));
  }

  _setValue(alarm, value) {
    this.props.setAlarmValue(alarm, parseInt(value, 10));
  }

  render() {
    const { setPosition, setHAlignment, setFontSize } = this.props;
    const {
      fontSize, hAlignment, positionX, positionY, gpsStatusEnabled,
      lowBatteryEnabled, lowBatteryValue, underSpeedEnabled, underSpeedValue,
      overSpeedEnabled, overSpeedValue, underAltEnabled, underAltValue,
      overAltEnabled, overAltValue,
    } = this.props.parameters;
    const options = [
      { value: 0, label: 'disabled' }, { value: 1, label: 'enabled' }
    ];

    return (
      <Parameters.ParameterList name="alarms">
        <Parameters.Position labelX="position x" labelY="position y"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />
        <Column width={50} >
          <Parameters.FontSize fontSize={fontSize} setFontSize={setFontSize} />
        </Column>
        <Column width={50} >
          <Parameters.HorizontalAlignment hAlignment={hAlignment} setHAlignment={setHAlignment} />
        </Column>
        <Column width={25} >
          <Parameters.Select label="under speed" options={options}
            setValue={this._setEnabled.bind(this, 'underSpeed')} value={underSpeedEnabled}
          />
        </Column>
        <Column width={25}>
          <Input type="number" label="value"
              onChange={this._setValue.bind(this, 'underSpeed')} value={underSpeedValue}
          />
        </Column>
        <Column width={25}>
          <Parameters.Select label="over speed" options={options}
            setValue={this._setEnabled.bind(this, 'overSpeed')} value={overSpeedEnabled}
          />
        </Column>
        <Column width={25} >
          <Input type="number" label="value"
            onChange={this._setValue.bind(this, 'overSpeed')} value={overSpeedValue}
          />
        </Column>
        <Column width={25} >
          <Parameters.Select label="under alt" options={options}
            setValue={this._setEnabled.bind(this, 'underAlt')} value={underAltEnabled}
          />
        </Column>
        <Column width={25}>
          <Input type="number" label="value"
            onChange={this._setValue.bind(this, 'underAlt')} value={underAltValue}
          />
        </Column>
        <Column width={25}>
          <Parameters.Select label="over alt" options={options}
            setValue={this._setEnabled.bind(this, 'overAlt')} value={overAltEnabled}
          />
        </Column>
        <Column width={25} >
          <Input type="number" label="value"
            onChange={this._setValue.bind(this, 'overAlt')} value={overAltValue}
          />
        </Column>
        <Column width={25} >
          <Parameters.Select label="low battery" options={options}
            setValue={this._setEnabled.bind(this, 'lowBattery')} value={lowBatteryEnabled}
          />
        </Column>
        <Column width={25}>
          <Input label="value" type="number"
            onChange={this._setValue.bind(this, 'lowBattery')} value={lowBatteryValue}
          />
        </Column>
        <Column width={50} >
          <Parameters.Select label="gps status" options={options}
            setValue={this._setEnabled.bind(this, 'gpsStatus')} value={gpsStatusEnabled}
          />
        </Column>
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('alarms', Alarms);
