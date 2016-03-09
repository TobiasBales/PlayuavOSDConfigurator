import React, { Component } from 'react';

import SimpleSettings from './SimpleSettings';
import { bindStateForComponent } from '../../utils/parameters';

class TotalTrip extends Component {
  static propTypes = {
    ...SimpleSettings.propTypes
  }

  render() {
    return (
      <SimpleSettings name="total trip" {...this.props}/>
     );
  }
}

export default bindStateForComponent('totalTrip', TotalTrip);
