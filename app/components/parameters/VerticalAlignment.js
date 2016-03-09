import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

export default class VerticalAlignment extends Component {
  static propTypes = {
    vAlignment: PropTypes.number.isRequired,
    setVAlignment: PropTypes.func.isRequired,
  }

  _onChange = (vAlignment) => {
    this.props.setVAlignment(vAlignment);
  }

  render() {
    const { vAlignment } = this.props;
    const options = [
      { value: 0, label: 'top' },
      { value: 1, label: 'middle' },
      { value: 2, label: 'bottom' },
    ];

    return (
      <Dropdown
        auto
        value={vAlignment}
        source={options}
        onChange={this._onChange}
        label="vertical alignment"
      />
    );
  }
}
