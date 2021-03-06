import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import CustomPropTypes from '../../utils/PropTypes';
import Input from '../../components/Input';

export default class Serial extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      baudRate: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      fcType: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      splashMillisecondsToShowValue: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setBaudRate: PropTypes.func.isRequired,
    setFcType: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }
  
  _setValue(serial) {
    return (value) => {
      this.props.setValue('serial', serial, parseInt(value, 10));
    };
  }
  
  render() {
    const { baudRate, fcType, splashMillisecondsToShowValue } = this.props.parameters;
    const { setBaudRate, setFcType } = this.props;
    const fcTypeOptions = [
      { value: 0, label: 'apm/pixhawk' }, { value: 1, label: 'cc3d/revo' }
    ];
       
    
    const baudRateOptions = [
      { value: 1, label: '4800' }, { value: 2, label: '9600' },
      { value: 3, label: '19200' }, { value: 4, label: '38400' },
      { value: 5, label: '43000' }, { value: 6, label: '56000' },
      { value: '7', label: '57600' }, { value: 8, label: '115200' }
    ];
    
    return (
      <Parameters.ParameterList name="firmware">
        <Column width={50} >
          <Parameters.Select label="flight controller" options={fcTypeOptions}
            setValue={setFcType} value={fcType}
          />
        </Column>
        <Column width={50} >
          <Parameters.Select label="baud rate" options={baudRateOptions}
            setValue={setBaudRate} value={baudRate}
          />
        </Column>

        <Column width={100} >
          <Input type="number" label="Milliseconds to show version dialog on startup"
            onChange={this._setValue('splashMillisecondsToShow')} value={splashMillisecondsToShowValue}
          />
        </Column>
        
      </Parameters.ParameterList>
    );
  }
}
