import React, { Component, PropTypes } from 'react';
import Checkbox from 'react-toolbox/lib/checkbox/Checkbox';

export default class ParameterEnabled extends Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    setEnabled: PropTypes.func.isRequired
  }

  _onChange = () => {
    this.props.setEnabled(!this.props.enabled);
  }

  render() {
    const { enabled } = this.props;

    return (
      <Checkbox
        label="enabled"
        onChange={this._onChange}
        checked={enabled}
      />
    );
  }
}
