import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPSLongitude extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="gps longitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gpsLongitude', GPSLongitude);
