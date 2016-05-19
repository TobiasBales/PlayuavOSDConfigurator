import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import units from '../utils/units';
import * as icons from '../data/icons/lookup';

export default class TotalTrip extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    totalTrip: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  icon() {
    return icons.TOTAL_TRIP;
  }

  content() {
    return units.convertDistance(this.props.totalTrip, this.props.units);
  }
}
