import React, { Component, PropTypes } from 'react';
import Input from 'react-toolbox/lib/input';
import Column from '../Column';

export default class Position extends Component {
  static propTypes = {
    positionX: PropTypes.number.isRequired,
    positionY: PropTypes.number.isRequired,
    labelX: PropTypes.string.isRequired,
    labelY: PropTypes.string.isRequired,
    setPosition: PropTypes.func.isRequired,
    xMin: PropTypes.number,
    xMax: PropTypes.number,
    yMin: PropTypes.number,
    yMax: PropTypes.number,
  }

  static defaultProps = {
    xMin: 0,
    xMax: 350,
    yMin: 0,
    yMax: 230,
  }

  _onChange(axis, position) {
    const x = axis === 'x' ? parseInt(position, 10) : this.props.positionX;
    const y = axis === 'y' ? parseInt(position, 10) : this.props.positionY;
    this.props.setPosition(x, y);
  }

  render() {
    const { labelX, labelY, positionX, positionY, xMin, xMax, yMin, yMax } = this.props;
    return (
      <div>
        <Column width={50} style={{ paddingRight: '5px' }}>
          <Input type="number" label={labelX} value={positionX} min={xMin} max={xMax}
            onChange={this._onChange.bind(this, 'x')}
          />
        </Column>
        <Column width={50} style={{ paddingLeft: '5px' }}>
          <Input type="number" label={labelY} value={positionY} min={yMin} max={yMax}
            onChange={this._onChange.bind(this, 'y')}
          />
        </Column>
      </div>
    );
  }
}
