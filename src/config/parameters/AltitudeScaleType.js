import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import CustomPropTypes from '../../utils/PropTypes';
import classNames from 'classnames';

export default class AltitudeScaleType extends Component {
  static propTypes = {
    scaleType: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    setScaleType: PropTypes.func.isRequired,
  }

  _onChange = (scaleType) => {
    this.props.setScaleType('altitudeScale', scaleType);
  }

  render() {
    const value = this.props.scaleType;
    const options = [
      { value: 0, label: 'absolute' },
      { value: 1, label: 'relative' },
    ];
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
        label="type"
      />
    );
  }
}
