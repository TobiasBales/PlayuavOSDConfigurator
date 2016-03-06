import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Input from 'react-toolbox/lib/input';
import Column from '../Column';

export default class Position extends Component {
  static propTypes = {
    position: ImmutablePropTypes.contains({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    labelX: PropTypes.string.isRequired,
    labelY: PropTypes.string.isRequired,
    setPosition: PropTypes.func.isRequired,
  }

  _onChange(axis, position) {
    this.props.setPosition(this.props.position.set(axis, parseInt(position, 10)));
  }

  render() {
    const { labelX, labelY } = this.props;
    const { x, y } = this.props.position;
    return (
      <div>
        <Column width={50} style={{ 'paddingRight': '5px' }}>
          <Input type="number" label={labelX} value={x} onChange={this._onChange.bind(this, 'x')} />
        </Column>
        <Column width={50} style={{ 'paddingLeft': '5px' }}>
          <Input type="number" label={labelY} value={y} onChange={this._onChange.bind(this, 'y')} />
        </Column>
      </div>
    );
  }
}
