import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

export default class ScaleAlignment extends Component {
  static propTypes = {
    scaleAlignment: PropTypes.number.isRequired,
    setScaleAlignment: PropTypes.func.isRequired,
  }

  _onChange = (scaleAlignment) => {
    this.props.setScaleAlignment(scaleAlignment);
  }

  render() {
    const { scaleAlignment } = this.props;
    const options = [
      { value: 0, label: 'left' },
      { value: 1, label: 'right' },
    ];

    return (
      <Dropdown
        auto
        value={scaleAlignment}
        source={options}
        onChange={this._onChange}
        label="alignment"
      />
    );
  }
}
