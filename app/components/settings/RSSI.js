import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class RSSI extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="RSSI" {...this.props}/>
     );
  }
}

export default bindStateForComponent('rssi', RSSI);
