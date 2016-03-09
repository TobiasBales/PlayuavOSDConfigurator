import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class SpeedAir extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="speed air" {...this.props}/>
     );
  }
}

export default bindStateForComponent('speedAir', SpeedAir);
