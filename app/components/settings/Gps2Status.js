import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class Gps2Status extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="gps 2 status" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gps2Status', Gps2Status);
