import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryConsumed extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="battery consumed" {...this.props}/>
    );
  }
}

export default bindStateForComponent('batteryConsumed', BatteryConsumed);
