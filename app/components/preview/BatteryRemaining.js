import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class BatteryRemaining extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    batteryCurrent: PropTypes.number.isRequired,
  }

  content() {
    const { batteryRemaining } = this.props;

    return `${batteryRemaining.toFixed(0)}%`;
  }
}
