import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import CustomPropTypes from '../../utils/PropTypes';
import classNames from 'classnames';

export default class ScaleAlignment extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    scaleAlignment: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    setScaleAlignment: PropTypes.func.isRequired,
  }

  _onChange = (scaleAlignment) => {
    this.props.setScaleAlignment(this.props.name, scaleAlignment);
  }

  render() {
    const value = this.props.scaleAlignment;
    const options = [
      { value: 0, label: 'left' },
      { value: 1, label: 'right' },
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
        label="alignment"
      />
    );
  }
}
