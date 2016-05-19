import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import units from '../utils/units';

export default class Efficiency extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    batteryCurrent: PropTypes.number.isRequired,
    batteryVoltage: PropTypes.number.isRequired,
    speedGround: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  content() {
    const { batteryCurrent, batteryVoltage, speedGround } = this.props;
    const wattage = batteryVoltage * batteryCurrent;
    const efficiency = wattage / speedGround;
    const distanceString = units.distanceUnits(this.props.units);

    return `${efficiency.toFixed(1)}W/${distanceString}`;
  }
}
