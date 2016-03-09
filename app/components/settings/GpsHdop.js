import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GpsHdop extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="gps hdop" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gpsHdop', GpsHdop);
