import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class HomeLongitude extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    homeLongitude: PropTypes.number.isRequired,
  }

  content() {
    const { gpsLongitude } = this.props;
    const long = (gpsLongitude / 10000000).toFixed(5);
    return `H ${long}`;
  }
}
