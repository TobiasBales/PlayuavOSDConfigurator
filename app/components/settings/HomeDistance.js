import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class HomeDistance extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="home distance" {...this.props}/>
    );
  }
}

export default bindStateForComponent('homeDistance', HomeDistance);
