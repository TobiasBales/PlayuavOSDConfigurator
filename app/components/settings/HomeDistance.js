import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class HomeDistance extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="home distance" {...this.props}/>
    );
  }
}

export default bindStateForComponent('homeDistance', HomeDistance);
