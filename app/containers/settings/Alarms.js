import React, { Component, PropTypes } from 'react';
import Column from '../../components/Column';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from 'react-toolbox/lib/input';
import Parameters from '../../components/parameters';
import { bindStateForComponent } from '../../utils/parameters';

class Alarms extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      fontSize: PropTypes.number.isRequired,
      hAlignment: PropTypes.number.isRequired,
      positionX: PropTypes.number.isRequired,
      positionY: PropTypes.number.isRequired,
      gpsStatusEnabled: PropTypes.number.isRequired,
      lowBatteryEnabled: PropTypes.number.isRequired,
      lowBatteryValue: PropTypes.number.isRequired,
      underSpeedEnabled: PropTypes.number.isRequired,
      underSpeedValue: PropTypes.number.isRequired,
      overSpeedEnabled: PropTypes.number.isRequired,
      overSpeedValue: PropTypes.number.isRequired,
      underAltEnabled: PropTypes.number.isRequired,
      underAltValue: PropTypes.number.isRequired,
      overAltEnabled: PropTypes.number.isRequired,
      overAltValue: PropTypes.number.isRequired,
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
        <Column width={50} style={{ paddingRight: '5px' }}>
          <Parameters.FontSize fontSize={fontSize} setFontSize={setFontSize} />
        </Column>
        <Column width={50} style={{ paddingLeft: '5px' }}>
          <Parameters.HorizontalAlignment hAlignment={hAlignment} setHAlignment={setHAlignment} />
        </Column>
        <Column width={25} style={{ paddingRight: '5px' }}>
          <Parameters.Select label="under speed" options={options}
            setValue={this._setEnabled.bind(this, 'underSpeed')} value={underSpeedEnabled}
          />
        </Column>
        <Column width={25} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          <Input type="number" label="value"
            onChange={this._setValue.bind(this, 'underSpeed')} value={underSpeedValue}
          />
        </Column>
        <Column width={25} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          <Parameters.Select label="over speed" options={options}
            setValue={this._setEnabled.bind(this, 'overSpeed')} value={overSpeedEnabled}
          />
        </Column>
        <Column width={25} style={{ paddingLeft: '5px' }}>
          <Input type="number" label="value"
            onChange={this._setValue.bind(this, 'overSpeed')} value={overSpeedValue}
          />
        </Column>
        <Column width={25} style={{ paddingRight: '5px' }}>
          <Parameters.Select label="under alt" options={options}
            setValue={this._setEnabled.bind(this, 'underAlt')} value={underAltEnabled}
          />
        </Column>
        <Column width={25} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          <Input type="number" label="value"
            onChange={this._setValue.bind(this, 'underAlt')} value={underAltValue}
          />
        </Column>
        <Column width={25} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          <Parameters.Select label="over alt" options={options}
            setValue={this._setEnabled.bind(this, 'overAlt')} value={overAltEnabled}
          />
        </Column>
        <Column width={25} style={{ paddingLeft: '5px' }}>
          <Input type="number" label="value"
            onChange={this._setValue.bind(this, 'overAlt')} value={overAltValue}
          />
        </Column>
        <Column width={25} style={{ paddingRight: '5px' }}>
          <Parameters.Select label="low battery" options={options}
            setValue={this._setEnabled.bind(this, 'lowBattery')} value={lowBatteryEnabled}
          />
        </Column>
        <Column width={25} style={{ paddingLeft: '5px', paddingRight: '5px' }}>
          <Input type="number" label="value"
            onChange={this._setValue.bind(this, 'lowBattery')} value={lowBatteryValue}
          />
        </Column>
        <Column width={50} style={{ paddingLeft: '5px' }}>
          <Parameters.Select label="gps status" options={options}
            setValue={this._setEnabled.bind(this, 'gpsStatus')} value={gpsStatusEnabled}
          />
        </Column>
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('alarms', Alarms);
