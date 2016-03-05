import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPSLongitude extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="gps longitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gpsLongitude', GPSLongitude);
