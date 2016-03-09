import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GpsStatus extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="gps status" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gpsStatus', GpsStatus);
