import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPSLatitude extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="gps latitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gpsLatitude', GPSLatitude);
