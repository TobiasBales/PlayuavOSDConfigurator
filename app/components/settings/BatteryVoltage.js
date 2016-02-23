import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryVoltage extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="battery voltage" {...this.props}/>
    );
  }
}

export default bindStateForComponent('batteryVoltage', BatteryVoltage);
