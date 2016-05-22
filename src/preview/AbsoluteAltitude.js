import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import units from '../utils/units';

export default class AbsoluteAltitude extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    absoluteAltitude: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  content() {
    return `AA ${units.convertDistance(this.props.absoluteAltitude, this.props.units)}`;
  }
}
