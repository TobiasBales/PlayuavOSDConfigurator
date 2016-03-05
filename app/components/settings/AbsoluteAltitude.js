import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class AbsoluteAltitude extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="absolute altitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('absoluteAltitude', AbsoluteAltitude);
