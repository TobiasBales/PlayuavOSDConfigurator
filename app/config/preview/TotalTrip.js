import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import units from '../../utils/units';

export default class TotalTrip extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    totalTrip: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  content() {
    return units.convertDistance(this.props.totalTrip, this.props.units);
  }
}
