import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class GpsLongitude extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    gpsLongitude: PropTypes.number.isRequired,
  }

  content() {
    const { gpsLongitude } = this.props;
    return (gpsLongitude / 10000000).toFixed(5);
  }
}
