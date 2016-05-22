import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import CustomPropTypes from '../../utils/PropTypes';
import classNames from 'classnames';

export default class Select extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    options: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        label: PropTypes.string.isRequired,
      })).isRequired,
    value: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
  }

  _onChange = (value) => {
    this.props.setValue(value);
  }

  render() {
    const { value, options, label } = this.props;
    const classes = classNames(
      { modified: value.get('value') !== value.get('originalValue') }
    );

    return (
      <Dropdown
        auto
        className={classes}
        value={value.get('value')}
        source={options}
        onChange={this._onChange}
        label={label}
      />
    );
  }
}
