import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryCurrent extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="battery current" {...this.props}/>
    );
  }
}

export default bindStateForComponent('batteryCurrent', BatteryCurrent);
