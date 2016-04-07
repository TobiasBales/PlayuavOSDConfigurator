import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import CustomPropTypes from '../../utils/PropTypes';
import classNames from 'classnames';

export default class Units extends Component {
  static propTypes = {
    units: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
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
    const classes = classNames({
      modified: units.get('value') !== units.get('originalValue')
    });

    return (
      <Dropdown
        auto
        className={classes}
        value={units.get('value')}
        source={options}
        onChange={this._onChange}
        label="units"
      />
    );
  }
}
