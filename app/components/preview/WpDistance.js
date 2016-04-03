import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import units from '../../utils/units';

export default class WpDistance extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    wpDistance: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  content() {
    return `WP ${units.convertDistance(this.props.wpDistance, this.props.units)}`;
  }
}
