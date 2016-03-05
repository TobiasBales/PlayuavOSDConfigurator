import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class RelativeAltitude extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="relative altitude" {...this.props}/>
     );
  }
}

export default bindStateForComponent('relativeAltitude', RelativeAltitude);
