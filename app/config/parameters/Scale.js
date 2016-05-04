import React, { Component, PropTypes } from 'react';
import Input from '../../components/Input';
import CustomPropTypes from '../../utils/PropTypes';

export default class Scale extends Component {
  static propTypes = {
    scale: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    setScale: PropTypes.func.isRequired,
  }

  _onChange = (scale) => {
    this.props.setScale(parseFloat(scale));
  }

  render() {
    const { scale } = this.props;
    return (
      <div>
        <Input
          type="number"
          step="0.1"
          label="scale"
          value={scale}
          onChange={this._onChange}
        />
      </div>
    );
  }
}
