import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class SpeedGround extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="speed ground" {...this.props}/>
     );
  }
}

export default bindStateForComponent('speedGround', SpeedGround);
