import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../Parameters';
import Column from '../Column';
import Input from 'react-toolbox/lib/input';
import { bindStateForComponent } from '../../utils/parameters';

class Switching extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      panelChannel: PropTypes.number.isRequired,
      panelValue: PropTypes.number.isRequired,
      videoChannel: PropTypes.number.isRequired,
      videoValue: PropTypes.number.isRequired,
    }).isRequired,
    setChannel: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
  }

  _setChannel(key, value) {
    this.props.setChannel(key, value);
  }

  _setValue(key, value) {
    this.props.setValue(key, parseInt(value, 10));
  }

  render() {
    const { panelChannel, panelValue, videoChannel, videoValue } = this.props.parameters;
    const channelOptions = [
      { value: 0, label: 'disabled' }, { value: 1, label: 'rc 1' },
      { value: 2, label: 'rc 2' }, { value: 3, label: 'rc 3' },
      { value: 4, label: 'rc 4' }, { value: 5, label: 'rc 5' },
      { value: 5, label: 'rc 5' }, { value: 6, label: 'rc 6' },
      { value: 7, label: 'rc 7' }, { value: 8, label: 'rc 8' },
      { value: 9, label: 'rc 9' }, { value: 10, label: 'rc 10' },
      { value: 11, label: 'rc 11' }, { value: 12, label: 'rc 12' },
      { value: 13, label: 'rc 13' }, { value: 14, label: 'rc 14' },
      { value: 15, label: 'rc 15' }, { value: 16, label: 'rc 16' }
    ];

    return (
      <Parameters.ParameterList name="switching">
        <Column width={50} style={{ 'paddingRight': '5px' }}>
          <Parameters.Select label="panel switch channel" value={panelChannel} options={channelOptions} setValue={this._setChannel.bind(this, 'panel')}/>
        </Column>
        <Column width={50} style={{ 'paddingLeft': '5px' }}>
          <Input type="number" label="value to switch" onChange={this._setValue.bind(this, 'panel')} value={panelValue}/>
        </Column>
        <Column width={50} style={{ 'paddingRight': '5px' }}>
          <Parameters.Select label="video switch channel" value={videoChannel} options={channelOptions} setValue={this._setChannel.bind(this, 'video')}/>
        </Column>
        <Column width={50} style={{ 'paddingLeft': '5px' }}>
          <Input type="number" label="value to switch" onChange={this._setValue.bind(this, 'video')} value={videoValue}/>
        </Column>
      </Parameters.ParameterList>
    );
  }
}

export default bindStateForComponent('switching', Switching);
