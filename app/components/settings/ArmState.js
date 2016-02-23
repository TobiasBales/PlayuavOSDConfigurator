import React, { Component } from 'react';

import BasicSettings from './BasicSettings';
import { bindStateForComponent } from '../../utils/parameters';
class ArmState extends Component {
  static propTypes = {
    ...BasicSettings.propTypes
  }

  render() {
    return (
      <BasicSettings name="arm state" {...this.props}/>
     );
  }
}

export default bindStateForComponent('armState', ArmState);
