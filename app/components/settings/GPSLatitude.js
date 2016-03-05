import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPSLatitude extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="gps latitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gpsLatitude', GPSLatitude);
