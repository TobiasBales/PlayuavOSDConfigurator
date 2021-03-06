import React, { Component, PropTypes } from 'react';
import Input from '../../components/Input';
import Column from '../../components/Column';
import Select from '../parameters/Select';
import SimpleSettings from './SimpleSettings';
import ImmutablePropTypes from 'react-immutable-proptypes';
import CustomPropTypes from '../../utils/PropTypes';

export default class Rssi extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      fontSize: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      hAlignment: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      max: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      min: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      numberOfPanels: PropTypes.number.isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      raw: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      type: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setFontSize: PropTypes.func.isRequired,
    setHAlignment: PropTypes.func.isRequired,
    setMax: PropTypes.func.isRequired,
    setMin: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    setRaw: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  _setMin = (min) => {
    this.props.setMin('rssi', parseInt(min, 10));
  }

  _setMax = (max) => {
    this.props.setMax('rssi', parseInt(max, 10));
  }

  _setType = (type) => {
    this.props.setType('rssi', type);
  }

  _setRaw = (raw) => {
    this.props.setRaw('rssi', raw);
  }

  render() {
    const { max, min, raw, type } = this.props.parameters;
    const rawOptions = [
      { value: 0, label: 'percentage' }, { value: 1, label: 'raw value' }
    ];
    const typeOptions = [
      { value: 0, label: 'mavlink' }, { value: 5, label: 'rc 5' },
      { value: 6, label: 'rc 6' }, { value: 7, label: 'rc 7' },
      { value: 8, label: 'rc 8' }, { value: 9, label: 'rc 9' },
      { value: 10, label: 'rc 10' }, { value: 11, label: 'rc 11' },
      { value: 12, label: 'rc 12' }, { value: 13, label: 'rc 13' },
      { value: 14, label: 'rc 14' }, { value: 15, label: 'rc 15' },
      { value: 16, label: 'rc 16' }
    ];
    const minInput = type === 0 ? 0 : 1000;
    const maxInput = type === 0 ? 255 : 2000;

    return (
      <SimpleSettings name="rssi" label="rssi" {...this.props}>
        <Column width={50} >
          <Input type="number" min={minInput} max={maxInput}
            label="min" value={min} onChange={this._setMin}
          />
        </Column>
        <Column width={50} >
          <Input type="number" min={minInput} max={maxInput}
            label="max" value={max} onChange={this._setMax}
          />
        </Column>
        <Column width={50} >
          <Select label="input type" value={type} options={typeOptions} setValue={this._setType} />
        </Column>
        <Column width={50} >
          <Select label="display" value={raw} options={rawOptions} setValue={this._setRaw} />
        </Column>
      </SimpleSettings>
     );
  }
}
