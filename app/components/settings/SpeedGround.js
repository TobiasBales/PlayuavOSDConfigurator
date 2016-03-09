import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class SpeedGround extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="speed ground" {...this.props}/>
     );
  }
}

export default bindStateForComponent('speedGround', SpeedGround);
