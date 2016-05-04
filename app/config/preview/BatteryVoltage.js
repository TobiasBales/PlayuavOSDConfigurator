import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class BatteryVoltage extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    batteryVoltage: PropTypes.number.isRequired,
  }

  content() {
    const { batteryVoltage } = this.props;

    return `${batteryVoltage.toFixed(1)}V`;
  }
}
