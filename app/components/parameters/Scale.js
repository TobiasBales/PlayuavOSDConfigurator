import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';

export default class Scale extends Component {
  static propTypes = {
    scale: PropTypes.number.isRequired,
    setScale: PropTypes.func.isRequired,
  }

  _onChange = (scale) => {
    this.props.setScale(parseFloat(scale));
  }

  render() {
    const { scale } = this.props;
    return (
      <div>
        <Input type="number" step="0.1" label="scale" value={scale} onChange={this._onChange} />
      </div>
    );
  }
}
