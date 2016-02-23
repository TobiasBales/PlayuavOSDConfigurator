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
    setPosition: PropTypes.func.isRequired,
  }

  _onChange(axis, position) {
    this.props.setPosition(this.props.position.set(axis, parseInt(position, 10)));
  }

  render() {
    const { x, y } = this.props.position;
    return (
      <div>
        <Column width={50}>
          <Input type="number" label="x position" value={x} onChange={this._onChange.bind(this, 'x')} />
        </Column>
        <Column width={50}>
          <Input type="number" label="y position" value={y} onChange={this._onChange.bind(this, 'y')} />
        </Column>
      </div>
    );
  }
}
