import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPSHDOP extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="gps hdop" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gpsHdop', GPSHDOP);
