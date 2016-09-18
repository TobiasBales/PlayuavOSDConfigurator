import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class Watt extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    batteryCurrent: PropTypes.number.isRequired,
    batteryVoltage: PropTypes.number.isRequired,
  }

  content() {
    const { batteryCurrent, batteryVoltage } = this.props;
    const watt = batteryVoltage * batteryCurrent;

    return `${watt.toFixed(1)}W`;
  }
}
