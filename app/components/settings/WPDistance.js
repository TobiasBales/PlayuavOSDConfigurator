import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class WPDistance extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="way-point distance" {...this.props}/>
     );
  }
}

export default bindStateForComponent('wpDistance', WPDistance);
