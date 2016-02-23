import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

export default class HorizontalAlignment extends Component {
  static propTypes = {
    hAlignment: PropTypes.number.isRequired,
    setHAlignment: PropTypes.func.isRequired,
  }

  _onChange = (hAlignment) => {
    this.props.setHAlignment(hAlignment);
  }

  render() {
    const { hAlignment } = this.props;
    const options = [
      { value: 0, label: 'left' },
      { value: 1, label: 'middle' },
      { value: 2, label: 'right' },
    ];

    return (
      <Dropdown
        auto
        value={hAlignment}
        source={options}
        onChange={this._onChange}
        label="horizontal alignment"
      />
    );
  }
}
