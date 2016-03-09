import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class Gps2Longitude extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="gps 2 longitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('gps2Longitude', Gps2Longitude);
