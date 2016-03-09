import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryVoltage extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="battery voltage" {...this.props}/>
    );
  }
}

export default bindStateForComponent('batteryVoltage', BatteryVoltage);
