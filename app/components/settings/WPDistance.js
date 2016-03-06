import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class WPDistance extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="way-point distance" {...this.props}/>
     );
  }
}

export default bindStateForComponent('wpDistance', WPDistance);
