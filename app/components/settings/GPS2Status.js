import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class GPS2Status extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="gps 2 status" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gps2Status', GPS2Status);
