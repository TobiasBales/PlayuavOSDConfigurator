import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPSStatus extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="gps status" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gpsStatus', GPSStatus);
