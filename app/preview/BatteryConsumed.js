import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class BatteryConsumed extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    batteryConsumed: PropTypes.number.isRequired,
  }

  content() {
    const { batteryConsumed } = this.props;

    return `${batteryConsumed.toFixed(0)}mah`;
  }
}
