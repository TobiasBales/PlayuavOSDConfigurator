import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class SpeedAir extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    speedAir: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  content() {
    let convertSpeed = 0.0;
    let unitsSpeed = '';
    const { speedAir, units } = this.props;

    if (units === 0) {
      convertSpeed = 3.6;
      unitsSpeed = 'KM/H';
    } else {
      convertSpeed = 3.28;
      unitsSpeed = 'M/H';
    }

    const speed = speedAir * convertSpeed;
    return `AS ${speed.toFixed(0)}${unitsSpeed}`;
  }
}
