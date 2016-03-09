import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class BatteryCurrent extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="battery current" {...this.props}/>
    );
  }
}

export default bindStateForComponent('batteryCurrent', BatteryCurrent);
