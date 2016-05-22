import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import CustomPropTypes from '../../utils/PropTypes';
import classNames from 'classnames';

export default class VerticalAlignment extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    setVAlignment: PropTypes.func.isRequired,
    vAlignment: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
  }

  _onChange = (vAlignment) => {
    this.props.setVAlignment(this.props.name, parseInt(vAlignment, 10));
  }

  render() {
    const { vAlignment } = this.props;
    const options = [
      { value: 0, label: 'top' },
      { value: 1, label: 'middle' },
      { value: 2, label: 'bottom' },
    ];
    const classes = classNames({
      modified: vAlignment.get('value') !== vAlignment.get('originalValue')
    });

    return (
      <Dropdown
        auto
        className={classes}
        value={vAlignment.get('value')}
        source={options}
        onChange={this._onChange}
        label="vertical alignment"
      />
    );
  }
}
