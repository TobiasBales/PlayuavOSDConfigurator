import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import units from '../utils/units';

export default class SpeedAir extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    speedAir: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  content() {
    var speedUnitString = units.speedUnits(this.props.units);           
    const speed = units.convertSpeedWithoutUnits(this.props.speedAir, this.props.units);      
    return `AS ${speed.toFixed(0)}${speedUnitString}`;        
  }
}
