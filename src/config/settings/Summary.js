import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import Column from '../../components/Column';
import Input from '../../components/Input';
import CustomPropTypes from '../../utils/PropTypes';


// SUMMARY
// -------

export default class Summary extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      numberOfPanels: PropTypes.number.isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,

      switchChannel: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      channelMin: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      channelMax: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,

    }).isRequired,
    setPosition: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,

    setSwitchChannel: PropTypes.func.isRequired,
    setChannelMin: PropTypes.func.isRequired,
    setChannelMax: PropTypes.func.isRequired,

  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }


  _setChannelMin = (channelMin) => {
    this.props.setChannelMin('summary', parseInt(channelMin, 10));
  }

  _setChannelMax = (channelMax) => {
    this.props.setChannelMax('summary', parseInt(channelMax, 10));
  }

  _setSwitchChannel = (switchChannel) => {
    this.props.setSwitchChannel('summary', switchChannel);
  }



/*    const rawOptions = [
      { value: 0, label: 'percentage' }, { value: 1, label: 'raw value' }
    ];
*/



  render() {
    const {
      setPosition,
      setVisibleOn,   
    } = this.props;
    const {
      numberOfPanels,
      positionX,
      positionY,
      visibleOn,
      switchChannel, 
      channelMin, 
      channelMax          
    } = this.props.parameters;
    const switchChannelOptions = [
      { value: 5, label: 'rc 5' }, 
      { value: 6, label: 'rc 6' },
      { value: 7, label: 'rc 7' }, 
      { value: 8, label: 'rc 8' },
      { value: 9, label: 'rc 9' }, 
      { value: 10, label: 'rc 10' },
      { value: 11, label: 'rc 11' }, 
      { value: 12, label: 'rc 12' },
      { value: 13, label: 'rc 13' }, 
      { value: 14, label: 'rc 14' },
      { value: 15, label: 'rc 15' }, 
      { value: 16, label: 'rc 16' }
    ];

    const minChannelInput = 1000;
    const maxChannelInput = 2000;

    // Use SimpleSettings as seen in LinkQuality??

    return (
      <Parameters.ParameterList name="summary panel">
        <Parameters.Position labelX="position x" labelY="position y" name="summary"
          positionX={positionX} positionY={positionY} setPosition={setPosition}
        />

        <Column width={50} >
          <Input type="number" min={minChannelInput} max={maxChannelInput}
            label="min" value={channelMin} onChange={this._setChannelMin}
          />
        </Column>
        <Column width={50} >
          <Input type="number" min={minChannelInput} max={maxChannelInput}
            label="max" value={channelMax} onChange={this._setChannelMax}
          />
        </Column>
        <Column width={50} >
          <Parameters.Select label="rc channel" value={switchChannel} options={switchChannelOptions} setValue={this._setSwitchChannel} />
        </Column>

        <Parameters.VisibleOn visibleOn={visibleOn} name="summary"
          setVisibleOn={setVisibleOn} numberOfPanels={numberOfPanels}
        />
      </Parameters.ParameterList>
    );
  }
}