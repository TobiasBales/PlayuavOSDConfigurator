import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPS2Latitude extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="gps 2 latitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gps2Latitude', GPS2Latitude);
