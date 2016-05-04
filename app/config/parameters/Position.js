import React, { Component, PropTypes } from 'react';
import Input from '../../components/Input';
import Column from '../../components//Column';
import CustomPropTypes from '../../utils/PropTypes';

export default class Position extends Component {
  static propTypes = {
    positionX: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    positionY: CustomPropTypes.value(PropTypes.number.isRequired).isRequired,
    labelX: PropTypes.string.isRequired,
    labelY: PropTypes.string.isRequired,
    setPosition: PropTypes.func.isRequired,
    xMin: PropTypes.number,
    xMax: PropTypes.number,
    yMin: PropTypes.number,
    yMax: PropTypes.number,
  }

  _onChange(axis, position) {
    const x = axis === 'x' ? parseInt(position, 10) : this.props.positionX.get('value');
    const y = axis === 'y' ? parseInt(position, 10) : this.props.positionY.get('value');
    this.props.setPosition(x, y);
  }

  render() {
    const { labelX, labelY, positionX, positionY, xMin, xMax, yMin, yMax } = this.props;
    return (
      <div>
        <Column width={50}>
          <Input type="number" label={labelX} value={positionX}
            min={xMin} max={xMax} onChange={this._onChange.bind(this, 'x')}
          />
        </Column>
        <Column width={50}>
          <Input type="number" label={labelY} value={positionY}
            min={yMin} max={yMax} onChange={this._onChange.bind(this, 'y')}
          />
        </Column>
      </div>
    );
  }
}
