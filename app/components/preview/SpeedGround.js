import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class SpeedGround extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    speedGround: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  content() {
    let convertSpeed = 0.0;
    let unitsSpeed = '';
    const { speedGround, units } = this.props;

    if (units === 0) {
      convertSpeed = 3.6;
      unitsSpeed = 'KM/H';
    } else {
      convertSpeed = 3.28;
      unitsSpeed = 'M/H';
    }

    const speed = speedGround * convertSpeed;
    return `G-SPD: ${speed.toFixed(0)}${unitsSpeed}`;
  }
}
