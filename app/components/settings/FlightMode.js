import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class FlightMode extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="flight mode" {...this.props}/>
    );
  }
}

export default bindStateForComponent('flightMode', FlightMode);
