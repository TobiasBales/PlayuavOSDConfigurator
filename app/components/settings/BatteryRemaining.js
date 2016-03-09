import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryRemaining extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="battery remaining" {...this.props}/>
    );
  }
}

export default bindStateForComponent('batteryRemaining', BatteryRemaining);
