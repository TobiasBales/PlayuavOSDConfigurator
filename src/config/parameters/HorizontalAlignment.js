import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import CustomPropTypes from '../../utils/PropTypes';
import classNames from 'classnames';

export default class HorizontalAlignment extends Component {
  static propTypes = {
    hAlignment: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    setHAlignment: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
  }

  _onChange = (hAlignment) => {
    this.props.setHAlignment(this.props.name, hAlignment);
  }

  render() {
    const { hAlignment } = this.props;
    const options = [
      { value: 0, label: 'left' },
      { value: 1, label: 'middle' },
      { value: 2, label: 'right' },
    ];
    const classes = classNames(
      { modified: hAlignment.get('value') !== hAlignment.get('originalValue') }
    );

    return (
      <Dropdown
        auto
        className={classes}
        value={hAlignment.get('value')}
        source={options}
        onChange={this._onChange}
        label="horizontal alignment"
      />
    );
  }
}
