import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class GpsLatitude extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    gpsLatitude: PropTypes.number.isRequired,
  }

  content() {
    const { gpsLatitude } = this.props;
    return (gpsLatitude / 10000000).toFixed(5);
  }
}
