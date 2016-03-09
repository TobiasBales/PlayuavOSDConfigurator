import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';

export default class Select extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    options: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        label: PropTypes.string.isRequired,
      })).isRequired,
    value: PropTypes.number.isRequired,
  }

  _onChange = (value) => {
    this.props.setValue(value);
  }

  render() {
    const { value, options, label } = this.props;

    return (
      <Dropdown
        auto
        value={value}
        source={options}
        onChange={this._onChange}
        label={label}
      />
    );
  }
}
