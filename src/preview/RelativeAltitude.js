import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import units from '../utils/units';

export default class RelativeAltitude extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    relativeAltitude: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  content() {
    return `A ${units.convertDistance(this.props.relativeAltitude, this.props.units)}`;
  }
}
