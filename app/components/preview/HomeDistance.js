import { PropTypes } from 'react';
import StringPreview from './StringPreview';
import units from '../../utils/units';

export default class HomeDistance extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    homeDistance: PropTypes.number.isRequired,
    units: PropTypes.number.isRequired,
  }

  content() {
    return `H: ${units.convertDistance(this.props.homeDistance, this.props.units)}`;
  }
}
