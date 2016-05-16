import React, { Component, PropTypes } from 'react';
import Input from '../../components/Input';
import CustomPropTypes from '../../utils/PropTypes';

export default class Radius extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    radius: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    radiusKey: PropTypes.string.isRequired,
    setRadius: PropTypes.func.isRequired,
    step: PropTypes.number,
  }

  static defaultProps = {
    step: 0.1,
  }

  _onChange(radius) {
    this.props.setRadius(this.props.name, this.props.radiusKey, parseInt(radius, 10));
  }

  render() {
    const { radius, label } = this.props;

    return (
      <div>
        <Input
          type="number"
          label={label}
          value={radius}
          step={this.props.step}
          onChange={this._onChange.bind(this)}
        />
      </div>
    );
  }
}
