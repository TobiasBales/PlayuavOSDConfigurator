import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPS2HDOP extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="gps 2 hdop" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gps2Hdop', GPS2HDOP);
