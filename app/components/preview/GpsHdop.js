import { PropTypes } from 'react';
import StringPreview from './StringPreview';

export default class GpsHdop extends StringPreview {
  static propTypes = {
    ...StringPreview.propTypes,
    gpsHdop: PropTypes.number.isRequired,
  }

  content() {
    const { gpsHdop } = this.props;
    return `HDOP:${(gpsHdop / 100).toFixed(1)}`;
  }
}
