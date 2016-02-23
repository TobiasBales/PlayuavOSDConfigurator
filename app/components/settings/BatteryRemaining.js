import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryRemaining extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="battery remaining" {...this.props}/>
    );
  }
}

export default bindStateForComponent('batteryRemaining', BatteryRemaining);
