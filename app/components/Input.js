import React, { Component, PropTypes } from 'react';
import BaseInput from 'react-toolbox/lib/input';
import CustomPropTypes from '../utils/PropTypes';
import classNames from 'classnames';

export default class Input extends Component {
  static propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    value: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
  }

  static defaultProps = {
    type: 'string',
  }

  render() {
    const value = this.props.value;
    const classes = classNames({
      modified: value.get('value') !== value.get('originalValue')
    });

    return (
      <BaseInput
        className={classes}
        type={this.props.type}
        label={this.props.label}
        onChange={this.props.onChange}
        value={value.get('value')}
      />
    );
  }
}
