import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-toolbox/lib/dropdown/Dropdown';
import CustomPropTypes from '../../utils/PropTypes';

export default class AltitudeScaleType extends Component {
  static propTypes = {
    scaleType: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    setScaleType: PropTypes.func.isRequired,
  }

  _onChange = (scaleType) => {
    this.props.setScaleType(scaleType);
  }

  render() {
    const { scaleType } = this.props;
    const options = [
      { value: 0, label: 'absolute' },
      { value: 1, label: 'relative' },
    ];

    return (
      <Dropdown
        auto
        value={scaleType.get('value')}
        source={options}
        onChange={this._onChange}
        label="type"
      />
    );
  }
}
