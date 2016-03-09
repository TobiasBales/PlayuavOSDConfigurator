import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class AbsoluteAltitude extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="absolute altitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('absoluteAltitude', AbsoluteAltitude);
