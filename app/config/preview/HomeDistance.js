import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import units from '../../utils/units';
import * as icons from '../../data/icons/lookup';

export default class HomeDistance extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    homeDistance: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  icon() {
    return icons.HOME_DISTANCE;
  }

  content() {
    return `${units.convertDistance(this.props.homeDistance, this.props.units)}`;
  }
}
