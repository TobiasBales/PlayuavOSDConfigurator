import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class SpeedAir extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="speed air" {...this.props}/>
     );
  }
}

export default bindStateForComponent('speedAir', SpeedAir);
