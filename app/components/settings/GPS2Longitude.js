import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPS2Longitude extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="gps 2 longitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gps2Longitude', GPS2Longitude);
