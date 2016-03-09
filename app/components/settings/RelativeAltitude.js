import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class RelativeAltitude extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="relative altitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('relativeAltitude', RelativeAltitude);
