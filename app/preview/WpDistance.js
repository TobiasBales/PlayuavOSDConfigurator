import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import units from '../utils/units';
import * as icons from '../data/icons/lookup';

export default class WpDistance extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    wpDistance: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  icon() {
    return icons.WP_DISTANCE;
  }

  content() {
    return `${units.convertDistance(this.props.wpDistance, this.props.units)}`;
  }
}
