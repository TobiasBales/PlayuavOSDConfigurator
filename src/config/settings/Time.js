import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../parameters';
import SimpleSettings from './SimpleSettings';
import CustomPropTypes from '../../utils/PropTypes';

export default class Time extends Component {
  static propTypes = {
    parameters: ImmutablePropTypes.contains({
      fontSize: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      hAlignment: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      numberOfPanels: PropTypes.number.isRequired,
      positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      type: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
      visibleOn: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    }).isRequired,
    setFontSize: PropTypes.func.isRequired,
    setHAlignment: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    return !this.props.parameters.equals(nextProps.parameters);
  }

  _setType = (type) => {
    this.props.setType('time', type);
  }

  render() {
    const { type } = this.props.parameters;
    const typeOptions = [
      { value: 0, label: 'power on' },
      { value: 1, label: 'last heartbeat' },
      { value: 2, label: 'armed' },
    ];

    return (
      <SimpleSettings name="time" {...this.props}>
        <Parameters.Select label="since" setValue={this._setType}
          value={type} options={typeOptions}
        />
      </SimpleSettings>
     );
  }
}
