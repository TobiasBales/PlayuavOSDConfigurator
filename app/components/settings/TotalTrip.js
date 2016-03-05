import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';

class TotalTrip extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="total trip" {...this.props}/>
     );
  }
}

export default bindStateForComponent('totalTrip', TotalTrip);
