import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import units from '../utils/units';

export default class SpeedGround extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    speedGround: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  content() {
    var speedUnitString = units.speedUnits(this.props.units);           
    const speed = units.convertSpeedWithoutUnits(this.props.speedGround, this.props.units);      
    return `GS ${speed.toFixed(0)}${speedUnitString}`;    
  }
}
