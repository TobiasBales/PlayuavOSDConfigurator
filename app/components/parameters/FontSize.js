import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import CustomPropTypes from '../../utils/PropTypes';
import classNames from 'classnames';

export default class Position extends Component {
  static propTypes = {
    fontSize: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    setFontSize: PropTypes.func.isRequired,
  }

  _onChange = (fontSize) => {
    this.props.setFontSize(fontSize);
  }

  render() {
    const { fontSize } = this.props;
    const options = [
      { value: 0, label: 'small' },
      { value: 1, label: 'medium' },
      { value: 2, label: 'large' },
    ];

    const classes = classNames(
      { modified: fontSize.get('value') !== fontSize.get('originalValue') },
    );

    return (
      <Dropdown
        auto
        className={classes}
        value={fontSize.get('value')}
        source={options}
        onChange={this._onChange}
        label="font size"
      />
    );
  }
}
