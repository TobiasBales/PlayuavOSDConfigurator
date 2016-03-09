import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class Gps2Hdop extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="gps 2 hdop" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gps2Hdop', Gps2Hdop);
