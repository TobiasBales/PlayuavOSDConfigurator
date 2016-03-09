import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Parameters from '../Parameters';
import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class Time extends Component {
  static propTypes = {
    name: PropTypes.string,
    numberOfPanels: PropTypes.number.isRequired,
    parameters: ImmutablePropTypes.contains({
      fontSize: PropTypes.number.isRequired,
      hAlignment: PropTypes.number.isRequired,
      positionX: PropTypes.number.isRequired,
      positionY: PropTypes.number.isRequired,
      type: PropTypes.number.isRequired,
      visibleOn: PropTypes.number.isRequired,
    }).isRequired,
    setFontSize: PropTypes.func.isRequired,
    setHAlignment: PropTypes.func.isRequired,
    setPosition: PropTypes.func.isRequired,
    setType: PropTypes.func.isRequired,
    setVisibleOn: PropTypes.func.isRequired,
  }

  render() {
    const { setType } = this.props;
    const { type } = this.props.parameters;
    const typeOptions = [
      { value: 0, label: 'power on' },
      { value: 1, label: 'last heartbeat' },
      { value: 2, label: 'armed' },
    ];

    return (
      <SimpleSettings name="time" {...this.props}>
        <Parameters.Select label="since" setValue={setType} value={type} options={typeOptions}/>
      </SimpleSettings>
     );
  }
}

export default bindStateForComponent('time', Time);
