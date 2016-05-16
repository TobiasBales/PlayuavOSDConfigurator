import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import Input from '../../components/Input';
import CustomPropTypes from '../../utils/PropTypes';

export default class Switching extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      panelChannel: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      panelMode: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      panelValue: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      videoChannel: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      videoMode: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      videoValue: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setChannel: PropTypes.func.isRequired,
    setMode: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  _setChannel(key, value) {
    this.props.setChannel('switching', key, value);
  }

  _setValue(key, value) {
    this.props.setValue('switching', key, parseInt(value, 10));
  }

  render() {
    const {
      panelChannel, panelMode, panelValue, videoChannel, videoMode, videoValue
    } = this.props.parameters;
    const channelOptions = [
      { value: 0, label: 'disabled' }, { value: 1, label: 'rc 1' },
      { value: 2, label: 'rc 2' }, { value: 3, label: 'rc 3' },
      { value: 4, label: 'rc 4' }, { value: 5, label: 'rc 5' },
      { value: 6, label: 'rc 6' }, { value: 7, label: 'rc 7' },
      { value: 8, label: 'rc 8' }, { value: 9, label: 'rc 9' },
      { value: 10, label: 'rc 10' }, { value: 11, label: 'rc 11' },
      { value: 12, label: 'rc 12' }, { value: 13, label: 'rc 13' },
      { value: 14, label: 'rc 14' }, { value: 15, label: 'rc 15' },
      { value: 16, label: 'rc 16' }
    ];

    const modeOptions = [
      { value: 0, label: 'cycle' }, { value: 1, label: 'switch' }
    ];

    return (
      <Parameters.ParameterList name="switching">
        <Column width={50} >
          <Parameters.Select label="panel switch channel" value={panelChannel}
            options={channelOptions} setValue={this._setChannel.bind(this, 'panel')}
          />
        </Column>
        <Column width={50} >
          <Parameters.Select label="video switch channel" value={videoChannel}
            options={channelOptions} setValue={this._setChannel.bind(this, 'video')}
          />
        </Column>
        <Column width={50} >
          <Parameters.Select label="mode" value={panelMode}
            options={modeOptions} setValue={this.props.setMode.bind(this, 'switching', 'panel')}
          />
        </Column>
        <Column width={50} >
          <Parameters.Select label="mode" value={videoMode}
            options={modeOptions} setValue={this.props.setMode.bind(this, 'switching', 'video')}
          />
        </Column>
        <Column width={50} >
          { panelMode.get('value') === 0 ?
            <Input type="number" label="value to cycle"
              onChange={this._setValue.bind(this, 'panel')} value={panelValue}
            />
            : null }
        </Column>
        <Column width={50} >
          { videoMode.get('value') === 0 ?
            <Input type="number" label="value to cycle"
              onChange={this._setValue.bind(this, 'video')} value={videoValue}
            />
            : null }
        </Column>
      </Parameters.ParameterList>
    );
  }
}
