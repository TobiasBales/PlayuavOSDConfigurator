import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPS2Latitude extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="gps 2 latitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gps2Latitude', GPS2Latitude);
