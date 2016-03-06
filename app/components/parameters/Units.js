import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

export default class Units extends Component {
  static propTypes = {
    units: PropTypes.number.isRequired,
    setUnits: PropTypes.func.isRequired,
  }

  _onChange = (units) => {
    this.props.setUnits(units);
  }

  render() {
    const { units } = this.props;
    const options = [
      { value: 0, label: 'metric' },
      { value: 1, label: 'imperial' },
    ];

    return (
      <Dropdown
        auto
        value={units}
        source={options}
        onChange={this._onChange}
        label="units"
      />
    );
  }
}
