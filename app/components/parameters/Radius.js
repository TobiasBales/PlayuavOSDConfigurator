import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';

export default class Radius extends Component {
  static propTypes = {
    radiusKey: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    setRadius: PropTypes.func.isRequired,
  }

  _onChange(radius) {
    this.props.setRadius(this.props.radiusKey, parseInt(radius, 10));
  }

  render() {
    const { radius, label } = this.props;
    return (
      <div>
        <Input type="number" label={label} value={radius} onChange={this._onChange.bind(this)} />
      </div>
    );
  }
}
